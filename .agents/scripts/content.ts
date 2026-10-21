// content.ts: Deterministic IDE CLI controller for Snapshot Portfolio's JSON Content Domain.
// Manages flat JSON array collections in content/*.json with Zod 4 schema validation,
// public/ asset verification, automatic read_time calculation, and atomic writes.

import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";
import {
  c,
  TREE,
  renderBanner,
  renderTree,
  renderSummary,
  hr,
  type TreeItem,
} from "./ui.ts";
import {
  ProjectsArraySchema,
  BlogPostsArraySchema,
  SkillsArraySchema,
  TestimoniesArraySchema,
  ExperienceArraySchema,
  EducationArraySchema,
  SiteConfigSchema,
  AboutContentSchema,
  ProjectSchema,
  BlogPostSchema,
  TestimonyItemSchema,
  calculateReadTime,
  type Project,
  type BlogPost,
  type SkillSection,
  type TestimonyItem,
  type ExperienceItem,
  type EducationItem,
} from "../../lib/content/schemas.ts";

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, "content");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const CONTENT_FILES = {
  projects: path.join(CONTENT_DIR, "projects.json"),
  blog: path.join(CONTENT_DIR, "blog.json"),
  skills: path.join(CONTENT_DIR, "skills.json"),
  testimonies: path.join(CONTENT_DIR, "testimonies.json"),
  experience: path.join(CONTENT_DIR, "experience.json"),
  education: path.join(CONTENT_DIR, "education.json"),
  siteConfig: path.join(CONTENT_DIR, "site-config.json"),
  about: path.join(CONTENT_DIR, "about.json"),
} as const;

type CollectionKey =
  | "projects"
  | "blog"
  | "skills"
  | "testimonies"
  | "experience"
  | "education";

// === ATOMIC FILE HELPERS & LEGACY SUBFOLDER CONSOLIDATION ===

function atomicWriteJson(targetFile: string, data: unknown): void {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
  const nonce = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const tmpFile = `${targetFile}.${nonce}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2) + "\n", "utf8");
  try {
    fs.renameSync(tmpFile, targetFile);
  } catch {
    fs.copyFileSync(tmpFile, targetFile);
    fs.unlinkSync(tmpFile);
  }
}

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Canonical sorters for each array collection
function sortProjects(items: Project[]): Project[] {
  return [...items].sort((a, b) => {
    const d = (b.startDate || "").localeCompare(a.startDate || "");
    return d !== 0 ? d : b.projectId - a.projectId;
  });
}

function sortBlogPosts(items: BlogPost[]): BlogPost[] {
  return [...items].sort((a, b) => {
    if (a.isIntro) return -1;
    if (b.isIntro) return 1;
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });
}

function sortSkills(items: SkillSection[]): SkillSection[] {
  return [...items].sort((a, b) => a.index.localeCompare(b.index));
}

function sortTestimonies(items: TestimonyItem[]): TestimonyItem[] {
  return [...items].sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id));
}

function sortExperience(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function sortEducation(items: EducationItem[]): EducationItem[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * If legacy split subfolders (content/projects/, content/blog/, etc.) still exist,
 * consolidates them into flat JSON array files and removes the legacy folders + web admin dirs.
 */
function ensureConsolidatedArrays(): void {
  const subDirs: CollectionKey[] = [
    "projects",
    "blog",
    "skills",
    "testimonies",
    "experience",
    "education",
  ];

  for (const col of subDirs) {
    const legacyDir = path.join(CONTENT_DIR, col);
    const targetFile = CONTENT_FILES[col];
    if (fs.existsSync(legacyDir) && fs.statSync(legacyDir).isDirectory()) {
      const files = fs
        .readdirSync(legacyDir)
        .filter((f) => f.endsWith(".json"))
        .sort();
      if (files.length > 0 && !fs.existsSync(targetFile)) {
        const merged = files.map((f) =>
          JSON.parse(fs.readFileSync(path.join(legacyDir, f), "utf8"))
        );
        atomicWriteJson(targetFile, merged);
      }
      fs.rmSync(legacyDir, { recursive: true, force: true });
    }
  }

  // Clean up deprecated web admin & auth routes if present
  for (const legacyWebDir of ["app/admin", "app/api", "lib/auth"]) {
    const full = path.join(ROOT_DIR, legacyWebDir);
    if (fs.existsSync(full)) {
      fs.rmSync(full, { recursive: true, force: true });
    }
  }
}

function normalizeCollectionArg(raw?: string): CollectionKey | "site-config" | "about" | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  if (lower === "project" || lower === "projects" || lower === "proj") return "projects";
  if (lower === "blog" || lower === "blogs" || lower === "post" || lower === "posts") return "blog";
  if (lower === "skill" || lower === "skills") return "skills";
  if (lower === "testimony" || lower === "testimonies" || lower === "test") return "testimonies";
  if (lower === "experience" || lower === "exp") return "experience";
  if (lower === "education" || lower === "edu") return "education";
  if (lower === "site-config" || lower === "config" || lower === "site") return "site-config";
  if (lower === "about") return "about";
  return null;
}

// === COMMAND HANDLERS ===

function handleStatus(): void {
  ensureConsolidatedArrays();
  renderBanner(
    "Snapshot Content Domain Status",
    "Consolidated JSON Array Collections & Schema Health (content/*.json)"
  );

  const items: TreeItem[] = [];

  const checkFile = <T>(
    category: string,
    name: string,
    filePath: string,
    validateFn: (raw: unknown) => { ok: boolean; summary: string }
  ) => {
    if (!fs.existsSync(filePath)) {
      items.push({ category, name, status: "FAIL", message: "Missing file" });
      return;
    }
    try {
      const data = readJsonFile<T>(filePath);
      const res = validateFn(data);
      items.push({
        category,
        name,
        status: res.ok ? "PASS" : "FAIL",
        message: res.summary,
      });
    } catch (err) {
      items.push({
        category,
        name,
        status: "FAIL",
        message: `Invalid JSON: ${(err as Error).message}`,
      });
    }
  };

  checkFile("1. Portfolio Collections (Arrays)", "projects.json", CONTENT_FILES.projects, (raw) => {
    const parsed = ProjectsArraySchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    const totalImages = parsed.data.reduce((acc, p) => acc + p.imageRefs.length, 0);
    return { ok: true, summary: `${parsed.data.length} projects (${totalImages} gallery images)` };
  });

  checkFile("1. Portfolio Collections (Arrays)", "blog.json", CONTENT_FILES.blog, (raw) => {
    const parsed = BlogPostsArraySchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    const articles = parsed.data.filter((b) => !b.isIntro).length;
    return { ok: true, summary: `${articles} published posts + 1 intro entry` };
  });

  checkFile("1. Portfolio Collections (Arrays)", "skills.json", CONTENT_FILES.skills, (raw) => {
    const parsed = SkillsArraySchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    const totalSkills = parsed.data.reduce((acc, s) => acc + s.skills.length, 0);
    return { ok: true, summary: `${parsed.data.length} architectural sections (${totalSkills} skills)` };
  });

  checkFile("1. Portfolio Collections (Arrays)", "testimonies.json", CONTENT_FILES.testimonies, (raw) => {
    const parsed = TestimoniesArraySchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    const active = parsed.data.filter((t) => !t.isPlaceholder).length;
    return { ok: true, summary: `${parsed.data.length} cards (${active} live, ${parsed.data.length - active} placeholder)` };
  });

  checkFile("1. Portfolio Collections (Arrays)", "experience.json", CONTENT_FILES.experience, (raw) => {
    const parsed = ExperienceArraySchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    return { ok: true, summary: `${parsed.data.length} experience entries` };
  });

  checkFile("1. Portfolio Collections (Arrays)", "education.json", CONTENT_FILES.education, (raw) => {
    const parsed = EducationArraySchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    return { ok: true, summary: `${parsed.data.length} education milestones` };
  });

  checkFile("2. Singleton Configurations", "site-config.json", CONTENT_FILES.siteConfig, (raw) => {
    const parsed = SiteConfigSchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    return {
      ok: true,
      summary: `${parsed.data.profile.name} (${parsed.data.aboutFyiCards.length} FYI cards, ${parsed.data.sectionCards.length} hero cards)`,
    };
  });

  checkFile("2. Singleton Configurations", "about.json", CONTENT_FILES.about, (raw) => {
    const parsed = AboutContentSchema.safeParse(raw);
    if (!parsed.success) return { ok: false, summary: parsed.error.issues[0]?.message || "Schema error" };
    return {
      ok: true,
      summary: `${parsed.data.quickFacts.length} quick facts, ${parsed.data.stories.length} personal stories`,
    };
  });

  renderTree("Content Repository Health", items);

  const passCount = items.filter((i) => i.status === "PASS").length;
  const warnCount = items.filter((i) => i.status === "WARN").length;
  const failCount = items.filter((i) => i.status === "FAIL").length;

  renderSummary({
    passCount,
    warnCount,
    failCount,
    subject: "content files",
    passAdvice: "All 8 content files are valid and synchronized.",
    warnAdvice: "Content operational with notices.",
    failAdvice: "Run 'pnpm content validate' to inspect schema errors.",
  });
}

function handleValidate(): void {
  ensureConsolidatedArrays();
  renderBanner(
    "Snapshot Content & Asset Validator",
    "Deep Zod 4 Schema Validation, Uniqueness Checks, & Public Image Audit"
  );

  const items: TreeItem[] = [];
  const missingAssets: string[] = [];

  const verifyAsset = (assetPath: string, context: string) => {
    if (!assetPath || !assetPath.startsWith("/")) return;
    const diskPath = path.join(PUBLIC_DIR, assetPath.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) {
      missingAssets.push(`${context}: ${assetPath}`);
    }
  };

  // 1. Validate projects.json
  try {
    const projects = ProjectsArraySchema.parse(readJsonFile(CONTENT_FILES.projects));
    const ids = new Set<number>();
    const slugs = new Set<string>();
    let dup = "";
    for (const p of projects) {
      if (ids.has(p.projectId)) dup = `Duplicate projectId ${p.projectId}`;
      if (slugs.has(p.slug)) dup = `Duplicate project slug '${p.slug}'`;
      ids.add(p.projectId);
      slugs.add(p.slug);
      for (const img of p.imageRefs) {
        verifyAsset(img.imageRef, `projects.json [${p.slug}]`);
      }
    }
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "projects.json",
      status: dup ? "FAIL" : "PASS",
      message: dup || `${projects.length} items verified (unique IDs & slugs)`,
    });
  } catch (err) {
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "projects.json",
      status: "FAIL",
      message: (err as Error).message,
    });
  }

  // 2. Validate blog.json
  try {
    const posts = BlogPostsArraySchema.parse(readJsonFile(CONTENT_FILES.blog));
    const ids = new Set<string>();
    const slugs = new Set<string>();
    let dup = "";
    for (const b of posts) {
      const idKey = String(b.id);
      if (ids.has(idKey)) dup = `Duplicate blog id ${idKey}`;
      if (slugs.has(b.slug)) dup = `Duplicate blog slug '${b.slug}'`;
      ids.add(idKey);
      slugs.add(b.slug);
    }
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "blog.json",
      status: dup ? "FAIL" : "PASS",
      message: dup || `${posts.length} items verified (unique IDs & slugs)`,
    });
  } catch (err) {
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "blog.json",
      status: "FAIL",
      message: (err as Error).message,
    });
  }

  // 3. Validate skills.json, testimonies.json, experience.json, education.json
  for (const [name, file, schema] of [
    ["skills.json", CONTENT_FILES.skills, SkillsArraySchema],
    ["testimonies.json", CONTENT_FILES.testimonies, TestimoniesArraySchema],
    ["experience.json", CONTENT_FILES.experience, ExperienceArraySchema],
    ["education.json", CONTENT_FILES.education, EducationArraySchema],
  ] as const) {
    try {
      const parsed = schema.parse(readJsonFile(file));
      items.push({
        category: "1. Schema & Uniqueness Validation",
        name,
        status: "PASS",
        message: `${parsed.length} items conform to Zod 4 schema`,
      });
    } catch (err) {
      items.push({
        category: "1. Schema & Uniqueness Validation",
        name,
        status: "FAIL",
        message: (err as Error).message,
      });
    }
  }

  // 4. Validate site-config.json & about.json
  try {
    const sc = SiteConfigSchema.parse(readJsonFile(CONTENT_FILES.siteConfig));
    verifyAsset(sc.profile.avatar, "site-config.json [profile.avatar]");
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "site-config.json",
      status: "PASS",
      message: "SiteConfigSchema verified",
    });
  } catch (err) {
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "site-config.json",
      status: "FAIL",
      message: (err as Error).message,
    });
  }

  try {
    const ab = AboutContentSchema.parse(readJsonFile(CONTENT_FILES.about));
    for (const st of ab.stories) {
      verifyAsset(st.image, `about.json [${st.label}]`);
    }
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "about.json",
      status: "PASS",
      message: "AboutContentSchema verified",
    });
  } catch (err) {
    items.push({
      category: "1. Schema & Uniqueness Validation",
      name: "about.json",
      status: "FAIL",
      message: (err as Error).message,
    });
  }

  // 5. Public Asset Integrity
  items.push({
    category: "2. Public Asset Reference Audit",
    name: "public/images/*",
    status: missingAssets.length === 0 ? "PASS" : "WARN",
    message:
      missingAssets.length === 0
        ? "All referenced images exist on disk in public/"
        : `${missingAssets.length} missing image(s): ${missingAssets.slice(0, 3).join(", ")}`,
  });

  renderTree("Validation Report", items);

  const passCount = items.filter((i) => i.status === "PASS").length;
  const warnCount = items.filter((i) => i.status === "WARN").length;
  const failCount = items.filter((i) => i.status === "FAIL").length;

  renderSummary({
    passCount,
    warnCount,
    failCount,
    subject: "validation checks",
    passAdvice: "All content schemas and image references are 100% valid.",
    warnAdvice: "Schemas valid; check missing asset warnings above.",
    failAdvice: "Content validation failed. Fix schema errors above.",
  });

  if (failCount > 0) {
    process.exit(1);
  }
}

function handleSort(): void {
  ensureConsolidatedArrays();
  renderBanner(
    "Sorting & Normalizing Content Arrays",
    "Enforcing canonical ordering, blog read_time calculation, and 2-space JSON formatting"
  );

  // 1. Projects
  const projects = sortProjects(
    ProjectsArraySchema.parse(readJsonFile(CONTENT_FILES.projects))
  );
  atomicWriteJson(CONTENT_FILES.projects, projects);
  console.log(`  ${TREE.BRANCH}${c.green("✔")} Sorted ${c.bold("content/projects.json")} (${projects.length} projects)`);

  // 2. Blog (also recompute read_time for non-intro posts if needed)
  const rawBlog = BlogPostsArraySchema.parse(readJsonFile(CONTENT_FILES.blog));
  const updatedBlog = sortBlogPosts(
    rawBlog.map((post) => ({
      ...post,
      read_time: post.isIntro ? post.read_time : calculateReadTime(post.excerpt),
    }))
  );
  atomicWriteJson(CONTENT_FILES.blog, updatedBlog);
  console.log(`  ${TREE.BRANCH}${c.green("✔")} Sorted & updated read_time in ${c.bold("content/blog.json")} (${updatedBlog.length} entries)`);

  // 3. Skills
  const skills = sortSkills(
    SkillsArraySchema.parse(readJsonFile(CONTENT_FILES.skills))
  );
  atomicWriteJson(CONTENT_FILES.skills, skills);
  console.log(`  ${TREE.BRANCH}${c.green("✔")} Sorted ${c.bold("content/skills.json")} (${skills.length} sections)`);

  // 4. Testimonies
  const testimonies = sortTestimonies(
    TestimoniesArraySchema.parse(readJsonFile(CONTENT_FILES.testimonies))
  );
  atomicWriteJson(CONTENT_FILES.testimonies, testimonies);
  console.log(`  ${TREE.BRANCH}${c.green("✔")} Sorted ${c.bold("content/testimonies.json")} (${testimonies.length} items)`);

  // 5. Experience
  const experience = sortExperience(
    ExperienceArraySchema.parse(readJsonFile(CONTENT_FILES.experience))
  );
  atomicWriteJson(CONTENT_FILES.experience, experience);
  console.log(`  ${TREE.BRANCH}${c.green("✔")} Sorted ${c.bold("content/experience.json")} (${experience.length} items)`);

  // 6. Education
  const education = sortEducation(
    EducationArraySchema.parse(readJsonFile(CONTENT_FILES.education))
  );
  atomicWriteJson(CONTENT_FILES.education, education);
  console.log(`  ${TREE.LEAF}${c.green("✔")} Sorted ${c.bold("content/education.json")} (${education.length} items)\n`);
}

function handleList(collectionArg?: string, isJson = false): void {
  ensureConsolidatedArrays();
  const col = normalizeCollectionArg(collectionArg);
  if (!col || col === "site-config" || col === "about") {
    console.error(
      c.red(
        "Usage: pnpm content list <projects|blog|skills|testimonies|experience|education> [--json]"
      )
    );
    process.exit(1);
  }

  const filePath = CONTENT_FILES[col];
  const data = readJsonFile<unknown[]>(filePath);

  if (isJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  renderBanner(`Content Collection: ${col.toUpperCase()}`, `Source: content/${col}.json (${data.length} items)`);

  if (col === "projects") {
    const list = data as Project[];
    list.forEach((p, idx) => {
      const prefix = idx === list.length - 1 ? TREE.LEAF : TREE.BRANCH;
      const status = p.currentlyWorking ? c.bgGreen(" ACTIVE ") : c.bgGray(` ${p.startDate} `);
      console.log(
        `  ${prefix}${c.bold(`#${String(p.projectId).padStart(2, "0")}`)} ${status} ${c.bold(c.white(p.projectName))} ${c.cyan(`(${p.slug})`)} ${c.dim(`— [${p.skills.slice(0, 4).join(", ")}]`)}`
      );
    });
  } else if (col === "blog") {
    const list = data as BlogPost[];
    list.forEach((b, idx) => {
      const prefix = idx === list.length - 1 ? TREE.LEAF : TREE.BRANCH;
      const badge = b.isIntro ? c.bgMagenta(" INTRO ") : c.bgCyan(` ${b.topic.toUpperCase()} `);
      console.log(
        `  ${prefix}${c.bold(String(b.id).padStart(2, "0"))} ${badge} ${c.bold(c.white(b.title))} ${c.dim(`(${b.read_time} · ${b.datetime.slice(0, 10)})`)}`
      );
    });
  } else if (col === "skills") {
    const list = data as SkillSection[];
    list.forEach((s, idx) => {
      const prefix = idx === list.length - 1 ? TREE.LEAF : TREE.BRANCH;
      console.log(
        `  ${prefix}${c.bgRed(` ${s.index} `)} ${c.bold(c.white(s.title))} ${c.dim(`(${s.subtitle})`)} — ${c.cyan(`${s.skills.length} skills`)}`
      );
    });
  } else if (col === "testimonies") {
    const list = data as TestimonyItem[];
    list.forEach((t, idx) => {
      const prefix = idx === list.length - 1 ? TREE.LEAF : TREE.BRANCH;
      const state = t.isPlaceholder ? c.bgGray(" PLACEHOLDER ") : c.bgGreen(" PUBLISHED ");
      console.log(
        `  ${prefix}${c.bold(`#${t.id}`)} ${state} ${c.bold(c.white(t.author))} ${c.dim(`(${t.organization})`)} — "${t.title}"`
      );
    });
  } else if (col === "experience") {
    const list = data as ExperienceItem[];
    list.forEach((e, idx) => {
      const prefix = idx === list.length - 1 ? TREE.LEAF : TREE.BRANCH;
      console.log(
        `  ${prefix}${c.bold(c.white(e.role))} @ ${c.cyan(e.company_name)} ${c.dim(`(${e.shortened_date})`)}`
      );
    });
  } else if (col === "education") {
    const list = data as EducationItem[];
    list.forEach((e, idx) => {
      const prefix = idx === list.length - 1 ? TREE.LEAF : TREE.BRANCH;
      console.log(
        `  ${prefix}${c.cyan(`[${e.id}]`)} ${c.bold(c.white(e.school_name))} — ${e.subtitle} ${c.dim(`(${e.date_range})`)}`
      );
    });
  }
  console.log();
}

function handleShow(collectionArg?: string, idOrSlug?: string, isJson = false): void {
  ensureConsolidatedArrays();
  const col = normalizeCollectionArg(collectionArg);
  if (!col) {
    console.error(c.red("Usage: pnpm content show <collection> [id|slug] [--json]"));
    process.exit(1);
  }

  if (col === "site-config" || col === "about") {
    const file = col === "site-config" ? CONTENT_FILES.siteConfig : CONTENT_FILES.about;
    const data = readJsonFile(file);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (!idOrSlug) {
    console.error(c.red(`Error: Please provide an ID or slug to inspect in '${col}'.`));
    process.exit(1);
  }

  const list = readJsonFile<Record<string, unknown>[]>(CONTENT_FILES[col]);
  const target = list.find(
    (item) =>
      String(item.projectId ?? item.id ?? item.index ?? "").toLowerCase() ===
        idOrSlug.toLowerCase() ||
      String(item.slug ?? "").toLowerCase() === idOrSlug.toLowerCase()
  );

  if (!target) {
    console.error(c.red(`Error: Item '${idOrSlug}' not found in content/${col}.json.`));
    process.exit(1);
  }

  if (isJson) {
    console.log(JSON.stringify(target, null, 2));
    return;
  }

  console.log();
  hr();
  console.log(JSON.stringify(target, null, 2));
  hr();
  console.log();
}

function parseFlags(args: string[]): Record<string, string | boolean> {
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (!next || next.startsWith("--")) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i++;
      }
    }
  }
  return flags;
}

function handleAdd(collectionArg?: string, restArgs: string[] = []): void {
  ensureConsolidatedArrays();
  const col = normalizeCollectionArg(collectionArg);
  const flags = parseFlags(restArgs);

  if (col === "blog") {
    const posts = BlogPostsArraySchema.parse(readJsonFile(CONTENT_FILES.blog));
    const title = String(flags.title || "");
    const topic = String(flags.topic || "Reflection");
    const excerpt = String(flags.excerpt || "");
    if (!title || !excerpt) {
      console.error(
        c.red(
          'Usage: pnpm content add blog --title "Post Title" --topic "Reflection" --excerpt "Full markdown text..." [--slug "custom-slug"] [--date "ISO-8601"]'
        )
      );
      process.exit(1);
    }

    const maxId = posts.reduce(
      (max, p) => (typeof p.id === "number" && p.id > max ? p.id : max),
      0
    );
    const nextId = maxId + 1;
    const slug = flags.slug ? String(flags.slug) : slugify(title);
    const datetime = flags.date ? String(flags.date) : new Date().toISOString();
    const read_time = calculateReadTime(excerpt);

    const newPost: BlogPost = BlogPostSchema.parse({
      id: nextId,
      slug,
      title,
      datetime,
      topic,
      read_time,
      excerpt,
      isIntro: false,
    });

    const updated = sortBlogPosts([...posts, newPost]);
    atomicWriteJson(CONTENT_FILES.blog, updated);
    console.log(
      `\n  ${c.green("✔")} Added blog post ${c.bold(`#${nextId}`)} ("${title}", ${read_time}) to ${c.cyan("content/blog.json")}\n`
    );
    return;
  }

  if (col === "projects") {
    const projects = ProjectsArraySchema.parse(readJsonFile(CONTENT_FILES.projects));
    const projectName = String(flags.name || flags.title || "");
    const startDate = String(flags.start || new Date().toISOString().slice(0, 7));
    const endDate = String(flags.end || "");
    const currentlyWorking = Boolean(flags.current);
    const description = String(flags.desc || flags.description || "");
    const note = String(flags.note || "");
    const skills = flags.skills
      ? String(flags.skills)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : ["TypeScript", "Next.js"];

    if (!projectName || !description) {
      console.error(
        c.red(
          'Usage: pnpm content add projects --name "Project Name" --start "YYYY-MM" --desc "Description..." [--skills "Next.js,TypeScript"] [--note "..."] [--current]'
        )
      );
      process.exit(1);
    }

    const maxId = projects.reduce((max, p) => (p.projectId > max ? p.projectId : max), 0);
    const projectId = maxId + 1;
    const slug = flags.slug ? String(flags.slug) : slugify(projectName);

    const newProject: Project = ProjectSchema.parse({
      projectId,
      slug,
      projectName,
      startDate,
      endDate,
      currentlyWorking,
      skills,
      imageRefs: [],
      description,
      note,
      associatedWith: [],
    });

    const updated = sortProjects([...projects, newProject]);
    atomicWriteJson(CONTENT_FILES.projects, updated);
    console.log(
      `\n  ${c.green("✔")} Added project ${c.bold(`#${projectId}`)} ("${projectName}") to ${c.cyan("content/projects.json")}\n`
    );
    return;
  }

  if (col === "testimonies") {
    const testimonies = TestimoniesArraySchema.parse(
      readJsonFile(CONTENT_FILES.testimonies)
    );
    const author = String(flags.author || "—");
    const organization = String(flags.org || flags.organization || "");
    const title = String(flags.title || "");
    const quote = String(flags.quote || "");
    const isPlaceholder = Boolean(flags.placeholder);

    if (!title || !quote) {
      console.error(
        c.red(
          'Usage: pnpm content add testimonies --author "Name" --org "Role / Company" --title "Headline" --quote "Full testimony..."'
        )
      );
      process.exit(1);
    }

    const maxId = testimonies.reduce((max, t) => (t.id > max ? t.id : max), 0);
    const nextId = maxId + 1;

    const newItem: TestimonyItem = TestimonyItemSchema.parse({
      id: nextId,
      order: nextId,
      title,
      quote,
      author,
      organization,
      isPlaceholder,
    });

    const updated = sortTestimonies([...testimonies, newItem]);
    atomicWriteJson(CONTENT_FILES.testimonies, updated);
    console.log(
      `\n  ${c.green("✔")} Added testimony ${c.bold(`#${nextId}`)} by ${author} to ${c.cyan("content/testimonies.json")}\n`
    );
    return;
  }

  console.error(
    c.red(
      "Supported 'add' collections: blog, projects, testimonies. For other collections, edit content/<collection>.json and run 'pnpm content validate'."
    )
  );
  process.exit(1);
}

function handleUpdate(collectionArg?: string, idOrSlug?: string, restArgs: string[] = []): void {
  ensureConsolidatedArrays();
  const col = normalizeCollectionArg(collectionArg);
  const flags = parseFlags(restArgs);

  if (!col) {
    console.error(c.red("Usage: pnpm content update <collection> <id|slug> [--field value]"));
    process.exit(1);
  }

  if (col === "site-config") {
    const config = SiteConfigSchema.parse(readJsonFile(CONTENT_FILES.siteConfig));
    if (typeof flags.role === "string") config.profile.role = flags.role;
    if (typeof flags.tagline === "string") config.profile.tagline = flags.tagline;
    if (typeof flags.location === "string") config.profile.location = flags.location;
    if (typeof flags["status-text"] === "string") config.profile.statusText = flags["status-text"];
    if (typeof flags.email === "string") config.profile.email = flags.email;

    const validated = SiteConfigSchema.parse(config);
    atomicWriteJson(CONTENT_FILES.siteConfig, validated);
    console.log(`\n  ${c.green("✔")} Updated ${c.cyan("content/site-config.json")}\n`);
    return;
  }

  if (!idOrSlug) {
    console.error(c.red("Error: Target <id|slug> is required."));
    process.exit(1);
  }

  if (col === "blog") {
    const posts = BlogPostsArraySchema.parse(readJsonFile(CONTENT_FILES.blog));
    const idx = posts.findIndex(
      (p) =>
        String(p.id).toLowerCase() === idOrSlug.toLowerCase() ||
        p.slug.toLowerCase() === idOrSlug.toLowerCase()
    );
    if (idx === -1) {
      console.error(c.red(`Blog post '${idOrSlug}' not found.`));
      process.exit(1);
    }
    const post = { ...posts[idx] };
    if (typeof flags.title === "string") post.title = flags.title;
    if (typeof flags.slug === "string") post.slug = flags.slug;
    if (typeof flags.topic === "string") post.topic = flags.topic;
    if (typeof flags.date === "string") post.datetime = flags.date;
    if (typeof flags.excerpt === "string") {
      post.excerpt = flags.excerpt;
      if (!post.isIntro) post.read_time = calculateReadTime(post.excerpt);
    }
    posts[idx] = BlogPostSchema.parse(post);
    atomicWriteJson(CONTENT_FILES.blog, sortBlogPosts(posts));
    console.log(`\n  ${c.green("✔")} Updated blog post '${idOrSlug}' in ${c.cyan("content/blog.json")}\n`);
    return;
  }

  if (col === "projects") {
    const projects = ProjectsArraySchema.parse(readJsonFile(CONTENT_FILES.projects));
    const idx = projects.findIndex(
      (p) =>
        String(p.projectId) === idOrSlug ||
        p.slug.toLowerCase() === idOrSlug.toLowerCase()
    );
    if (idx === -1) {
      console.error(c.red(`Project '${idOrSlug}' not found.`));
      process.exit(1);
    }
    const proj = { ...projects[idx] };
    if (typeof flags.name === "string") proj.projectName = flags.name;
    if (typeof flags.slug === "string") proj.slug = flags.slug;
    if (typeof flags.start === "string") proj.startDate = flags.start;
    if (typeof flags.end === "string") proj.endDate = flags.end;
    if (typeof flags.desc === "string") proj.description = flags.desc;
    if (typeof flags.note === "string") proj.note = flags.note;
    if (typeof flags.skills === "string") {
      proj.skills = flags.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (flags.current !== undefined) proj.currentlyWorking = Boolean(flags.current);

    projects[idx] = ProjectSchema.parse(proj);
    atomicWriteJson(CONTENT_FILES.projects, sortProjects(projects));
    console.log(`\n  ${c.green("✔")} Updated project '${idOrSlug}' in ${c.cyan("content/projects.json")}\n`);
    return;
  }

  if (col === "testimonies") {
    const testimonies = TestimoniesArraySchema.parse(
      readJsonFile(CONTENT_FILES.testimonies)
    );
    const idx = testimonies.findIndex((t) => String(t.id) === idOrSlug);
    if (idx === -1) {
      console.error(c.red(`Testimony '#${idOrSlug}' not found.`));
      process.exit(1);
    }
    const item = { ...testimonies[idx] };
    if (typeof flags.author === "string") item.author = flags.author;
    if (typeof flags.org === "string") item.organization = flags.org;
    if (typeof flags.title === "string") item.title = flags.title;
    if (typeof flags.quote === "string") item.quote = flags.quote;
    if (flags.placeholder !== undefined) item.isPlaceholder = Boolean(flags.placeholder);
    if (flags.live !== undefined) item.isPlaceholder = false;

    testimonies[idx] = TestimonyItemSchema.parse(item);
    atomicWriteJson(CONTENT_FILES.testimonies, sortTestimonies(testimonies));
    console.log(`\n  ${c.green("✔")} Updated testimony #${idOrSlug} in ${c.cyan("content/testimonies.json")}\n`);
    return;
  }

  console.error(c.red(`Update via CLI flags is supported for: blog, projects, testimonies, site-config.`));
  process.exit(1);
}

function handleRemove(collectionArg?: string, idOrSlug?: string): void {
  ensureConsolidatedArrays();
  const col = normalizeCollectionArg(collectionArg);
  if (!col || col === "site-config" || col === "about" || !idOrSlug) {
    console.error(
      c.red("Usage: pnpm content remove <projects|blog|testimonies|experience|education> <id|slug>")
    );
    process.exit(1);
  }

  const filePath = CONTENT_FILES[col];
  const list = readJsonFile<Record<string, unknown>[]>(filePath);
  const idx = list.findIndex(
    (item) =>
      String(item.projectId ?? item.id ?? item.index ?? "").toLowerCase() ===
        idOrSlug.toLowerCase() ||
      String(item.slug ?? "").toLowerCase() === idOrSlug.toLowerCase()
  );

  if (idx === -1) {
    console.error(c.red(`Item '${idOrSlug}' not found in content/${col}.json.`));
    process.exit(1);
  }

  const [removed] = list.splice(idx, 1);
  atomicWriteJson(filePath, list);
  console.log(
    `\n  ${c.green("✔")} Removed '${String(removed.projectName ?? removed.title ?? removed.author ?? idOrSlug)}' from ${c.cyan(`content/${col}.json`)}\n`
  );
}

function handleHelp(): void {
  renderBanner("Snapshot Content CLI Controller", "IDE Content Management & Zod 4 Validation Reference");

  console.log(`  ${c.bold("USAGE:")}`);
  console.log(`    ${c.cyan("pnpm content")} ${c.yellow("<command>")} ${c.white("[collection]")} ${c.dim("[arguments / flags]")}`);
  console.log();

  console.log(`  ${c.bold("1. INSPECTION & VALIDATION:")}`);
  console.log(`    ${c.yellow("status")}                         ${c.dim("Display health dashboard of all 8 content/*.json files")}`);
  console.log(`    ${c.yellow("validate")}                       ${c.dim("Run strict Zod 4 schema, ID/slug uniqueness, & public/ image checks")}`);
  console.log(`    ${c.yellow("list")}, ${c.yellow("ls")} <collection> [--json]  ${c.dim("List items in projects, blog, skills, testimonies, experience, education")}`);
  console.log(`    ${c.yellow("show")} <collection> <id|slug>    ${c.dim("Pretty-print a single item or singleton (site-config, about)")}`);
  console.log(`    ${c.yellow("sort")}, ${c.yellow("format")}                   ${c.dim("Canonically sort all arrays, recompute blog read_time, & format JSON")}`);
  console.log();

  console.log(`  ${c.bold("2. CONTENT MUTATIONS (ATOMIC IDE WRITES):")}`);
  console.log(`    ${c.yellow("add blog")} --title "..." --topic "Reflection" --excerpt "..."`);
  console.log(`    ${c.yellow("add projects")} --name "..." --start "YYYY-MM" --skills "Next.js,TS" --desc "..."`);
  console.log(`    ${c.yellow("add testimonies")} --author "..." --org "..." --title "..." --quote "..."`);
  console.log(`    ${c.yellow("update")} <collection> <id|slug> [--title "..." | --excerpt "..." | --live]`);
  console.log(`    ${c.yellow("remove")}, ${c.yellow("rm")} <collection> <id|slug>`);
  console.log();
}

function main(): void {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase() || "status";
  const isJson = args.includes("--json");

  switch (command) {
    case "status":
      handleStatus();
      break;
    case "validate":
    case "check":
      handleValidate();
      break;
    case "sort":
    case "format":
      handleSort();
      break;
    case "list":
    case "ls":
      handleList(args[1], isJson);
      break;
    case "show":
    case "view":
      handleShow(args[1], args[2], isJson);
      break;
    case "add":
    case "new":
      handleAdd(args[1], args.slice(2));
      break;
    case "update":
    case "edit":
      handleUpdate(args[1], args[2], args.slice(3));
      break;
    case "remove":
    case "rm":
    case "delete":
      handleRemove(args[1], args[2]);
      break;
    case "help":
    case "--help":
    case "-h":
      handleHelp();
      break;
    default:
      console.error(c.red(`Unknown content command: '${command}'. Run 'pnpm content help'.`));
      process.exit(1);
  }
}

main();
