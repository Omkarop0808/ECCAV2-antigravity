/**
 * Generates .agents/SKILLS_INDEX.md indexing all 148 skills
 * Enables Antigravity agents to dynamically discover and view any skill
 * even when truncated from the system prompt by context budget limits.
 */

const fs = require('fs');
const path = require('path');

function generateIndex() {
  const rootDir = path.resolve(__dirname, '..');
  const skillsDir = path.join(rootDir, '.agents', 'skills');
  const outputFile = path.join(rootDir, '.agents', 'SKILLS_INDEX.md');

  console.log('=== Generating Dynamic Skills Index ===');

  if (!fs.existsSync(skillsDir)) {
    console.error('Skills directory not found: ' + skillsDir);
    return;
  }

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  const skillsData = [];

  for (const name of entries) {
    const skillMdPath = path.join(skillsDir, name, 'SKILL.md');
    let description = 'No description provided';
    if (fs.existsSync(skillMdPath)) {
      const content = fs.readFileSync(skillMdPath, 'utf8');
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (match) {
        const descMatch = match[1].match(/description:\s*([^\r\n]+(?:\r?\n\s+[^\r\n]+)*)/i);
        if (descMatch) {
          description = descMatch[1].replace(/\r?\n\s+/g, ' ').trim();
        }
      }
    }
    skillsData.push({ name, description, path: `.agents/skills/${name}/SKILL.md` });
  }

  let md = `# Antigravity Dynamic Skills Index\n\n`;
  md += `> **Purpose:** When Antigravity context budget limits truncate the active skills list in your system prompt, inspect this index and use \`view_file\` to load the exact \`SKILL.md\` before executing.\n\n`;
  md += `**Total Packaged Skills:** ${skillsData.length}\n\n`;
  md += `| Skill Name | Path | Trigger / Description |\n`;
  md += `| :--- | :--- | :--- |\n`;

  for (const s of skillsData) {
    // Escape pipes in description
    const safeDesc = s.description.replace(/\|/g, '\\|');
    md += `| **\`${s.name}\`** | [\`${s.path}\`](file:///${s.path}) | ${safeDesc} |\n`;
  }

  fs.writeFileSync(outputFile, md, 'utf8');
  console.log(`✓ Indexed ${skillsData.length} skills into ${outputFile}`);
}

generateIndex();
