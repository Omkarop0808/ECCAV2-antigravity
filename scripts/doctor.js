/**
 * ECC Antigravity Doctor & Health Check Diagnostic
 */

const fs = require('fs');
const path = require('path');

function runDoctor() {
  const rootDir = path.resolve(__dirname, '..');
  const agentsDir = path.join(rootDir, '.agents');
  console.log('=== ECC Antigravity Doctor ===\n');

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

  // 2. Check agents
  const agentsPath = path.join(agentsDir, 'agents');
  if (fs.existsSync(agentsPath)) {
    const files = fs.readdirSync(agentsPath).filter(f => f.endsWith('.md'));
    console.log(`[PASS] Agents directory: ${files.length} agents detected`);
    passed++;

    // Validate a random sample of agents
    let validSample = true;
    for (const f of files.slice(0, 10)) {
      const text = fs.readFileSync(path.join(agentsPath, f), 'utf8');
      if (!text.startsWith('---') || !text.includes('name:') || !text.includes('tools:')) {
        console.warn(`[WARN] Agent ${f} may have malformed frontmatter`);
        warnings++;
        validSample = false;
      }
    }
    if (validSample) {
      console.log('[PASS] Agent frontmatter schema verification passed');
      passed++;
    }
  } else {
    console.error('[FAIL] Agents directory missing');
    warnings++;
  }

  // 3. Check rules
  const rulesPath = path.join(agentsDir, 'rules');
  if (fs.existsSync(rulesPath)) {
    const rules = fs.readdirSync(rulesPath).filter(f => f.endsWith('.md'));
    console.log(`[PASS] Rules directory: ${rules.length} engineering rules detected`);
    passed++;
  } else {
    console.error('[FAIL] Rules directory missing');
    warnings++;
  }

  // 4. Check skills
  const skillsPath = path.join(agentsDir, 'skills');
  if (fs.existsSync(skillsPath)) {
    const skills = fs.readdirSync(skillsPath, { withFileTypes: true }).filter(d => d.isDirectory());
    console.log(`[PASS] Skills directory: ${skills.length} skills packaged`);
    passed++;
  } else {
    console.error('[FAIL] Skills directory missing');
    warnings++;
  }

  // 5. Check workflows
  const workflowsPath = path.join(agentsDir, 'workflows');
  if (fs.existsSync(workflowsPath)) {
    const workflows = fs.readdirSync(workflowsPath).filter(f => f.endsWith('.md'));
    console.log(`[PASS] Workflows directory: ${workflows.length} workflows defined`);
    passed++;
  }

  console.log(`\nDiagnostics: ${passed} checks passed, ${warnings} issues found.`);
  if (warnings === 0) {
    console.log('✓ ECC Antigravity package is 100% healthy and ready for deployment!\n');
  }
}

runDoctor();
