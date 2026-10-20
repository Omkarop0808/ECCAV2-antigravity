# ECC for Google Antigravity - One-Click Installer (PowerShell)
# Usage:
#   .\install.ps1                              (Installs to current workspace .agents/)
#   .\install.ps1 -TargetPath "C:\other\repo"  (Installs to target project .agents/)
#   .\install.ps1 -Global                      (Installs globally to ~/.gemini/config/ for all workspaces)

param (
    [string]$TargetPath,
    [switch]$Global,
    [switch]$Force
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   ECC for Google Antigravity - Project Setup Engine      " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$SourceAgents = Join-Path $PSScriptRoot ".agents"
if (-not (Test-Path $SourceAgents)) {
    Write-Error "Could not find .agents source directory in $PSScriptRoot"
    exit 1
}

if ($Global) {
    # Antigravity Global Customizations Root
    $DestAgents = Join-Path $env:USERPROFILE ".gemini\config"
    Write-Host "[*] Mode: GLOBAL (Applies to ALL projects opened in Antigravity)" -ForegroundColor Magenta
    Write-Host "[*] Destination: $DestAgents" -ForegroundColor Gray
} else {
    if ([string]::IsNullOrWhiteSpace($TargetPath)) {
        $TargetPath = (Get-Location).Path
    }
    $DestAgents = Join-Path $TargetPath ".agents"
    Write-Host "[*] Mode: PROJECT (Local to $TargetPath)" -ForegroundColor Cyan
    Write-Host "[*] Destination: $DestAgents" -ForegroundColor Gray

    if (-not (Test-Path $TargetPath)) {
        Write-Host "[+] Creating target project directory: $TargetPath" -ForegroundColor Green
        New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
    }
}

if (-not (Test-Path $DestAgents)) {
    New-Item -ItemType Directory -Path $DestAgents -Force | Out-Null
}

# Copy Root Configurations (plugin.json, AGENTS.md, GEMINI.md, SKILLS_INDEX.md)
@("plugin.json", "AGENTS.md", "GEMINI.md", "SKILLS_INDEX.md") | ForEach-Object {
    $src = Join-Path $SourceAgents $_
    if (Test-Path $src) {
        Copy-Item $src (Join-Path $DestAgents $_) -Force
    }
}
if (-not $Global) {
    @("AGENTS.md", "GEMINI.md") | ForEach-Object {
        $src = Join-Path $SourceAgents $_
        if (Test-Path $src) {
            Copy-Item $src (Join-Path $TargetPath $_) -Force
        }
    }
}
Write-Host "[+] Installed plugin manifest, AGENTS.md, GEMINI.md, and dynamic SKILLS_INDEX.md" -ForegroundColor Green

# Copy Agents
$AgentsSrc = Join-Path $SourceAgents "agents"
$AgentsDest = Join-Path $DestAgents "agents"
if (Test-Path $AgentsSrc) {
    if (-not (Test-Path $AgentsDest)) { New-Item -ItemType Directory -Path $AgentsDest -Force | Out-Null }
    Copy-Item -Path "$AgentsSrc\*" -Destination $AgentsDest -Recurse -Force
    $agentCount = (Get-ChildItem $AgentsDest -Filter "*.md").Count
    Write-Host "[+] Installed $agentCount specialized Antigravity agents" -ForegroundColor Green
}

# Copy Rules
$RulesSrc = Join-Path $SourceAgents "rules"
$RulesDest = Join-Path $DestAgents "rules"
if (Test-Path $RulesSrc) {
    if (-not (Test-Path $RulesDest)) { New-Item -ItemType Directory -Path $RulesDest -Force | Out-Null }
    Copy-Item -Path "$RulesSrc\*" -Destination $RulesDest -Recurse -Force
    $ruleCount = (Get-ChildItem $RulesDest -Filter "*.md").Count
    Write-Host "[+] Installed $ruleCount engineering and security rules" -ForegroundColor Green
}

# Copy Skills
$SkillsSrc = Join-Path $SourceAgents "skills"
$SkillsDest = Join-Path $DestAgents "skills"
if (Test-Path $SkillsSrc) {
    if (-not (Test-Path $SkillsDest)) { New-Item -ItemType Directory -Path $SkillsDest -Force | Out-Null }
    Copy-Item -Path "$SkillsSrc\*" -Destination $SkillsDest -Recurse -Force
    $skillCount = (Get-ChildItem $SkillsDest -Directory).Count
    Write-Host "[+] Installed $skillCount curated high-value skills" -ForegroundColor Green
}

# Copy Workflows
$WorkflowsSrc = Join-Path $SourceAgents "workflows"
$WorkflowsDest = Join-Path $DestAgents "workflows"
if (Test-Path $WorkflowsSrc) {
    if (-not (Test-Path $WorkflowsDest)) { New-Item -ItemType Directory -Path $WorkflowsDest -Force | Out-Null }
    Copy-Item -Path "$WorkflowsSrc\*" -Destination $WorkflowsDest -Recurse -Force
    $wfCount = (Get-ChildItem $WorkflowsDest -Filter "*.md").Count
    Write-Host "[+] Installed $wfCount agentic workflows" -ForegroundColor Green
}

# Copy References
$RefsSrc = Join-Path $SourceAgents "references"
$RefsDest = Join-Path $DestAgents "references"
if (Test-Path $RefsSrc) {
    if (-not (Test-Path $RefsDest)) { New-Item -ItemType Directory -Path $RefsDest -Force | Out-Null }
    Copy-Item -Path "$RefsSrc\*" -Destination $RefsDest -Recurse -Force
    Write-Host "[+] Installed reference architecture and design playbooks" -ForegroundColor Green
}

Write-Host ""
Write-Host "[SUCCESS] ECC Antigravity is now fully active in: $TargetPath" -ForegroundColor Green
Write-Host "Open the project in Antigravity IDE and start coding with 75 specialized agents and 433 production skills!" -ForegroundColor Cyan
Write-Host ""
