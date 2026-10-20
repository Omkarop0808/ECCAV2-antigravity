/**
 * ECC to Antigravity Zero-Dependency Adapter & Build Engine
 * 
 * Converts Claude Code ECC agents, rules, and skills into native Antigravity (.agents/) format.
 * - Maps tool declarations: Read -> view_file, Bash -> run_command, etc.
 * - Maps model tiers: sonnet -> pro, haiku -> flash
 * - Retains full persona prompt, defense baselines, and review logic
 * - Packages everything cleanly into .agents/
 */

const fs = require('fs');
const path = require('path');

const TOOL_MAPPING = {
  Read: 'view_file',
  Write: 'write_to_file',
  Edit: 'replace_file_content',
  MultiEdit: 'multi_replace_file_content',
  Grep: 'grep_search',
  Glob: 'grep_search',
  Bash: 'run_command',
  WebSearch: 'search_web',
  WebFetch: 'read_url_content',
};

const MODEL_MAPPING = {
  haiku: 'flash',
  sonnet: 'pro',
  opus: 'pro',
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDirRecursive(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function adaptAgentContent(content, fileName) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return content;
  }

  const rawFrontmatter = match[1];
  const body = match[2];

  const lines = rawFrontmatter.split(/\r?\n/);
  const newFrontmatterLines = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('color:')) {
      continue; // Antigravity does not use color in frontmatter
    }

    if (trimmed.startsWith('tools:')) {
      const rawTools = trimmed.slice('tools:'.length).trim();
      const toolTokens = rawTools.split(',').map(t => t.trim());
      const adaptedTools = toolTokens.map(t => TOOL_MAPPING[t] || t);
      // Ensure unique and filtered
      const uniqueTools = [...new Set(adaptedTools)];
      newFrontmatterLines.push(`tools: [${uniqueTools.join(', ')}]`);
      continue;
    }

    if (trimmed.startsWith('model:')) {
      const rawModel = trimmed.slice('model:'.length).trim();
      const adaptedModel = MODEL_MAPPING[rawModel] || rawModel;
      newFrontmatterLines.push(`model: ${adaptedModel}`);
      continue;
    }

    newFrontmatterLines.push(line);
  }

  return `---\n${newFrontmatterLines.join('\n')}\n---\n${body}`;
}

function build() {
  const rootDir = path.resolve(__dirname, '..');
  const eccSourceDir = path.resolve(rootDir, '..', 'ECC');
  const targetAgentsDir = path.join(rootDir, '.agents');
  const targetAgentsOut = path.join(targetAgentsDir, 'agents');
  const targetRulesOut = path.join(targetAgentsDir, 'rules');
  const targetSkillsOut = path.join(targetAgentsDir, 'skills');
  const targetWorkflowsOut = path.join(targetAgentsDir, 'workflows');

  console.log('=== ECC Antigravity Adapter Build Engine ===');
  console.log(`Source ECC: ${eccSourceDir}`);
  console.log(`Target: ${targetAgentsDir}`);

  ensureDir(targetAgentsOut);
  ensureDir(targetRulesOut);
  ensureDir(targetSkillsOut);
  ensureDir(targetWorkflowsOut);

  // 1. Convert all agents from ECC/agents
  const eccAgentsDir = path.join(eccSourceDir, 'agents');
  if (fs.existsSync(eccAgentsDir)) {
    const agentFiles = fs.readdirSync(eccAgentsDir).filter(f => f.endsWith('.md'));
    let adaptedCount = 0;
    for (const file of agentFiles) {
      const srcFile = path.join(eccAgentsDir, file);
      const content = fs.readFileSync(srcFile, 'utf8');
      const adapted = adaptAgentContent(content, file);
      fs.writeFileSync(path.join(targetAgentsOut, file), adapted, 'utf8');
      adaptedCount++;
    }
    console.log(`✓ Successfully converted ${adaptedCount} agents to Antigravity format`);
  } else {
    console.warn(`! Source agents dir not found at ${eccAgentsDir}`);
  }

  // 2. Copy Selected High-Value Skills
  const curatedSkills = [
    'liquid-glass-design',
    'make-interfaces-feel-better',
    'security-bounty-hunter',
    'canary-watch',
    'network-interface-health',
    'network-config-validation',
    'fastapi-patterns',
    'react-patterns',
    'react-performance',
    'tdd-workflow',
    'verification-loop',
    'homelab-network-setup',
    'homelab-vlan-segmentation',
    'homelab-wireguard-vpn',
    'agent-security-hardening',
    'silent-failure-hunter'
  ];

  let skillsCopied = 0;
  for (const skillName of curatedSkills) {
    const srcSkill = path.join(eccSourceDir, 'skills', skillName);
    if (fs.existsSync(srcSkill)) {
      copyDirRecursive(srcSkill, path.join(targetSkillsOut, skillName));
      skillsCopied++;
    }
  }
  console.log(`✓ Successfully packaged ${skillsCopied} curated high-value skills`);

  // 3. Create Antigravity Plugin Manifest
  const manifest = {
    name: 'ecc-antigravity',
    version: '2.2.3',
    description: 'ECC Antigravity Adapter & Engineering System - 71 specialized agents, enterprise rules, curated skills, and workflows tailored for Google Antigravity IDE and agents',
    author: 'Community / Antigravity Bridge',
    license: 'MIT',
    homepage: 'https://github.com/affaan-m/ECC',
    customizations: {
      agents: './agents',
      rules: './rules',
      skills: './skills',
      workflows: './workflows'
    }
  };
  fs.writeFileSync(path.join(targetAgentsDir, 'plugin.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log('✓ Created plugin.json manifest');

  console.log('=== Build Complete ===');
}

build();
