# safety-guard.ps1: PreToolUse lifecycle hook script for Snapshot Portfolio.
# Intercepts run_command executions and blocks destructive terminal operations.

[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$inputPayload = [Console]::In.ReadToEnd()

if ([string]::IsNullOrWhiteSpace($inputPayload)) {
    Write-Output '{"decision":"allow"}'
    exit 0
}

try {
    $data = $inputPayload | ConvertFrom-Json
    $command = $data.toolCall.args.CommandLine

    if ([string]::IsNullOrWhiteSpace($command)) {
        Write-Output '{"decision":"allow"}'
        exit 0
    }

    # Prohibited patterns
    $prohibitedPatterns = @(
        'git\s+push.*--force',
        'git\s+push.*-f\b',
        'git\s+reset\s+--hard',
        'git\s+push.*--delete',
        'rm\s+-rf\s+[\\/]',
        'rmdir\s+/s\s+/q',
        'Remove-Item.*-Recurse.*-Force.*(app|content|lib|public|supabase)'
    )

    foreach ($pattern in $prohibitedPatterns) {
        if ($command -match $pattern) {
            $response = @{
                decision = "deny"
                reason = "Blocked by Snapshot Safety Policy: Destructive command pattern matched ($pattern)."
            } | ConvertTo-Json -Compress
            Write-Output $response
            exit 0
        }
    }

    Write-Output '{"decision":"allow"}'
} catch {
    # If JSON parsing fails, allow by default with notice
    Write-Output '{"decision":"allow"}'
}
