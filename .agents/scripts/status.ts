// status.ts: Agentic system observability and health inspector for Snapshot Portfolio.
// Inspects rules, specialist subagents, skills, persistent state, and evaluation registries.

import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";
import {
  renderBanner,
  renderTree,
  renderSummary,
  type TreeItem,
} from "./ui.ts";

const AGENTS_ROOT = path.resolve(process.cwd(), ".agents");

export function inspectAgenticSystem(): TreeItem[] {
  const items: TreeItem[] = [];

  // 1. Rules & Policies Inspection
  const rulesDir = path.join(AGENTS_ROOT, "rules");
  if (fs.existsSync(rulesDir)) {
    const rulesFiles = fs.readdirSync(rulesDir).filter((f: string) => f.endsWith(".md"));
    for (const file of rulesFiles) {
      const filePath = path.join(rulesDir, file);
      const stat = fs.statSync(filePath);
      const isUnderCap = stat.size <= 24000;
      items.push({
        category: "1. Invariant Rules",
        name: file,
        status: isUnderCap ? "PASS" : "WARN",
        message: `${stat.size} bytes (24KB limit)`,
      });
    }
  } else {
    items.push({
      category: "1. Invariant Rules",
      name: "rules/",
      status: "FAIL",
      message: "Rules directory missing",
    });
  }

  // 2. Specialized Agents Inspection
  const agentsDir = path.join(AGENTS_ROOT, "agents");
  if (fs.existsSync(agentsDir)) {
    const agentRoles = fs
      .readdirSync(agentsDir, { withFileTypes: true })
      .filter((d: fs.Dirent) => d.isDirectory() && !d.name.startsWith("_"))
      .map((d: fs.Dirent) => d.name);

    for (const role of agentRoles) {
      const promptPath = path.join(agentsDir, role, "system_prompt.md");
      const contractPath = path.join(agentsDir, role, "contract.json");
      const hasPrompt = fs.existsSync(promptPath);
      const hasContract = fs.existsSync(contractPath);

      items.push({
        category: "2. Specialized Subagents",
        name: `@${role}`,
        status: hasPrompt && hasContract ? "PASS" : "WARN",
        message: hasPrompt && hasContract ? "Prompt & Contract active" : "Missing prompt or contract",
      });
    }

    const templatePath = path.join(agentsDir, "_template", "system_prompt.template.md");
    items.push({
      category: "2. Specialized Subagents",
      name: "_template",
      status: fs.existsSync(templatePath) ? "PASS" : "WARN",
      message: fs.existsSync(templatePath) ? "Standard template verified" : "Template missing",
    });
  }

  // 3. Skills Registry Inspection
  const skillsDir = path.join(AGENTS_ROOT, "skills");
  if (fs.existsSync(skillsDir)) {
    const skillFolders = fs
      .readdirSync(skillsDir, { withFileTypes: true })
      .filter((d: fs.Dirent) => d.isDirectory())
      .map((d: fs.Dirent) => d.name);

    for (const skill of skillFolders) {
      const skillFile = path.join(skillsDir, skill, "SKILL.md");
      if (fs.existsSync(skillFile)) {
        const content = fs.readFileSync(skillFile, "utf-8");
        const hasFrontmatter =
          content.startsWith("---") &&
          content.includes("name:") &&
          content.includes("description:");
        items.push({
          category: "3. Skills Registry",
          name: skill,
          status: hasFrontmatter ? "PASS" : "WARN",
          message: hasFrontmatter ? "Valid frontmatter" : "Invalid frontmatter",
        });
      } else {
        items.push({
          category: "3. Skills Registry",
          name: skill,
          status: "FAIL",
          message: "Missing SKILL.md",
        });
      }
    }
  }

  // 4. Persistent State Ledger Inspection
  const stateDir = path.join(AGENTS_ROOT, "state");
  const stateMdPath = path.join(stateDir, "PROJECT_STATE.md");
  const indexPath = path.join(stateDir, "index.json");

  const hasStateMd = fs.existsSync(stateMdPath) && fs.statSync(stateMdPath).size > 0;
  items.push({
    category: "4. State & Caching",
    name: "PROJECT_STATE.md",
    status: hasStateMd ? "PASS" : "WARN",
    message: hasStateMd ? "Living blackboard present" : "Pending init",
  });

  items.push({
    category: "4. State & Caching",
    name: "index.json",
    status: fs.existsSync(indexPath) ? "PASS" : "WARN",
    message: fs.existsSync(indexPath) ? "Machine route & content index synced" : "Pending sync",
  });

  // 5. Evaluation & Regressions Log
  const evalDir = path.join(AGENTS_ROOT, "evaluation");
  const regressionsPath = path.join(evalDir, "regressions.json");
  if (fs.existsSync(regressionsPath)) {
    try {
      const regressions = JSON.parse(fs.readFileSync(regressionsPath, "utf-8"));
      items.push({
        category: "5. Evaluation & Regressions",
        name: "regressions.json",
        status: "PASS",
        message: `${regressions.length} invariants monitored`,
      });
    } catch {
      items.push({
        category: "5. Evaluation & Regressions",
        name: "regressions.json",
        status: "FAIL",
        message: "Malformed JSON",
      });
    }
  } else {
    items.push({
      category: "5. Evaluation & Regressions",
      name: "regressions.json",
      status: "WARN",
      message: "Log file missing",
    });
  }

  return items;
}

export function main(): void {
  renderBanner("Snapshot Agentic System Status", "Observability & Health Audit (.agents/)");
  const items = inspectAgenticSystem();
  renderTree("Snapshot Agentic Subsystem", items);

  const passCount = items.filter((i) => i.status === "PASS").length;
  const warnCount = items.filter((i) => i.status === "WARN").length;
  const failCount = items.filter((i) => i.status === "FAIL").length;

  renderSummary({
    passCount,
    warnCount,
    failCount,
    subject: "agent components",
    passAdvice: "All Snapshot agentic configurations, skills, and subagents are ready.",
    warnAdvice: "Operational with pending state/ledger initializations.",
    failAdvice: "Resolve failed agent components above before proceeding.",
  });
}

if (process.argv[1]?.endsWith("status.ts")) {
  main();
}
