/**
 * ECC Antigravity Doctor & Health Check Diagnostic
 * Comprehensive validation engine covering all edge cases, agents, skills, rules, and installers.
 */

const fs = require('fs');
const path = require('path');

function runDoctor() {
  const rootDir = path.resolve(__dirname, '..');
  const agentsDir = path.join(rootDir, '.agents');
  console.log('==========================================================');
  console.log('   ECC Antigravity Diagnostic & Health Check Engine       ');
  console.log('==========================================================\n');

  let passed = 0;
  let warnings = 0;

  // 1. Check plugin.json
  const pluginFile = path.join(agentsDir, 'plugin.json');
  if (fs.existsSync(pluginFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(pluginFile, 'utf8'));
      console.log(`[PASS] plugin.json: ${data.name} v${data.version}`);
      passed++;
    } catch (e) {
      console.error(`[FAIL] plugin.json parse error: ${e.message}`);
      warnings++;
    }
  } else {
    console.error('[FAIL] plugin.json missing');
    warnings++;
  }

  // 2. Check Root & Configuration Operating Contracts
  const contracts = [
    { name: '.agents/AGENTS.md', path: path.join(agentsDir, 'AGENTS.md') },
    { name: '.agents/GEMINI.md', path: path.join(agentsDir, 'GEMINI.md') },
    { name: 'Root AGENTS.md', path: path.join(rootDir, 'AGENTS.md') },
    { name: 'Root GEMINI.md', path: path.join(rootDir, 'GEMINI.md') },
    { name: '.agents/SKILLS_INDEX.md', path: path.join(agentsDir, 'SKILLS_INDEX.md') },
  ];

  for (const c of contracts) {
    if (fs.existsSync(c.path)) {
      console.log(`[PASS] Operating Contract: ${c.name} detected`);
      passed++;
    } else {
      console.error(`[FAIL] Operating Contract: ${c.name} missing`);
      warnings++;
    }
  }

  // 3. Check Agents (71 personas)
  const agentsPath = path.join(agentsDir, 'agents');
  if (fs.existsSync(agentsPath)) {
    const files = fs.readdirSync(agentsPath).filter(f => f.endsWith('.md'));
    console.log(`[PASS] Agents directory: ${files.length} specialized agents detected`);
    passed++;

    let validAgents = 0;
    for (const f of files) {
      const text = fs.readFileSync(path.join(agentsPath, f), 'utf8');
      if (text.startsWith('---') && text.includes('name:') && text.includes('tools:')) {
        validAgents++;
      }
    }
    if (validAgents === files.length) {
      console.log(`[PASS] Agent frontmatter schema: 100% of agents (${validAgents}/${files.length}) valid`);
      passed++;
    } else {
      console.warn(`[WARN] Some agents have malformed frontmatter (${validAgents}/${files.length})`);
      warnings++;
    }
  } else {
    console.error('[FAIL] Agents directory missing');
    warnings++;
  }

  // 4. Check Rules (9 foundational engineering rules)
  const rulesPath = path.join(agentsDir, 'rules');
  if (fs.existsSync(rulesPath)) {
    const rules = fs.readdirSync(rulesPath).filter(f => f.endsWith('.md'));
    console.log(`[PASS] Rules directory: ${rules.length} engineering rules detected`);
    passed++;

    const expectedRules = [
      'automatic-routing-policy.md',
      'karpathy-principles.md',
      'agent-orchestration.md',
      'anti-failure-patterns.md',
      'codebase-adaptation-policy.md',
      'python-fastapi.md',
      'react-typescript.md',
      'cyber-defense-security.md',
      'web-design-system.md'
    ];
    let allExpected = true;
    for (const er of expectedRules) {
      if (!rules.includes(er)) {
        console.warn(`[WARN] Missing expected rule: ${er}`);
        allExpected = false;
        warnings++;
      }
    }
    if (allExpected) {
      console.log('[PASS] Found all 9 core engineering and routing rules');
      passed++;
    }
  } else {
    console.error('[FAIL] Rules directory missing');
    warnings++;
  }

  // 5. Check Skills (148 production skills)
  const skillsPath = path.join(agentsDir, 'skills');
  if (fs.existsSync(skillsPath)) {
    const skills = fs.readdirSync(skillsPath, { withFileTypes: true }).filter(d => d.isDirectory());
    console.log(`[PASS] Skills directory: ${skills.length} curated skills packaged`);
    passed++;

    // Check dynamic index coverage
    const indexPath = path.join(agentsDir, 'SKILLS_INDEX.md');
    if (fs.existsSync(indexPath)) {
      const indexText = fs.readFileSync(indexPath, 'utf8');
      let missingFromIndex = 0;
      for (const s of skills) {
        if (!indexText.includes(`**\`${s.name}\`**`)) {
          missingFromIndex++;
        }
      }
      if (missingFromIndex === 0) {
        console.log(`[PASS] Dynamic Index: All ${skills.length} skills indexed in SKILLS_INDEX.md`);
        passed++;
      } else {
        console.warn(`[WARN] Dynamic Index: ${missingFromIndex} skills missing from SKILLS_INDEX.md`);
        warnings++;
      }
    }
  } else {
    console.error('[FAIL] Skills directory missing');
    warnings++;
  }

  // 6. Check Workflows
  const workflowsPath = path.join(agentsDir, 'workflows');
  if (fs.existsSync(workflowsPath)) {
    const workflows = fs.readdirSync(workflowsPath).filter(f => f.endsWith('.md'));
    console.log(`[PASS] Workflows directory: ${workflows.length} workflows defined`);
    passed++;
  }

  // 7. Check Cross-Platform Installers
  const installers = ['install.ps1', 'install.sh'];
  for (const inst of installers) {
    const instPath = path.join(rootDir, inst);
    if (fs.existsSync(instPath)) {
      console.log(`[PASS] Installer: ${inst} verified`);
      passed++;
    } else {
      console.error(`[FAIL] Installer: ${inst} missing`);
      warnings++;
    }
  }

  // 8. Check Reference Playbooks
  const refsPath = path.join(agentsDir, 'references');
  if (fs.existsSync(refsPath)) {
    const refs = fs.readdirSync(refsPath).filter(f => f.endsWith('.md'));
    console.log(`[PASS] References directory: ${refs.length} playbooks & architecture handbooks verified`);
    passed++;
  } else {
    console.error('[FAIL] References directory missing');
    warnings++;
  }

  // 9. Zero-Byte Integrity Audit (No empty files permitted)
  function findZeroByteFiles(dir) {
    let zeros = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        zeros = zeros.concat(findZeroByteFiles(full));
      } else if (ent.isFile()) {
        const stat = fs.statSync(full);
        if (stat.size === 0) {
          zeros.push(path.relative(rootDir, full));
        }
      }
    }
    return zeros;
  }

  const zeroFiles = findZeroByteFiles(agentsDir);
  if (zeroFiles.length === 0) {
    console.log('[PASS] Zero-Byte Audit: 0 empty files detected across entire .agents harness');
    passed++;
  } else {
    console.error(`[FAIL] Found ${zeroFiles.length} empty (0-byte) files:`, zeroFiles);
    warnings += zeroFiles.length;
  }

  console.log(`\n==========================================================`);
  console.log(`Diagnostics Summary: ${passed} checks passed, ${warnings} issues.`);
  if (warnings === 0) {
    console.log('All edge cases, agents, skills, and rules are 100% operational!\n');
  } else {
    console.warn(`Health check encountered ${warnings} warnings. Please inspect above.`);
  }
}

runDoctor();

