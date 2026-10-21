# Sample Implementation Brief

```json
{
  "task_id": "TASK-001",
  "objective": "Add optional githubUrl and liveUrl links to ProjectSchema, content/projects.json, pnpm content CLI, and V2 Built Projects showcase",
  "target_files": [
    {
      "path": "lib/content/schemas.ts",
      "owner": "@content-agent",
      "action": "MODIFY",
      "description": "Add optional githubUrl and liveUrl string fields to ProjectSchema"
    },
    {
      "path": ".agents/scripts/content.ts",
      "owner": "@content-agent",
      "action": "MODIFY",
      "description": "Support --github and --live flags in pnpm content add/update projects"
    },
    {
      "path": "app/v2/landing/page.tsx",
      "owner": "@app-agent",
      "action": "MODIFY",
      "description": "Render sleek rose-600 accented external action links on the Built Projects main preview card"
    }
  ],
  "invariants_check": {
    "async_apis": "N/A",
    "server_boundary": "Enforced: universal JSON array imports in lib/content/index.ts",
    "type_validation": "Zod 4 ProjectSchema validates optional URL fields via pnpm content validate",
    "design_system": "Uses bg-neutral-950, text-slate-300, and hover:text-rose-500 tokens"
  },
  "verification_commands": [
    "pnpm content validate",
    "pnpm typecheck",
    "pnpm lint"
  ]
}
```
