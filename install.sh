#!/usr/bin/env bash
# ECC for Google Antigravity - One-Click Installer (Bash / Unix / WSL)
# Usage:
#   ./install.sh [/path/to/target/project]   (Installs to project .agents/)
#   ./install.sh --global                    (Installs globally to ~/.gemini/config/ for all workspaces)

set -e

ARG="${1:-$(pwd)}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_AGENTS="$SCRIPT_DIR/.agents"

echo "=========================================================="
echo "   ECC for Google Antigravity - Project Setup Engine      "
echo "=========================================================="

if [ ! -d "$SOURCE_AGENTS" ]; then
  echo "Error: Could not find .agents source directory in $SCRIPT_DIR"
  exit 1
fi

if [ "$ARG" = "--global" ] || [ "$ARG" = "-g" ]; then
  DEST_AGENTS="$HOME/.gemini/config"
  IS_GLOBAL=1
  echo "[*] Mode: GLOBAL (Applies to ALL projects opened in Antigravity)"
  echo "[*] Destination: $DEST_AGENTS"
else
  TARGET_DIR="$ARG"
  DEST_AGENTS="$TARGET_DIR/.agents"
  IS_GLOBAL=0
  echo "[*] Mode: PROJECT (Local to $TARGET_DIR)"
  echo "[*] Destination: $DEST_AGENTS"
  mkdir -p "$TARGET_DIR"
fi

mkdir -p "$DEST_AGENTS"

# Copy Root Configurations (plugin.json, AGENTS.md, GEMINI.md, SKILLS_INDEX.md)
for file in plugin.json AGENTS.md GEMINI.md SKILLS_INDEX.md; do
  if [ -f "$SOURCE_AGENTS/$file" ]; then
    cp -f "$SOURCE_AGENTS/$file" "$DEST_AGENTS/$file"
  fi
done

if [ "$IS_GLOBAL" -eq 0 ]; then
  for file in AGENTS.md GEMINI.md; do
    if [ -f "$SOURCE_AGENTS/$file" ]; then
      cp -f "$SOURCE_AGENTS/$file" "$TARGET_DIR/$file"
    fi
  done
fi
echo "[✓] Installed plugin manifest, AGENTS.md, GEMINI.md, and dynamic SKILLS_INDEX.md"

# Copy Agents
if [ -d "$SOURCE_AGENTS/agents" ]; then
  mkdir -p "$DEST_AGENTS/agents"
  cp -rf "$SOURCE_AGENTS/agents/"* "$DEST_AGENTS/agents/"
  AGENT_COUNT=$(ls -1 "$DEST_AGENTS/agents"/*.md 2>/dev/null | wc -l)
  echo "[✓] Installed $AGENT_COUNT specialized Antigravity agents"
fi

# Copy Rules
if [ -d "$SOURCE_AGENTS/rules" ]; then
  mkdir -p "$DEST_AGENTS/rules"
  cp -rf "$SOURCE_AGENTS/rules/"* "$DEST_AGENTS/rules/"
  RULE_COUNT=$(ls -1 "$DEST_AGENTS/rules"/*.md 2>/dev/null | wc -l)
  echo "[✓] Installed $RULE_COUNT engineering & security rules"
fi

# Copy Skills
if [ -d "$SOURCE_AGENTS/skills" ]; then
  mkdir -p "$DEST_AGENTS/skills"
  cp -rf "$SOURCE_AGENTS/skills/"* "$DEST_AGENTS/skills/"
  SKILL_COUNT=$(find "$DEST_AGENTS/skills" -mindepth 1 -maxdepth 1 -type d | wc -l)
  echo "[✓] Installed $SKILL_COUNT curated high-value skills"
fi

# Copy Workflows
if [ -d "$SOURCE_AGENTS/workflows" ]; then
  mkdir -p "$DEST_AGENTS/workflows"
  cp -rf "$SOURCE_AGENTS/workflows/"* "$DEST_AGENTS/workflows/"
  WF_COUNT=$(ls -1 "$DEST_AGENTS/workflows"/*.md 2>/dev/null | wc -l)
  echo "[✓] Installed $WF_COUNT agentic workflows"
fi

# Copy References
if [ -d "$SOURCE_AGENTS/references" ]; then
  mkdir -p "$DEST_AGENTS/references"
  cp -rf "$SOURCE_AGENTS/references/"* "$DEST_AGENTS/references/"
  echo "[✓] Installed reference architecture and design playbooks"
fi

echo ""
echo "[SUCCESS] ECC Antigravity is now fully active in: $TARGET_DIR"
echo "Open the project in Antigravity IDE and start coding with 71 specialized agents!"
