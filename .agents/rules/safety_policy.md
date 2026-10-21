# Workspace Safety & Operational Policy

This policy defines non-negotiable terminal, filesystem, and security boundaries for all agents operating in the **Snapshot Portfolio** (`snapshot-portfolio-project`) workspace.

## 1. Prohibited Terminal Commands

The following command patterns are strictly forbidden unless the user explicitly requests them in the immediate prompt:

- **Git Commit, Push, & History Manipulation (Strictly User-Owned)**:
  - `git commit` (under all flags, scripts, and aliases)
  - `git push` (under all flags and aliases)
  - `git merge`, `git rebase`, `git cherry-pick`
  - Version control is exclusively owned and executed by the human user. Agents must verify code and content through `pnpm content validate`, `pnpm typecheck` (`tsc --noEmit`), and `pnpm lint`, leaving all modifications in the working directory for user review and manual commit.
- **Destructive Git Operations**:
  - `git push --force` or `git push -f`
  - `git reset --hard`
  - Deleting remote branches (`git push origin --delete ...`)
- **Production Deployment Without Explicit Instruction**:
  - Running `pnpm deploy:prod` or `vercel --prod` without explicit user instruction.
- **Root or Asset Recursive Deletions**:
  - Running `rm -rf` or PowerShell `Remove-Item -Recurse -Force` on project roots or core directories (`app`, `content`, `lib`, `public`, `supabase`).

## 2. Non-Interactive CLI Execution

- All CLI commands executed by agents must include non-interactive confirmation flags (e.g., `-y`, `--yes`, `--non-interactive`) where supported.
- Never run commands that block indefinitely waiting on user keyboard input in the background.

## 3. Secret & Credential Isolation

- **Environment Files**: Never display, summarize, or log raw secret values from `.env` or `.env.local` (such as `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `SENTRY_AUTH_TOKEN`, or `SUPABASE_PUBLISHABLE_KEY`) into chat responses or markdown artifacts.
- **Hardcoded Secrets**: Never hardcode API keys or secrets into source files. Always use `process.env` references.

## 4. Workspace Boundary Limit

- All operations, file reads, and file writes must remain within the workspace root (`c:\Users\migue\Documents\BSIT_unsaved_projects\portfolio-project`).
- Agents must not create or modify files in user system directories, temp roots outside the workspace, or desktop paths.

## 5. Domain-Scoped Command Access

- Subagents must strictly restrict terminal execution to the commands defined in [command_permissions.md](./command_permissions.md).
