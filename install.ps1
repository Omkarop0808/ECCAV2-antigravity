# ECC for Google Antigravity - One-Click Installer (PowerShell)
# Usage:
#   .\install.ps1                              (Installs to current directory)
#   .\install.ps1 -TargetPath "C:\other\repo"  (Installs to target project)

param (
    [string]$TargetPath = (Get-Location).Path,
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

$DestAgents = Join-Path $TargetPath ".agents"
Write-Host "[*] Source: $SourceAgents" -ForegroundColor Gray
Write-Host "[*] Destination: $DestAgents" -ForegroundColor Gray

if (-not (Test-Path $TargetPath)) {
    Write-Host "[+] Creating target project directory: $TargetPath" -ForegroundColor Green
    New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
}

if (-not (Test-Path $DestAgents)) {
    New-Item -ItemType Directory -Path $DestAgents -Force | Out-Null
}

# Copy plugin.json
Copy-Item (Join-Path $SourceAgents "plugin.json") (Join-Path $DestAgents "plugin.json") -Force
Write-Host "[+] Installed plugin.json manifest" -ForegroundColor Green

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

Write-Host ""
Write-Host "[SUCCESS] ECC Antigravity is now fully active in: $TargetPath" -ForegroundColor Green
Write-Host "Open the project in Antigravity IDE and start coding with 71 specialized agents!" -ForegroundColor Cyan
Write-Host ""
