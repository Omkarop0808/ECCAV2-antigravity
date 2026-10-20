/**
 * Import Impeccable, Superpowers, and GSD Core skills into ECC-antigravity
 */

const fs = require('fs');
const path = require('path');

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

function importSuperSkills() {
  const rootDir = path.resolve(__dirname, '..');
  const targetSkillsDir = path.join(rootDir, '.agents', 'skills');
  ensureDir(targetSkillsDir);

  const homeConfig = 'C:\\Users\\Omkar\\.gemini\\config';

  console.log('=== Importing Impeccable, Superpowers & GSD into ECC-antigravity ===');

  // 1. Impeccable
  const impeccableSrc = path.join(homeConfig, 'skills', 'impeccable');
  if (fs.existsSync(impeccableSrc)) {
    copyDirRecursive(impeccableSrc, path.join(targetSkillsDir, 'impeccable'));
    console.log('✓ Successfully imported Impeccable (Design Director Engine)');
  } else {
    console.warn('! Impeccable not found at ' + impeccableSrc);
  }

  // 2. Superpowers
  const superpowersSrc = path.join(homeConfig, 'plugins', 'superpowers', 'skills');
  if (fs.existsSync(superpowersSrc)) {
    const spDirs = fs.readdirSync(superpowersSrc, { withFileTypes: true }).filter(d => d.isDirectory());
    for (const d of spDirs) {
      copyDirRecursive(path.join(superpowersSrc, d.name), path.join(targetSkillsDir, d.name));
    }
    console.log(`✓ Successfully imported ${spDirs.length} Superpowers skills (Brainstorming, TDD, Systematic Debugging, etc.)`);
  } else {
    console.warn('! Superpowers not found at ' + superpowersSrc);
  }

  // 3. GSD Core & Graphify
  const gsdSrcDir = path.join(homeConfig, 'skills');
  if (fs.existsSync(gsdSrcDir)) {
    const gsdDirs = fs.readdirSync(gsdSrcDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && (d.name.startsWith('gsd-') || d.name === 'graphify'));
    for (const d of gsdDirs) {
      copyDirRecursive(path.join(gsdSrcDir, d.name), path.join(targetSkillsDir, d.name));
    }
    console.log(`✓ Successfully imported ${gsdDirs.length} GSD & Graphify skills`);
  }

  console.log('=== Super Skills Import Complete ===');
}

importSuperSkills();
