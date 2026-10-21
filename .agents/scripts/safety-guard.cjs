/* eslint-disable @typescript-eslint/no-require-imports */
// safety-guard.cjs: High-performance, zero-latency PreToolUse safety hook for Snapshot Portfolio.
// Intercepts run_command executions and blocks destructive terminal operations in <50ms.

const fs = require("node:fs");

let input = "";
try {
  input = fs.readFileSync(0, "utf-8");
} catch {
  // If reading stdin fails, allow gracefully
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

if (!input || !input.trim()) {
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

try {
  const data = JSON.parse(input);
  const command = data?.toolCall?.args?.CommandLine || "";

  if (!command || !command.trim()) {
    console.log(JSON.stringify({ decision: "allow" }));
    process.exit(0);
  }

  const prohibitedPatterns = [
    /git\s+push.*--force/,
    /git\s+push.*-f\b/,
    /git\s+reset\s+--hard/,
    /git\s+push.*--delete/,
    /rm\s+-rf\s+[\\/]/,
    /rmdir\s+\/s\s+\/q/,
    /Remove-Item.*-Recurse.*-Force.*(app|content|lib|public|supabase)/,
  ];

  for (const pattern of prohibitedPatterns) {
    if (pattern.test(command)) {
      console.log(
        JSON.stringify({
          decision: "deny",
          reason: `Blocked by Snapshot Safety Policy: Destructive command pattern matched (${pattern}).`,
        })
      );
      process.exit(0);
    }
  }

  console.log(JSON.stringify({ decision: "allow" }));
} catch {
  console.log(JSON.stringify({ decision: "allow" }));
}
