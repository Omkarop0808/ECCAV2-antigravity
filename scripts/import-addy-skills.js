/**
 * Import Addy Osmani's Agent Skills (Google SWE Standards) into ECC-Antigravity
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

function runImport() {
  const rootDir = path.resolve(__dirname, '..');
  const agentsDir = path.join(rootDir, '.agents');
  const skillsTargetDir = path.join(agentsDir, 'skills');
  const agentsTargetDir = path.join(agentsDir, 'agents');
  const refsTargetDir = path.join(agentsDir, 'references');
  const geminiCmdsTargetDir = path.join(rootDir, '.gemini', 'commands');
  const cmdsTargetDir = path.join(rootDir, 'commands');

  ensureDir(skillsTargetDir);
  ensureDir(agentsTargetDir);
  ensureDir(refsTargetDir);
  ensureDir(geminiCmdsTargetDir);
  ensureDir(cmdsTargetDir);

  const addySrc = 'C:/Users/Omkar/.gemini/antigravity-ide/brain/beaa575b-077f-4a17-aca1-746761361955/scratch/addy-agent-skills';

  console.log('=== Importing Addy Osmani Agent Skills into ECC-Antigravity ===\n');

  if (!fs.existsSync(addySrc)) {
    console.error('Addy Osmani source repository not found at: ' + addySrc);
    process.exit(1);
  }

  // 1. Copy References (7 checklists)
  const addyRefsDir = path.join(addySrc, 'references');
  if (fs.existsSync(addyRefsDir)) {
    const refFiles = fs.readdirSync(addyRefsDir).filter(f => f.endsWith('.md'));
    for (const f of refFiles) {
      fs.copyFileSync(path.join(addyRefsDir, f), path.join(refsTargetDir, f));
      console.log(`[REF] Copied reference checklist: ${f}`);
    }
  }

  // 2. Copy & Adapt Agents (4 personas)
  const addyAgentsDir = path.join(addySrc, 'agents');
  if (fs.existsSync(addyAgentsDir)) {
    const agentFiles = fs.readdirSync(addyAgentsDir).filter(f => f.endsWith('.md'));
    for (const f of agentFiles) {
      const srcFile = path.join(addyAgentsDir, f);
      let content = fs.readFileSync(srcFile, 'utf8');
      
      // Adapt target filename if code-reviewer already exists
      let destName = f;
      if (f === 'code-reviewer.md') {
        destName = 'swe-code-reviewer.md';
        content = content.replace(/name:\s*code-reviewer/, 'name: swe-code-reviewer');
      }

      // Ensure doctor.js compliance: must have tools and model in frontmatter
      if (!content.includes('tools:')) {
        content = content.replace(
          /^---\r?\n([\s\S]*?)\r?\n---/,
          `---\n$1\ntools: [view_file, grep_search, run_command]\nmodel: pro\n---`
        );
      }

      fs.writeFileSync(path.join(agentsTargetDir, destName), content, 'utf8');
      console.log(`[AGENT] Adapted & saved persona: ${destName}`);
    }
  }

  // 3. Copy Skills (25 skills)
  const addySkillsDir = path.join(addySrc, 'skills');
  const importedSkills = [];
  if (fs.existsSync(addySkillsDir)) {
    const skillDirs = fs.readdirSync(addySkillsDir, { withFileTypes: true }).filter(d => d.isDirectory());
    for (const s of skillDirs) {
      let destSkillName = s.name;
      // Handle collision with existing superpowers test-driven-development
      if (s.name === 'test-driven-development') {
        destSkillName = 'swe-test-driven-development';
      }

      const destSkillDir = path.join(skillsTargetDir, destSkillName);
      copyDirRecursive(path.join(addySkillsDir, s.name), destSkillDir);

      // If renamed, update the SKILL.md frontmatter name
      const skillMdPath = path.join(destSkillDir, 'SKILL.md');
      if (fs.existsSync(skillMdPath)) {
        let mdContent = fs.readFileSync(skillMdPath, 'utf8');
        if (destSkillName !== s.name) {
          mdContent = mdContent.replace(/name:\s*test-driven-development/, `name: ${destSkillName}`);
          fs.writeFileSync(skillMdPath, mdContent, 'utf8');
        }
        importedSkills.push({
          name: destSkillName,
          path: skillMdPath,
          content: mdContent
        });
      }
      console.log(`[SKILL] Imported skill: ${destSkillName}`);
    }
  }

  // 4. Copy Slash Commands (.gemini/commands/*.toml and commands/*.md)
  const addyGeminiCmds = path.join(addySrc, '.gemini', 'commands');
  if (fs.existsSync(addyGeminiCmds)) {
    const tomls = fs.readdirSync(addyGeminiCmds).filter(f => f.endsWith('.toml'));
    for (const t of tomls) {
      fs.copyFileSync(path.join(addyGeminiCmds, t), path.join(geminiCmdsTargetDir, t));
      console.log(`[COMMAND] Copied Gemini slash command: ${t}`);

      // Also create an MD version in commands/ for standard discovery
      const baseName = t.replace('.toml', '');
      const mdCmdPath = path.join(cmdsTargetDir, `${baseName}.md`);
      if (!fs.existsSync(mdCmdPath)) {
        const tomlContent = fs.readFileSync(path.join(addyGeminiCmds, t), 'utf8');
        const descMatch = tomlContent.match(/description\s*=\s*"([^"]+)"/);
        const desc = descMatch ? descMatch[1] : `Run /${baseName} command`;
        fs.writeFileSync(mdCmdPath, `# /${baseName}\n\n${desc}\n\nImplemented via Gemini/Antigravity command \`.gemini/commands/${t}\`.\n`, 'utf8');
      }
    }
  }

  // 5. Update Dynamic Skills Index (SKILLS_INDEX.md)
  const indexPath = path.join(agentsDir, 'SKILLS_INDEX.md');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Sort all skills currently in .agents/skills
    const allSkillDirs = fs.readdirSync(skillsTargetDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort();

    const tableRows = [];
    tableRows.push('# Antigravity Dynamic Skills Index\n');
    tableRows.push('> **Purpose:** When Antigravity context budget limits truncate the active skills list in your system prompt, inspect this index and use `view_file` to load the exact `SKILL.md` before executing.\n');
    tableRows.push(`**Total Packaged Skills:** ${allSkillDirs.length}\n`);
    tableRows.push('| Skill Name | Path | Trigger / Description |');
    tableRows.push('| :--- | :--- | :--- |');

    for (const sName of allSkillDirs) {
      const sMd = path.join(skillsTargetDir, sName, 'SKILL.md');
      let desc = 'Specialized engineering workflow.';
      if (fs.existsSync(sMd)) {
        const content = fs.readFileSync(sMd, 'utf8');
        const descMatch = content.match(/description:\s*([^\r\n]+)/);
        if (descMatch) {
          desc = descMatch[1].trim().replace(/^["']|["']$/g, '');
        }
      }
      tableRows.push(`| **\`${sName}\`** | [\`.agents/skills/${sName}/SKILL.md\`](file:///.agents/skills/${sName}/SKILL.md) | ${desc} |`);
    }

    fs.writeFileSync(indexPath, tableRows.join('\n') + '\n', 'utf8');
    console.log(`\n[INDEX] Successfully updated SKILLS_INDEX.md with all ${allSkillDirs.length} skills!`);
  }

  console.log('\n=== Import Complete! Running Doctor Diagnostic ===\n');
}

runImport();
