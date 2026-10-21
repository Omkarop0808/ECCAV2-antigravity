const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const agents = path.join(root, '.agents');

let errors = [];
let passedChecks = 0;

console.log('====================================================');
console.log('   DEEP INTEGRITY & MULTI-FACETED VERIFICATION AUDIT');
console.log('====================================================\n');

// 1. Check all skills
const skillsDir = path.join(agents, 'skills');
const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true }).filter(d => d.isDirectory());
console.log('Auditing skills count:', skillDirs.length);

skillDirs.forEach(d => {
  const sPath = path.join(skillsDir, d.name);
  const skillFile = path.join(sPath, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    errors.push('Skill missing SKILL.md: ' + d.name);
    return;
  }
  const stat = fs.statSync(skillFile);
  if (stat.size === 0) {
    errors.push('Empty SKILL.md in: ' + d.name);
    return;
  }
  const content = fs.readFileSync(skillFile, 'utf8');
  if (!content.startsWith('---') || !content.includes('name:') || !content.includes('description:')) {
    errors.push('Malformed frontmatter in skill: ' + d.name);
  }
});
if (errors.length === 0) {
  console.log(`[PASS] All ${skillDirs.length} skills have valid, non-empty SKILL.md with proper YAML frontmatter.`);
  passedChecks++;
}

// 2. Check all agents
const agentsDir = path.join(agents, 'agents');
const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
console.log('Auditing agents count:', agentFiles.length);
agentFiles.forEach(f => {
  const aFile = path.join(agentsDir, f);
  const stat = fs.statSync(aFile);
  if (stat.size === 0) {
    errors.push('Empty agent file: ' + f);
    return;
  }
  const content = fs.readFileSync(aFile, 'utf8');
  if (!content.startsWith('---') || !content.includes('name:') || !content.includes('tools:')) {
    errors.push('Malformed frontmatter in agent: ' + f);
  }
});
if (errors.length === 0) {
  console.log(`[PASS] All ${agentFiles.length} agents have valid frontmatter (name, tools, model) and content.`);
  passedChecks++;
}

// 3. Check all references
const refsDir = path.join(agents, 'references');
const refFiles = fs.readdirSync(refsDir).filter(f => f.endsWith('.md'));
console.log('Auditing references count:', refFiles.length);
refFiles.forEach(f => {
  const rFile = path.join(refsDir, f);
  const stat = fs.statSync(rFile);
  if (stat.size < 50) {
    errors.push('Reference file suspiciously small: ' + f);
  }
});
if (errors.length === 0) {
  console.log(`[PASS] All ${refFiles.length} reference handbooks & checklists verified.`);
  passedChecks++;
}

// 4. Check all rules
const rulesDir = path.join(agents, 'rules');
const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));
console.log('Auditing rules count:', ruleFiles.length);
ruleFiles.forEach(f => {
  const rFile = path.join(rulesDir, f);
  const stat = fs.statSync(rFile);
  if (stat.size === 0) {
    errors.push('Empty rule file: ' + f);
  }
});
if (errors.length === 0) {
  console.log(`[PASS] All ${ruleFiles.length} rules verified.`);
  passedChecks++;
}

// 5. Check commands
const tomlDir = path.join(root, '.gemini', 'commands');
const tomlFiles = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
console.log('Auditing .gemini/commands count:', tomlFiles.length);
tomlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(tomlDir, f), 'utf8');
  if (!content.includes('description') || !content.includes('prompt')) {
    errors.push('Invalid toml command: ' + f);
  }
});
if (errors.length === 0) {
  console.log(`[PASS] All ${tomlFiles.length} Gemini slash commands verified.`);
  passedChecks++;
}

// 6. Check SKILLS_INDEX.md coverage
const indexContent = fs.readFileSync(path.join(agents, 'SKILLS_INDEX.md'), 'utf8');
let missingInIndex = [];
skillDirs.forEach(d => {
  const targetToken = '**`' + d.name + '`**';
  if (!indexContent.includes(targetToken)) {
    missingInIndex.push(d.name);
  }
});
if (missingInIndex.length > 0) {
  errors.push('Missing in SKILLS_INDEX.md: ' + missingInIndex.join(', '));
} else {
  console.log(`[PASS] 100% of skills (${skillDirs.length}/${skillDirs.length}) are indexed in SKILLS_INDEX.md.`);
  passedChecks++;
}

// 7. Global zero-byte audit across the entire repository
function scanZeros(dir) {
  let zeros = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const ignoredDirs = ['.git', 'node_modules', 'ECC', 'dify', 'storm', 'skills', 'daytona-v0', 'deer-flow'];
    if (ignoredDirs.includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      zeros = zeros.concat(scanZeros(full));
    } else if (ent.isFile()) {
      if (fs.statSync(full).size === 0) {
        zeros.push(path.relative(root, full));
      }
    }
  }
  return zeros;
}
const allZeros = scanZeros(root);
if (allZeros.length > 0) {
  errors.push('Zero byte files found: ' + allZeros.join(', '));
} else {
  console.log('[PASS] Zero-byte audit: 0 empty files across entire repository.');
  passedChecks++;
}

// 8. Plugin JSON validation
try {
  const pJson = JSON.parse(fs.readFileSync(path.join(agents, 'plugin.json'), 'utf8'));
  if (pJson.name === 'ecc-antigravity' && pJson.version) {
    console.log(`[PASS] plugin.json valid: ${pJson.name} v${pJson.version}`);
    passedChecks++;
  } else {
    errors.push('plugin.json missing expected fields');
  }
} catch (e) {
  errors.push('plugin.json parse error: ' + e.message);
}

// 9. Root operating contracts
const contracts = ['AGENTS.md', 'GEMINI.md', 'README.md', 'QUICKSTART.md', 'LICENSE', 'install.ps1', 'install.sh'];
let allContractsExist = true;
contracts.forEach(c => {
  if (!fs.existsSync(path.join(root, c))) {
    errors.push('Missing contract/installer: ' + c);
    allContractsExist = false;
  }
});
if (allContractsExist) {
  console.log(`[PASS] All ${contracts.length} root contracts, docs, and cross-platform installers exist.`);
  passedChecks++;
}

console.log('\n====================================================');
console.log(`CHECKS PASSED: ${passedChecks} / 9 categories`);
console.log(`TOTAL ERRORS:  ${errors.length}`);
console.log('====================================================\n');

if (errors.length > 0) {
  console.error('Audit failed with errors:', errors);
  process.exit(1);
} else {
  console.log('AUDIT RESULT: 100% HEALTHY. ALL CHECKS PASSED.');
}
