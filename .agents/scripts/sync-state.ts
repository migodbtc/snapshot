// sync-state.ts: Deterministic repository indexer and state synchronizer for Snapshot Portfolio.
// Scans Snapshot's architectural domains (app, content, integrations)
// and generates .agents/state/index.json with zero LLM token consumption.

import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";
import {
  c,
  renderBanner,
  renderTree,
  renderSummary,
  type TreeItem,
} from "./ui.ts";

const ROOT_DIR = process.cwd();
const STATE_DIR = path.join(ROOT_DIR, ".agents", "state");
const INDEX_FILE = path.join(STATE_DIR, "index.json");

export interface RepoIndex {
  project: string;
  synced_at: string;
  git_commit: string;
  routes: string[];
  components: {
    v2_landing: string[];
    v2_blog: string[];
    v2_shared: string[];
    legacy_shared: string[];
  };
  content_files: string[];
  lib: {
    content_modules: string[];
    constants: string[];
    supabase: string[];
    types: string[];
  };
  server_actions: string[];
  agent_scripts: string[];
  observability: string[];
}

function findFilesRecursive(dir: string, pattern: RegExp): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== ".git") {
          walk(fullPath);
        }
      } else if (pattern.test(entry.name)) {
        results.push(path.relative(ROOT_DIR, fullPath).replace(/\\/g, "/"));
      }
    }
  }

  walk(dir);
  return results.sort();
}

function getGitCommit(): string {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
  } catch {
    return "uncommitted";
  }
}

export function syncState(): { index: RepoIndex; items: TreeItem[] } {
  if (!fs.existsSync(STATE_DIR)) {
    fs.mkdirSync(STATE_DIR, { recursive: true });
  }

  const items: TreeItem[] = [];

  // 1. App Router Pages & V2 Components
  const routes = findFilesRecursive(
    path.join(ROOT_DIR, "app"),
    /^(page|route)\.(tsx|ts)$/
  );
  const v2LandingComponents = findFilesRecursive(
    path.join(ROOT_DIR, "app", "v2", "landing", "_components"),
    /\.(tsx|ts)$/
  );
  const v2BlogComponents = findFilesRecursive(
    path.join(ROOT_DIR, "app", "v2", "blog", "_components"),
    /\.(tsx|ts)$/
  );
  const v2SharedComponents = findFilesRecursive(
    path.join(ROOT_DIR, "app", "v2", "_components"),
    /\.(tsx|ts)$/
  );
  const legacySharedComponents = findFilesRecursive(
    path.join(ROOT_DIR, "app", "_components"),
    /\.(tsx|ts)$/
  );

  items.push({
    category: "1. App Router & V2 UI",
    name: "Routes & Pages",
    status: routes.length > 0 ? "PASS" : "WARN",
    message: `${routes.length} routes discovered in app/`,
  });
  items.push({
    category: "1. App Router & V2 UI",
    name: "V2 Components",
    status: v2LandingComponents.length + v2BlogComponents.length > 0 ? "PASS" : "WARN",
    message: `${v2LandingComponents.length} landing, ${v2BlogComponents.length} blog, ${v2SharedComponents.length} shared`,
  });

  // 2. Consolidated JSON Content Arrays & Zod Layer
  const contentFiles = findFilesRecursive(path.join(ROOT_DIR, "content"), /\.json$/);
  const libContentModules = findFilesRecursive(path.join(ROOT_DIR, "lib", "content"), /\.(ts|tsx)$/);
  const libConstants = findFilesRecursive(path.join(ROOT_DIR, "lib", "constants"), /\.(ts|tsx)$/);
  const libTypes = findFilesRecursive(path.join(ROOT_DIR, "lib", "types"), /\.(ts|tsx)$/);
  const agentScripts = findFilesRecursive(path.join(ROOT_DIR, ".agents", "scripts"), /\.(ts|cjs|ps1)$/);

  items.push({
    category: "2. Content & Zod Layer",
    name: "JSON Array Collections",
    status: contentFiles.length === 8 ? "PASS" : "WARN",
    message: `${contentFiles.length} top-level JSON files in content/ (${contentFiles.map((f) => path.basename(f)).join(", ")})`,
  });

  items.push({
    category: "2. Content & Zod Layer",
    name: "Schemas, Loaders & CLI",
    status: libContentModules.length > 0 && fs.existsSync(path.join(ROOT_DIR, ".agents", "scripts", "content.ts")) ? "PASS" : "WARN",
    message: `${libContentModules.length} modules in lib/content/, ${libConstants.length} in lib/constants/, pnpm content CLI active`,
  });

  // 3. Integrations, Server Actions & Observability
  const serverActions = findFilesRecursive(path.join(ROOT_DIR, "app", "actions"), /\.ts$/);
  const libSupabase = findFilesRecursive(path.join(ROOT_DIR, "lib", "supabase"), /\.ts$/);
  const observabilityFiles = [
    "instrumentation.ts",
    "instrumentation-client.ts",
    "sentry.server.config.ts",
    "sentry.edge.config.ts",
  ].filter((f) => fs.existsSync(path.join(ROOT_DIR, f)));

  items.push({
    category: "3. Integrations & Telemetry",
    name: "Server Actions & Clients",
    status: serverActions.length > 0 && libSupabase.length > 0 && observabilityFiles.length > 0 ? "PASS" : "WARN",
    message: `${serverActions.length} Server Action (${serverActions.join(", ")}), ${libSupabase.length} Supabase clients, ${observabilityFiles.length} Sentry configs`,
  });

  const index: RepoIndex = {
    project: "snapshot-portfolio-project",
    synced_at: new Date().toISOString(),
    git_commit: getGitCommit(),
    routes,
    components: {
      v2_landing: v2LandingComponents,
      v2_blog: v2BlogComponents,
      v2_shared: v2SharedComponents,
      legacy_shared: legacySharedComponents,
    },
    content_files: contentFiles,
    lib: {
      content_modules: libContentModules,
      constants: libConstants,
      supabase: libSupabase,
      types: libTypes,
    },
    server_actions: serverActions,
    agent_scripts: agentScripts,
    observability: observabilityFiles,
  };

  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2), "utf-8");

  return { index, items };
}

export function main(): void {
  renderBanner("Synchronizing Snapshot State Ledger", "Zero-token repository indexing (.agents/state/index.json)");
  const { index, items } = syncState();
  renderTree("Snapshot Architecture Discovery", items);

  console.log(`\n${c.gray("  State Ledger:")} ${c.bold(c.cyan(INDEX_FILE))}`);
  console.log(`${c.gray("  Git Reference:")} ${c.bold(index.git_commit)}`);
  console.log(`${c.gray("  Synced At:    ")} ${c.gray(index.synced_at)}`);

  renderSummary({
    passCount: items.filter((i) => i.status === "PASS").length,
    warnCount: items.filter((i) => i.status === "WARN").length,
    failCount: items.filter((i) => i.status === "FAIL").length,
    subject: "architectural domains",
    passAdvice: "Repository state index successfully written to .agents/state/index.json.",
    warnAdvice: "State synchronized with notices.",
    failAdvice: "Failed to scan architectural domains.",
  });
}

if (process.argv[1]?.endsWith("sync-state.ts")) {
  main();
}
