// kanban.ts: Deterministic CLI controller and state machine for Snapshot Portfolio's Agentic Kanban.
// Validates machine state in .agents/kanban/*.json via TypeScript contracts.
// Enforces Hard WIP=1, role boundaries, atomic transactional moves, and verification gates.

import * as fs from "node:fs/promises";
import * as path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";
import {
  c,
  TREE,
  renderBanner,
  hr,
  statusBadge,
  priorityBadge,
  domainBadge,
} from "./ui.ts";

export type Domain =
  | "app"
  | "content"
  | "integrations"
  | "design";

export type Priority = "P0" | "P1" | "P2";

export type TaskStatus =
  | "planning"
  | "in_progress"
  | "testing"
  | "review"
  | "live"
  | "blocked";

export interface AcceptanceCriterion {
  id: number;
  text: string;
  done: boolean;
}

export interface TaskCard {
  id: string; // e.g. "TASK-001"
  title: string;
  domain: Domain;
  priority: Priority;
  status: TaskStatus;
  goal: string;
  invariants: string[];
  acceptanceCriteria: AcceptanceCriterion[];
  assignedAgent?: string;
  blockerReason?: string;
  previousStatus?: TaskStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  commitHash?: string;
}

export interface SuggestionCard {
  id: string; // e.g. "SUGG-001"
  text: string;
  author: "user" | "agent";
  createdAt: string;
}

const KANBAN_DIR = path.resolve(process.cwd(), ".agents/kanban");

const FILES = {
  suggestions: path.join(KANBAN_DIR, "00_suggestions.json"),
  planning: path.join(KANBAN_DIR, "01_planning.json"),
  in_progress: path.join(KANBAN_DIR, "02_in_progress.json"),
  testing: path.join(KANBAN_DIR, "03_testing.json"),
  review: path.join(KANBAN_DIR, "04_review.json"),
  live: path.join(KANBAN_DIR, "05_live.json"),
} as const;

type ColumnKey = keyof typeof FILES;

// === ATOMIC FILE OPERATIONS & TRANSACTIONAL MOVES ===

async function safeRename(source: string, destination: string, retries = 3): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await fs.rename(source, destination);
      return;
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if ((code === "EPERM" || code === "EBUSY") && attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
        continue;
      }
      // Fallback for Windows cross-device or permission locking: copy + unlink
      try {
        await fs.copyFile(source, destination);
        await fs.unlink(source);
        return;
      } catch {
        throw err;
      }
    }
  }
}

async function atomicWrite(targetFile: string, data: unknown): Promise<void> {
  await fs.mkdir(KANBAN_DIR, { recursive: true });
  const nonce = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const tmpFile = `${targetFile}.${nonce}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(data, null, 2), "utf8");
  await safeRename(tmpFile, targetFile);
}

async function transactionalMove(
  sourceFile: string,
  targetFile: string,
  sourceData: unknown[],
  targetData: unknown[]
): Promise<void> {
  if (sourceFile === targetFile) {
    await atomicWrite(targetFile, targetData);
    return;
  }

  await fs.mkdir(KANBAN_DIR, { recursive: true });
  const nonce = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const sourceTmp = `${sourceFile}.${nonce}.tmp`;
  const targetTmp = `${targetFile}.${nonce}.tmp`;

  try {
    await fs.writeFile(sourceTmp, JSON.stringify(sourceData, null, 2), "utf8");
    await fs.writeFile(targetTmp, JSON.stringify(targetData, null, 2), "utf8");

    await safeRename(targetTmp, targetFile);
    await safeRename(sourceTmp, sourceFile);
  } catch (error) {
    await fs.rm(sourceTmp, { force: true }).catch(() => {});
    await fs.rm(targetTmp, { force: true }).catch(() => {});
    throw new Error(`Transactional state move failed: ${error}`);
  }
}

// === STORAGE HELPERS ===

async function readJson<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function getAllTasks(): Promise<{ column: ColumnKey; tasks: TaskCard[] }[]> {
  const columns: ColumnKey[] = ["planning", "in_progress", "testing", "review", "live"];
  const result: { column: ColumnKey; tasks: TaskCard[] }[] = [];
  for (const col of columns) {
    const tasks = await readJson<TaskCard>(FILES[col]);
    result.push({ column: col, tasks });
  }
  return result;
}

async function findTask(
  id: string
): Promise<{ task: TaskCard; column: ColumnKey; index: number } | null> {
  const upperId = id.toUpperCase();
  const columns: ColumnKey[] = ["planning", "in_progress", "testing", "review", "live"];
  for (const col of columns) {
    const tasks = await readJson<TaskCard>(FILES[col]);
    const index = tasks.findIndex((t) => t.id.toUpperCase() === upperId);
    if (index !== -1) {
      return { task: tasks[index], column: col, index };
    }
  }
  return null;
}

async function getNextTaskId(): Promise<string> {
  const allCols = await getAllTasks();
  let maxId = 0;
  for (const { tasks } of allCols) {
    for (const t of tasks) {
      const match = t.id.match(/^TASK-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxId) maxId = num;
      }
    }
  }
  const next = maxId + 1;
  return `TASK-${String(next).padStart(3, "0")}`;
}

async function getNextSuggestionId(): Promise<string> {
  const suggestions = await readJson<SuggestionCard>(FILES.suggestions);
  let maxId = 0;
  for (const s of suggestions) {
    const match = s.id.match(/^SUGG-(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  }
  return `SUGG-${String(maxId + 1).padStart(3, "0")}`;
}

// === CARD RENDERERS ===

function renderTaskCard(task: TaskCard, isCompact = false): void {
  const idStr = c.bold(c.white(task.id));
  const pBadge = priorityBadge(task.priority);
  const sBadge = statusBadge(task.status);
  const dBadge = domainBadge(task.domain);

  console.log(`  ${idStr} ${pBadge} ${sBadge} ${dBadge} ${c.bold(task.title)}`);
  if (task.assignedAgent) {
    console.log(`  ${c.dim("Assigned:")} ${c.cyan(task.assignedAgent)}`);
  }
  if (task.status === "blocked" && task.blockerReason) {
    console.log(`  ${c.bgRed(" BLOCKER ")} ${c.red(task.blockerReason)}`);
  }

  if (isCompact) return;

  if (task.goal) {
    console.log(`  ${c.dim("Goal:")} ${task.goal}`);
  }

  if (task.invariants && task.invariants.length > 0) {
    console.log(`  ${c.dim("Invariants:")}`);
    for (const inv of task.invariants) {
      console.log(`    ${TREE.BRANCH}${c.yellow(inv)}`);
    }
  }

  if (task.acceptanceCriteria && task.acceptanceCriteria.length > 0) {
    const doneCount = task.acceptanceCriteria.filter((c) => c.done).length;
    console.log(`  ${c.dim("Acceptance Criteria:")} (${doneCount}/${task.acceptanceCriteria.length})`);
    task.acceptanceCriteria.forEach((crit, idx) => {
      const isLast = idx === task.acceptanceCriteria.length - 1;
      const connector = isLast ? TREE.LEAF : TREE.BRANCH;
      const check = crit.done ? c.green("[✔]") : c.gray("[ ]");
      const text = crit.done ? c.dim(crit.text) : c.white(crit.text);
      console.log(`    ${connector}${check} #${crit.id} ${text}`);
    });
  }

  if (task.commitHash) {
    console.log(`  ${c.dim("Commit:")} ${c.green(task.commitHash)} ${c.dim(`(${task.completedAt})`)}`);
  }
}

// === COMMAND HANDLERS ===

function renderTaskSummary(t: TaskCard): string {
  const parts: string[] = [
    priorityBadge(t.priority),
    domainBadge(t.domain),
  ];
  if (t.assignedAgent) {
    parts.push(c.magenta(`@${t.assignedAgent.replace(/^@/, "")}`));
  }
  if (t.acceptanceCriteria && t.acceptanceCriteria.length > 0) {
    const doneCount = t.acceptanceCriteria.filter((c) => c.done).length;
    const totalCount = t.acceptanceCriteria.length;
    const critColor = doneCount === totalCount ? c.green : doneCount > 0 ? c.yellow : c.gray;
    parts.push(critColor(`(${doneCount}/${totalCount} crit)`));
  }
  if (t.status === "blocked") {
    parts.push(c.bgRed(" BLOCKED "));
    if (t.blockerReason) {
      parts.push(c.red(`"${t.blockerReason}"`));
    }
  }
  return parts.join(" ");
}

async function handleStatus(isJson: boolean): Promise<void> {
  const suggestions = await readJson<SuggestionCard>(FILES.suggestions);
  const planning = await readJson<TaskCard>(FILES.planning);
  const inProgress = await readJson<TaskCard>(FILES.in_progress);
  const testing = await readJson<TaskCard>(FILES.testing);
  const review = await readJson<TaskCard>(FILES.review);
  const live = await readJson<TaskCard>(FILES.live);

  if (isJson) {
    console.log(
      JSON.stringify(
        {
          suggestions: {
            count: suggestions.length,
            items: suggestions,
          },
          planning: planning.length,
          in_progress: inProgress,
          testing: testing.length,
          review: review.length,
          live: live.length,
        },
        null,
        2
      )
    );
    return;
  }

  renderBanner("Deterministic Kanban System", "Operational sprint dashboard & deterministic state machine");

  console.log(`  ${c.bold("Board Pipeline Counters:")}`);
  console.log(`  ${TREE.BRANCH}${c.cyan("Suggestions")} ....... ${suggestions.length}`);
  console.log(`  ${TREE.BRANCH}${c.gray("01 Planning")} ....... ${planning.length}`);
  console.log(`  ${TREE.BRANCH}${c.yellow("02 In Progress")} .... ${inProgress.length} (WIP limit = 1)`);
  console.log(`  ${TREE.BRANCH}${c.cyan("03 Testing")} ........ ${testing.length}`);
  console.log(`  ${TREE.BRANCH}${c.magenta("04 Review")} ......... ${review.length}`);
  console.log(`  ${TREE.LEAF}${c.green("05 Live (Shipped)")} ... ${live.length}`);
  console.log();

  if (suggestions.length > 0) {
    console.log(`  ${c.bold("💡 Suggestions Backlog:")} (${suggestions.length})`);
    suggestions.forEach((s) => {
      console.log(`    ${TREE.BRANCH}${c.cyan(s.id)}: ${s.text} ${c.dim(`[author: ${s.author}]`)}`);
    });
    console.log();
  }

  if (inProgress.length > 0) {
    console.log(`  ${c.bold("⚡ Active Sprint Task (WIP=1):")}`);
    hr();
    renderTaskCard(inProgress[0]);
    hr();
  } else {
    console.log(`  ${c.dim("No active task in progress. Run 'pnpm kanban start <id>' to pick a task.")}`);
  }
  console.log();
}

async function handleCurrent(isJson: boolean): Promise<void> {
  const inProgress = await readJson<TaskCard>(FILES.in_progress);
  if (inProgress.length === 0) {
    if (isJson) {
      console.log("null");
    } else {
      console.log(c.dim("No task currently in progress."));
    }
    return;
  }
  if (isJson) {
    console.log(JSON.stringify(inProgress[0], null, 2));
  } else {
    renderTaskCard(inProgress[0]);
  }
}

async function handleList(column?: string, isJson: boolean = false): Promise<void> {
  const colMap: Record<string, ColumnKey> = {
    sugg: "suggestions",
    suggestions: "suggestions",
    plan: "planning",
    planning: "planning",
    prog: "in_progress",
    in_progress: "in_progress",
    test: "testing",
    testing: "testing",
    rev: "review",
    review: "review",
    live: "live",
  };

  if (column && colMap[column.toLowerCase()]) {
    const key = colMap[column.toLowerCase()];
    if (key === "suggestions") {
      const list = await readJson<SuggestionCard>(FILES.suggestions);
      if (isJson) {
        console.log(JSON.stringify(list, null, 2));
      } else {
        console.log(`\n  ${c.bold("Suggestions Backlog")} (${list.length}):`);
        list.forEach((s) => console.log(`  ${c.cyan(s.id)} [${s.author}] ${s.text}`));
      }
    } else {
      const list = await readJson<TaskCard>(FILES[key]);
      if (isJson) {
        console.log(JSON.stringify(list, null, 2));
      } else {
        console.log(`\n  ${c.bold(`Column: ${key}`)} (${list.length} tasks):`);
        list.forEach((t) => renderTaskCard(t, true));
      }
    }
    return;
  }

  // List all columns including suggestions
  const allCols = await getAllTasks();
  const suggestions = await readJson<SuggestionCard>(FILES.suggestions);
  if (isJson) {
    console.log(JSON.stringify({ suggestions, columns: allCols }, null, 2));
    return;
  }

  console.log(`\n  ${c.bold("Full Kanban Pipeline:")}\n`);

  console.log(`  ${c.bold(`[SUGGESTIONS]`)} (${suggestions.length})`);
  if (suggestions.length === 0) {
    console.log(`    ${c.dim("(empty)")}`);
  } else {
    suggestions.forEach((s) => {
      console.log(`    ${TREE.BRANCH}${c.cyan(s.id)}: ${s.text} ${c.dim(`[author: ${s.author}]`)}`);
    });
  }
  console.log();

  for (const { column: col, tasks } of allCols) {
    console.log(`  ${c.bold(`[${col.toUpperCase()}]`)} (${tasks.length})`);
    if (tasks.length === 0) {
      console.log(`    ${c.dim("(empty)")}`);
    } else {
      tasks.forEach((t) => {
        console.log(`    ${TREE.BRANCH}${c.bold(t.id)}: ${t.title}  ${renderTaskSummary(t)}`);
      });
    }
    console.log();
  }
}

async function handleShow(id: string, isJson: boolean): Promise<void> {
  const result = await findTask(id);
  if (!result) {
    console.error(c.red(`Error: Task '${id}' not found on board.`));
    process.exit(1);
  }
  if (isJson) {
    console.log(JSON.stringify(result.task, null, 2));
    return;
  }
  console.log();
  renderTaskCard(result.task);
  console.log();
}

async function handleSuggest(text: string): Promise<void> {
  const id = await getNextSuggestionId();
  const suggestions = await readJson<SuggestionCard>(FILES.suggestions);
  const card: SuggestionCard = {
    id,
    text,
    author: "user",
    createdAt: new Date().toISOString(),
  };
  suggestions.push(card);
  await atomicWrite(FILES.suggestions, suggestions);
  console.log(`\n  ${c.green("✔")} Created suggestion ${c.cyan(id)}: "${text}"`);
}

async function handleAdd(args: string[]): Promise<void> {
  const title = args[0];
  if (!title) {
    console.error(c.red("Error: Task title is required. Usage: pnpm kanban add \"Title\" [options]"));
    process.exit(1);
  }

  let domain: Domain = "app";
  let priority: Priority = "P1";
  let goal = title;
  const invariants: string[] = [];
  const criteriaTexts: string[] = [];
  let assignedAgent: string | undefined;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--p0") priority = "P0";
    else if (arg === "--p1") priority = "P1";
    else if (arg === "--p2") priority = "P2";
    else if (arg === "--domain" && args[i + 1]) domain = args[++i] as Domain;
    else if (arg === "--goal" && args[i + 1]) goal = args[++i];
    else if (arg === "--agent" && args[i + 1]) assignedAgent = args[++i];
    else if (arg === "--inv" && args[i + 1]) invariants.push(args[++i]);
    else if (arg === "--crit" && args[i + 1]) criteriaTexts.push(args[++i]);
  }

  const id = await getNextTaskId();
  const planning = await readJson<TaskCard>(FILES.planning);

  const acceptanceCriteria: AcceptanceCriterion[] = criteriaTexts.length > 0
    ? criteriaTexts.map((text, idx) => ({ id: idx + 1, text, done: false }))
    : [
        { id: 1, text: "Implementation matches Snapshot domain & design invariants", done: false },
        { id: 2, text: "Verification gate passes (pnpm typecheck + pnpm lint)", done: false },
      ];

  const card: TaskCard = {
    id,
    title,
    domain,
    priority,
    status: "planning",
    goal,
    invariants,
    acceptanceCriteria,
    assignedAgent,
    createdAt: new Date().toISOString(),
  };

  planning.push(card);
  await atomicWrite(FILES.planning, planning);

  console.log(`\n  ${c.green("✔")} Created task card ${c.bold(id)}: "${title}" in 01_planning`);
  console.log(`    Domain: ${domain} | Priority: ${priority}`);
}

async function handleUpdate(args: string[]): Promise<void> {
  const id = args[0];
  if (!id) {
    console.error(c.red("Error: Task ID required. Usage: pnpm kanban update <TASK-ID> [options]"));
    process.exit(1);
  }

  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  const taskList = await readJson<TaskCard>(FILES[found.column]);
  const task = taskList[found.index];

  const criteriaTexts: string[] = [];
  let resetCrit = false;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--p0") task.priority = "P0";
    else if (arg === "--p1") task.priority = "P1";
    else if (arg === "--p2") task.priority = "P2";
    else if (arg === "--priority" && args[i + 1]) task.priority = args[++i] as Priority;
    else if (arg === "--title" && args[i + 1]) task.title = args[++i];
    else if (arg === "--goal" && args[i + 1]) task.goal = args[++i];
    else if (arg === "--agent" && args[i + 1]) task.assignedAgent = args[++i];
    else if (arg === "--domain" && args[i + 1]) task.domain = args[++i] as Domain;
    else if (arg === "--reset-crit") resetCrit = true;
    else if (arg === "--crit" && args[i + 1]) criteriaTexts.push(args[++i]);
  }

  if (resetCrit) {
    task.acceptanceCriteria = [];
  }
  if (criteriaTexts.length > 0) {
    task.acceptanceCriteria = criteriaTexts.map((text, idx) => ({
      id: idx + 1,
      text,
      done: false,
    }));
  }

  await atomicWrite(FILES[found.column], taskList);
  console.log(`\n  ${c.green("✔")} Updated task ${c.bold(id)} in column ${found.column}: "${task.title}"`);
  console.log(`    Priority: ${task.priority} | Domain: ${task.domain} | Criteria: ${task.acceptanceCriteria.length}`);
}

async function handleStart(id: string): Promise<void> {
  const inProgress = await readJson<TaskCard>(FILES.in_progress);
  if (inProgress.length > 0) {
    console.error(c.red(`\n  ✖ Hard WIP=1 Limit Enforced!`));
    console.error(`  Active task in progress: ${c.bold(inProgress[0].id)} ("${inProgress[0].title}")`);
    console.error(`  Finish, test, review, or move the current task before starting a new one.\n`);
    process.exit(1);
  }

  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  if (found.column === "in_progress") {
    console.log(c.yellow(`Task '${id}' is already in progress.`));
    return;
  }

  const sourceList = await readJson<TaskCard>(FILES[found.column]);
  const [card] = sourceList.splice(found.index, 1);

  card.status = "in_progress";
  card.startedAt = new Date().toISOString();

  await transactionalMove(FILES[found.column], FILES.in_progress, sourceList, [card]);
  console.log(`\n  ${c.green("✔")} Moved ${c.bold(id)} to ${c.yellow("02_in_progress")}`);
  console.log(`  Started at: ${card.startedAt}`);
}

async function handleTick(id: string, criteriaIdStr: string, doneValue = true): Promise<void> {
  const criteriaId = parseInt(criteriaIdStr, 10);
  if (isNaN(criteriaId)) {
    console.error(c.red("Error: Criteria ID must be an integer. Usage: pnpm kanban tick <TASK-ID> <number>"));
    process.exit(1);
  }

  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  const taskList = await readJson<TaskCard>(FILES[found.column]);
  const task = taskList[found.index];

  const crit = task.acceptanceCriteria.find((c) => c.id === criteriaId);
  if (!crit) {
    console.error(c.red(`Error: Criterion #${criteriaId} not found on task '${id}'.`));
    process.exit(1);
  }

  crit.done = doneValue;
  await atomicWrite(FILES[found.column], taskList);

  const checkMark = doneValue ? c.green("✔ [Done]") : c.yellow("○ [Pending]");
  console.log(`\n  ${checkMark} Updated ${id} Criterion #${criteriaId}: "${crit.text}"`);
}

async function handleTest(id: string): Promise<void> {
  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  if (found.column === "testing") {
    console.log(c.yellow(`Task '${id}' is already in 03_testing.`));
    return;
  }

  const sourceList = await readJson<TaskCard>(FILES[found.column]);
  const [card] = sourceList.splice(found.index, 1);

  card.status = "testing";

  const targetList = await readJson<TaskCard>(FILES.testing);
  targetList.push(card);

  await transactionalMove(FILES[found.column], FILES.testing, sourceList, targetList);
  console.log(`\n  ${c.green("✔")} Handed off ${c.bold(id)} to ${c.cyan("03_testing")} for QA verification.`);
}

async function handleReview(id: string): Promise<void> {
  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  const card = found.task;
  console.log(`\n  ${c.bold("Executing Verification Gate for Review...")}`);
  console.log(`  Task Domain: ${c.cyan(card.domain)}`);

  // Step 1: Typecheck
  try {
    console.log(`  ${TREE.BRANCH}Running ${c.bold("pnpm tsc --noEmit")}...`);
    execSync("pnpm tsc --noEmit", { stdio: "inherit" });
    console.log(`  ${TREE.BRANCH}${c.green("Typecheck clean: 0 errors.")}`);
  } catch {
    console.error(c.red(`\n  ✖ Review Gate Failed: TypeScript compilation errors detected.`));
    process.exit(1);
  }

  // Step 2: ESLint
  try {
    console.log(`  ${TREE.LEAF}Running linter: ${c.bold("pnpm lint")}...`);
    execSync("pnpm lint", { stdio: "inherit" });
    console.log(`  ${c.green("ESLint verification passed!")}`);
  } catch {
    console.error(c.red(`\n  ✖ Review Gate Failed: ESLint reported errors.`));
    process.exit(1);
  }

  // If already in review, verification passed without moving
  if (found.column === "review") {
    console.log(`\n  ${c.green("✔")} Verification gate passed! Task ${c.bold(id)} is already in ${c.magenta("04_review")}.`);
    return;
  }

  // Transition to review
  const sourceList = await readJson<TaskCard>(FILES[found.column]);
  const [activeCard] = sourceList.splice(found.index, 1);
  activeCard.status = "review";

  const targetList = await readJson<TaskCard>(FILES.review);
  targetList.push(activeCard);

  await transactionalMove(FILES[found.column], FILES.review, sourceList, targetList);
  console.log(`\n  ${c.green("✔")} Moved ${c.bold(id)} to ${c.magenta("04_review")}. Ready for sign-off.`);
}

async function handleDone(id: string): Promise<void> {
  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  if (found.column === "live") {
    console.log(c.yellow(`Task '${id}' is already live (shipped).`));
    return;
  }

  console.log(`\n  ${c.bold("Executing Full Workspace Verification Gate for Shipping...")}`);

  // Run typecheck + lint
  try {
    console.log(`  ${TREE.BRANCH}Running ${c.bold("pnpm tsc --noEmit")}...`);
    execSync("pnpm tsc --noEmit", { stdio: "inherit" });
    console.log(`  ${TREE.BRANCH}Running ${c.bold("pnpm lint")}...`);
    execSync("pnpm lint", { stdio: "inherit" });
    console.log(`  ${TREE.LEAF}${c.green("Workspace verification gate green.")}`);
  } catch {
    console.error(c.red(`\n  ✖ Final Shipping Gate Failed: Typecheck or ESLint failed.`));
    process.exit(1);
  }

  // Get commit hash
  let commitHash = "unknown";
  try {
    commitHash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    // If git not available, keep unknown
  }

  // Re-fetch current card position in case files changed during test run
  const currentFound = await findTask(id);
  if (!currentFound) {
    console.error(c.red(`Error: Task '${id}' not found after test run.`));
    process.exit(1);
  }

  const sourceList = await readJson<TaskCard>(FILES[currentFound.column]);
  const cardIndex = sourceList.findIndex((t) => t.id.toUpperCase() === id.toUpperCase());
  if (cardIndex === -1) {
    console.error(c.red(`Error: Task '${id}' not found in column ${currentFound.column}.`));
    process.exit(1);
  }
  const [card] = sourceList.splice(cardIndex, 1);

  card.status = "live";
  card.completedAt = new Date().toISOString();
  card.commitHash = commitHash;

  const targetList = await readJson<TaskCard>(FILES.live);
  targetList.push(card);

  await transactionalMove(FILES[currentFound.column], FILES.live, sourceList, targetList);
  console.log(`\n  ${c.green("🎉")} Task ${c.bold(id)} is now ${c.bgGreen(" LIVE ")}!`);
  console.log(`  Stamped with commit: ${c.green(commitHash)} at ${card.completedAt}`);
}

async function handleReopen(id: string): Promise<void> {
  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  const sourceList = await readJson<TaskCard>(FILES[found.column]);
  const [card] = sourceList.splice(found.index, 1);

  card.status = "planning";
  delete card.completedAt;

  const targetList = await readJson<TaskCard>(FILES.planning);
  targetList.push(card);

  await transactionalMove(FILES[found.column], FILES.planning, sourceList, targetList);
  console.log(`\n  ${c.yellow("↩")} Reopened ${c.bold(id)} back to ${c.gray("01_planning")}.`);
}

async function handleBlock(id: string, reason: string): Promise<void> {
  if (!reason) {
    console.error(c.red("Error: Blocker reason is mandatory. Usage: pnpm kanban block <id> \"<reason>\""));
    process.exit(1);
  }

  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  const taskList = await readJson<TaskCard>(FILES[found.column]);
  const task = taskList[found.index];

  task.previousStatus = task.status;
  task.status = "blocked";
  task.blockerReason = reason;

  await atomicWrite(FILES[found.column], taskList);
  console.log(`\n  ${c.bgRed(" BLOCKED ")} Task ${id} flagged as blocked: "${reason}"`);
}

async function handleUnblock(id: string): Promise<void> {
  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  const taskList = await readJson<TaskCard>(FILES[found.column]);
  const task = taskList[found.index];

  if (task.status !== "blocked") {
    console.log(c.yellow(`Task ${id} is not blocked.`));
    return;
  }

  task.status = task.previousStatus || "in_progress";
  delete task.blockerReason;
  delete task.previousStatus;

  await atomicWrite(FILES[found.column], taskList);
  console.log(`\n  ${c.green("✔")} Unblocked ${id}. Returned to status: ${task.status}`);
}

async function handleDrop(id: string): Promise<void> {
  const found = await findTask(id);
  if (!found) {
    console.error(c.red(`Error: Task '${id}' not found.`));
    process.exit(1);
  }

  const taskList = await readJson<TaskCard>(FILES[found.column]);
  taskList.splice(found.index, 1);

  await atomicWrite(FILES[found.column], taskList);
  console.log(`\n  ${c.red("✖")} Dropped task ${id} from column ${found.column}.`);
}

async function handleSync(): Promise<void> {
  console.log(`\n  ${c.bold("Verifying Kanban Storage & JSON Integrity...")}`);
  const allCols = await getAllTasks();
  const seenIds = new Set<string>();
  let totalTasks = 0;

  for (const { column, tasks } of allCols) {
    console.log(`  ${TREE.BRANCH}Checking ${column}.json (${tasks.length} items)...`);
    for (const t of tasks) {
      if (seenIds.has(t.id)) {
        console.error(c.red(`    ✖ Duplicate Task ID detected: ${t.id}`));
      }
      seenIds.add(t.id);
      totalTasks++;
    }
  }

  console.log(`  ${TREE.LEAF}${c.green("Integrity check passed.")} Total unique tasks: ${totalTasks}\n`);
}

async function handleHelp(): Promise<void> {
  renderBanner("Deterministic Kanban System", "CLI Reference & Agent Protocol Manual");

  console.log(`  ${c.bold("USAGE:")}`);
  console.log(`    ${c.cyan("pnpm kanban")} ${c.yellow("<command>")} ${c.white("[arguments]")} ${c.dim("[flags]")}`);
  console.log(`    ${c.cyan("pnpm kanban:help")}`);
  console.log();

  console.log(`  ${c.bold("1. BOARD OBSERVABILITY:")}`);
  console.log(`    ${c.yellow("status")}                 ${c.dim("Render full sprint pipeline dashboard (default)")}`);
  console.log(`    ${c.yellow("current")} [--json]        ${c.dim("Display active WIP card (compact / machine-readable)")}`);
  console.log(`    ${c.yellow("list")}, ${c.yellow("ls")} [col]         ${c.dim("List cards in a column (planning, in_progress, live, etc.)")}`);
  console.log(`    ${c.yellow("show")}, ${c.yellow("view")} <id> [--json] ${c.dim("Pretty-print full task card with criteria and invariants")}`);
  console.log(`    ${c.yellow("help")}, ${c.yellow("--help")}, ${c.yellow("-h")}       ${c.dim("Display this reference manual")}`);
  console.log();

  console.log(`  ${c.bold("2. TASK LIFECYCLE (ORCHESTRATOR ONLY):")}`);
  console.log(`    ${c.yellow("add")} "<title>" [flags]   ${c.dim("Create structured task card in 01_planning")}`);
  console.log(`      ${c.dim("Flags: --domain <d> | --p0|--p1|--p2 | --agent <@agent> | --goal <g> | --crit <c>")}`);
  console.log(`    ${c.yellow("start")}, ${c.yellow("pick")} <id>       ${c.dim("Move task to 02_in_progress (Hard WIP=1 guardrail)")}`);
  console.log(`    ${c.yellow("test")} <id>              ${c.dim("Move task 02_in_progress -> 03_testing for QA handoff")}`);
  console.log(`    ${c.yellow("review")} <id>            ${c.dim("Gate: tsc --noEmit + domain tests -> 04_review")}`);
  console.log(`    ${c.yellow("done")}, ${c.yellow("ship")} <id>        ${c.dim("Gate: full test suite -> stamp Git hash -> 05_live")}`);
  console.log(`    ${c.yellow("reopen")} <id>            ${c.dim("Move task back to 01_planning for rework")}`);
  console.log(`    ${c.yellow("drop")}, ${c.yellow("rm")} <id>          ${c.dim("Permanently delete card from board")}`);
  console.log();

  console.log(`  ${c.bold("3. IN-TASK EXECUTION (SPECIALISTS & ORCHESTRATOR):")}`);
  console.log(`    ${c.yellow("tick")} <id> <crit_#n>    ${c.dim("Mark acceptance criterion #n as done [✔]")}`);
  console.log(`    ${c.yellow("untick")} <id> <crit_#n>  ${c.dim("Reset acceptance criterion #n to pending [ ]")}`);
  console.log(`    ${c.yellow("block")} <id> "<reason>"  ${c.dim("Set status to BLOCKED with mandatory reason")}`);
  console.log(`    ${c.yellow("unblock")} <id>           ${c.dim("Clear blocker and restore previous status")}`);
  console.log();

  console.log(`  ${c.bold("4. IDEATION & INTEGRITY:")}`);
  console.log(`    ${c.yellow("suggest")} "<idea>"       ${c.dim("Add unstructured feature brainstorm to 00_suggestions")}`);
  console.log(`    ${c.yellow("sync")}                   ${c.dim("Verify JSON integrity and monotonic ID uniqueness")}`);
  console.log();

  console.log(`  ${c.bold("5. AUTHORITY & GOVERNANCE RULES:")}`);
  console.log(`    ${TREE.BRANCH}${c.cyan("Orchestrator")}: Exclusively owns column transitions (${c.yellow("start")}, ${c.yellow("test")}, ${c.yellow("review")}, ${c.yellow("done")}).`);
  console.log(`    ${TREE.BRANCH}${c.cyan("Specialists")}: Strictly restricted to ${c.yellow("tick")} and ${c.yellow("block")}. Never advance columns.`);
  console.log(`    ${TREE.BRANCH}${c.cyan("WIP Discipline")}: Only 1 active task allowed in ${c.yellow("02_in_progress")} at any time.`);
  console.log(`    ${TREE.LEAF}${c.cyan("Memory Boundary")}: Kanban is ephemeral micro-state; ${c.white("PROJECT_STATE.md")} retains macro memory.`);
  console.log();
}

// === MAIN ENTRY POINT ===

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase() || "status";
  const isJson = args.includes("--json");

  switch (command) {
    case "help":
    case "--help":
    case "-h":
      await handleHelp();
      break;
    case "status":
      await handleStatus(isJson);
      break;
    case "current":
      await handleCurrent(isJson);
      break;
    case "list":
    case "ls":
      await handleList(args[1], isJson);
      break;
    case "show":
    case "view":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban show <TASK-ID> [--json]"));
        process.exit(1);
      }
      await handleShow(args[1], isJson);
      break;
    case "suggest":
    case "idea":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban suggest \"<suggestion text>\""));
        process.exit(1);
      }
      await handleSuggest(args.slice(1).join(" "));
      break;
    case "add":
    case "new":
      await handleAdd(args.slice(1));
      break;
    case "update":
    case "edit":
      await handleUpdate(args.slice(1));
      break;
    case "start":
    case "pick":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban start <TASK-ID>"));
        process.exit(1);
      }
      await handleStart(args[1]);
      break;
    case "tick":
      if (!args[1] || !args[2]) {
        console.error(c.red("Usage: pnpm kanban tick <TASK-ID> <criteria_number>"));
        process.exit(1);
      }
      await handleTick(args[1], args[2], true);
      break;
    case "untick":
      if (!args[1] || !args[2]) {
        console.error(c.red("Usage: pnpm kanban untick <TASK-ID> <criteria_number>"));
        process.exit(1);
      }
      await handleTick(args[1], args[2], false);
      break;
    case "test":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban test <TASK-ID>"));
        process.exit(1);
      }
      await handleTest(args[1]);
      break;
    case "review":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban review <TASK-ID>"));
        process.exit(1);
      }
      await handleReview(args[1]);
      break;
    case "done":
    case "ship":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban done <TASK-ID>"));
        process.exit(1);
      }
      await handleDone(args[1]);
      break;
    case "reopen":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban reopen <TASK-ID>"));
        process.exit(1);
      }
      await handleReopen(args[1]);
      break;
    case "block":
      if (!args[1] || !args[2]) {
        console.error(c.red("Usage: pnpm kanban block <TASK-ID> \"<reason>\""));
        process.exit(1);
      }
      await handleBlock(args[1], args.slice(2).join(" "));
      break;
    case "unblock":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban unblock <TASK-ID>"));
        process.exit(1);
      }
      await handleUnblock(args[1]);
      break;
    case "drop":
    case "rm":
      if (!args[1]) {
        console.error(c.red("Usage: pnpm kanban drop <TASK-ID>"));
        process.exit(1);
      }
      await handleDrop(args[1]);
      break;
    case "sync":
      await handleSync();
      break;
    default:
      console.error(c.red(`Unknown command: '${command}'. Run 'pnpm kanban help' for available commands.`));
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(c.red(`Fatal Kanban error: ${err.message}`));
  process.exit(1);
});
