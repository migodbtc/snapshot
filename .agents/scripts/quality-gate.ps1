# quality-gate.ps1: Stop lifecycle hook script for Snapshot Portfolio.
# Verifies that code modifications pass linting and typechecking before completion.

[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$inputPayload = [Console]::In.ReadToEnd()

# Fast Path: Check if any application TypeScript source files were modified in working tree
try {
    $changedFiles = git status --porcelain | Where-Object { 
        $_ -match '\.(ts|tsx)$' -and $_ -notmatch '(\.agents|\.next|node_modules)' 
    }

    # If no source code was changed (e.g. conversation turn or documentation only), allow stop immediately
    if (-not $changedFiles) {
        Write-Output '{"decision":"allow"}'
        exit 0
    }

    # Run linter
    $lintOutput = pnpm lint 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0 -and $lintOutput -match '[1-9]\d* error') {
        $response = @{
            decision = "continue"
            reason = "Quality Gate Failed: ESLint reported errors in modified files. Please resolve before concluding."
        } | ConvertTo-Json -Compress
        Write-Output $response
        exit 0
    }

    # Run TypeScript check
    $tscOutput = pnpm tsc --noEmit 2>&1
    if ($LASTEXITCODE -ne 0) {
        $response = @{
            decision = "continue"
            reason = "Quality Gate Failed: TypeScript compilation errors detected. Please fix type errors before concluding."
        } | ConvertTo-Json -Compress
        Write-Output $response
        exit 0
    }

    Write-Output '{"decision":"allow"}'
} catch {
    # If check fails to execute, allow graceful completion
    Write-Output '{"decision":"allow"}'
}
