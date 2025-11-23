---
description: Convert an MCP-generated skill into a Claude Code plugin with agent and documentation
---

# skill2plugin Command

This command converts any MCP-generated skill from `.claude/skills/` into a complete Claude Code plugin ready for the marketplace.

## Prerequisites

This command requires:
- At least one skill in `.claude/skills/` (generated via `/m2s:generate`)
- The skill should have SKILL.md and scripts/ directory

## Command Workflow

When this command is executed, follow these steps in order:

### Step 1: Scan for Available Skills

Use Bash to list all skills:
```bash
ls -1 .claude/skills/
```

Present the available skills to the user as a numbered list:
```
Available skills in .claude/skills/:

1. mcp-chrome-devtools
2. mcp-figma-desktop
3. mcp-database-tools
...

Which skill would you like to convert into a plugin?
```

### Step 2: Gather Plugin Information

Use AskUserQuestion to gather the following information:

**Questions to ask:**

1. **Skill Selection:** Which skill number from the list?
2. **Plugin Description:** Brief description of what this plugin does (1-2 sentences)
3. **MCP Server Name:** Name of the MCP server (e.g., "chrome-devtools", "figma-desktop")
4. **MCP Package Version:** Full package name with specific version (e.g., "chrome-devtools-mcp@1.0.0")
5. **Plugin Version:** Version to start with (default: "0.5.0")

**Store responses:**
- `SKILL_NAME`: Selected skill folder name (e.g., "mcp-chrome-devtools")
- `PLUGIN_DESC`: User-provided description
- `MCP_SERVER`: MCP server name
- `MCP_PACKAGE`: Full package with version
- `PLUGIN_VERSION`: Plugin version number

### Step 3: Extract Skill Metadata

Read the selected skill's SKILL.md to extract information:

```bash
cat .claude/skills/${SKILL_NAME}/SKILL.md | head -20
```

Extract from YAML frontmatter:
- `name:` field
- `description:` field

Store these for use in plugin generation.

### Step 4: Validate Skill Structure

Verify the skill has required components:

```bash
# Check SKILL.md exists
test -f .claude/skills/${SKILL_NAME}/SKILL.md && echo "✓ SKILL.md found" || echo "✗ SKILL.md missing"

# Check scripts directory exists
test -d .claude/skills/${SKILL_NAME}/scripts && echo "✓ scripts/ found" || echo "✗ scripts/ missing"
```

If any required components are missing, stop and inform the user.

### Step 5: Determine Plugin Name

Calculate plugin name from skill name:
- If skill name is `mcp-{server-name}`, plugin name is `{server-name}-plugin`
- Example: `mcp-chrome-devtools` → `chrome-devtools-plugin`

Store as `PLUGIN_NAME`.

### Step 6: Check for Existing Plugin

Verify no plugin with the same name exists:

```bash
test -d ${PLUGIN_NAME} && echo "✗ Plugin already exists!" || echo "✓ Plugin name available"
```

If plugin exists, ask user if they want to overwrite or choose different name.

### Step 7: Create Plugin Directory Structure

Create the plugin directories:

```bash
mkdir -p ${PLUGIN_NAME}/.claude-plugin
mkdir -p ${PLUGIN_NAME}/agents
mkdir -p ${PLUGIN_NAME}/skills
```

### Step 8: Generate plugin.json

Create `.claude-plugin/plugin.json` with this structure:

```json
{
  "name": "${PLUGIN_NAME}",
  "description": "${PLUGIN_DESC}",
  "version": "${PLUGIN_VERSION}",
  "author": {
    "name": "ulasbilgen"
  },
  "mcp": {
    "server": "${MCP_SERVER}",
    "package": "${MCP_PACKAGE}",
    "requires": "mcp2rest"
  }
}
```

Use the Write tool to create this file.

### Step 9: Generate Agent Definition

Create `agents/{agent-name}.md` where agent-name is the server name (without "mcp-" prefix).

**Agent file structure:**

```markdown
---
name: {server-name}
description: {Generated description based on skill domain}. Use when users need {use cases}. Expert at using {skill-name} tools.
skills: {skill-name}
model: sonnet
tools: Bash, Read, Write, Edit, Grep, Glob
---

# {Display Name} Agent

You are a specialist in {domain} automation using the {skill-name} skill.

## When to Use This Agent

{Extract use cases from SKILL.md description or quick start}

## Available Capabilities

{Summarize tool groups from SKILL.md}

## How to Use This Skill

### Prerequisites Check
Always verify:
1. mcp2rest is running on http://localhost:28888
2. {mcp-server-name} server is loaded in mcp2rest
3. Dependencies are installed in scripts/ directory

### Standard Workflow

{Extract quick start workflow from SKILL.md}

### Best Practices

{Extract from SKILL.md - common workflows, state management, troubleshooting}

## Script Execution

All tools are available as JavaScript scripts:
```bash
node skills/{skill-name}/scripts/{tool-name}.js --help
```

## Important Notes

- The skill documentation is auto-loaded into your context
- Refer to SKILL.md for complete tool reference
- Check workflows/ directory for detailed examples
- Review reference/troubleshooting.md for common issues

## Troubleshooting

{If reference/troubleshooting.md exists, summarize key points}

Always check:
1. mcp2rest connection: `curl http://localhost:28888/health`
2. Server status: `curl http://localhost:28888/servers`
3. Script dependencies: Scripts require Node.js 18+ and npm packages
```

**Generation instructions:**
- Read the skill's SKILL.md to understand its capabilities
- Extract tool groups, workflows, and use cases
- Tailor the agent description to the skill's domain
- Include specific examples from the skill documentation
- Keep the agent prompt focused and actionable

### Step 10: Move Skill Files

**IMPORTANT:** MOVE (not copy) the skill directory:

```bash
mv .claude/skills/${SKILL_NAME} ${PLUGIN_NAME}/skills/
```

Verify the move:
```bash
test -d ${PLUGIN_NAME}/skills/${SKILL_NAME} && echo "✓ Skill moved successfully"
test ! -d .claude/skills/${SKILL_NAME} && echo "✓ Original location cleaned"
```

### Step 11: Generate Plugin README.md

Create comprehensive plugin documentation at `${PLUGIN_NAME}/README.md`:

**README structure:**

```markdown
# {Display Name} Plugin

{PLUGIN_DESC}

## Overview

This plugin provides {capabilities description} through the {MCP_SERVER} MCP server integration.

**Generated from MCP server:** {MCP_PACKAGE}

## Prerequisites

- **Claude Code** installed
- **Node.js** >= 18.0.0
- **mcp2rest** installed and running
- **{MCP_SERVER} MCP server** configured

### Installing mcp2rest

\`\`\`bash
npm install -g mcp2rest
mcp2rest start
\`\`\`

### Configuring the MCP Server

\`\`\`bash
# Add the MCP server to mcp2rest
mcp2rest add {MCP_SERVER} {MCP_PACKAGE}

# Verify it's loaded and connected
mcp2rest list
\`\`\`

## Installation

### From Marketplace

\`\`\`bash
# Add the marketplace (if not already added)
/plugin marketplace add ulasbilgen/mcp-skills-plugins

# Install this plugin
/plugin install {PLUGIN_NAME}@mcp-skills-plugins
\`\`\`

Restart Claude Code to activate the plugin.

### Local Development

\`\`\`bash
# Clone the marketplace repository
git clone https://github.com/ulasbilgen/mcp-skills-plugins.git

# Add as local marketplace
/plugin marketplace add ./mcp-skills-plugins

# Install the plugin
/plugin install {PLUGIN_NAME}@mcp-skills-plugins
\`\`\`

## Quick Start

{Extract Quick Start section from SKILL.md}

## Available Capabilities

{Extract tool groups or main features from SKILL.md}

## Using the Agent

After installation, the `{agent-name}` agent will be available:

\`\`\`bash
/agents  # List all agents (should show {agent-name})
\`\`\`

**Invoke the agent explicitly:**
\`\`\`
> Use the {agent-name} agent to {example task from skill}
\`\`\`

**Automatic invocation:**
Claude will automatically use this agent when you request {domain} tasks.

## Documentation

Complete skill documentation is available in:
- \`skills/{SKILL_NAME}/SKILL.md\` - Main documentation and tool reference

{If workflows/ exists:}
- \`skills/{SKILL_NAME}/workflows/\` - Detailed workflow guides by category

{If reference/ exists:}
- \`skills/{SKILL_NAME}/reference/\` - Complete tool listing and troubleshooting

## Troubleshooting

### mcp2rest Connection Issues

\`\`\`bash
# Check if mcp2rest is running
curl http://localhost:28888/health

# Verify {MCP_SERVER} server is loaded
curl http://localhost:28888/servers

# Check server status
mcp2rest list
\`\`\`

### Script Execution Issues

\`\`\`bash
# Verify Node.js version (need 18+)
node --version

# Install dependencies if needed
cd skills/{SKILL_NAME}/scripts
npm install
\`\`\`

{Include additional troubleshooting from skill documentation}

## Contributing

Found an issue or have improvements? Please:
1. Check existing issues: https://github.com/ulasbilgen/mcp-skills-plugins/issues
2. Submit bug reports with reproduction steps
3. Propose enhancements via pull requests

## Version Information

- **Plugin version:** {PLUGIN_VERSION}
- **MCP server:** {MCP_PACKAGE}
- **Generated with:** [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools)
- **Requires:** mcp2rest for MCP server communication

## License

MIT License - See repository for details.
```

### Step 12: Update Marketplace Manifest

Read the current marketplace.json:
```bash
cat .claude-plugin/marketplace.json
```

Add the new plugin entry to the `plugins` array:

```json
{
  "name": "${PLUGIN_NAME}",
  "source": "./${PLUGIN_NAME}",
  "description": "${PLUGIN_DESC}"
}
```

Use Edit tool to update the plugins array in marketplace.json.

### Step 13: Verify Plugin Structure

Run verification checks:

```bash
# Verify plugin structure
echo "Plugin structure verification:"
test -f ${PLUGIN_NAME}/.claude-plugin/plugin.json && echo "✓ plugin.json"
test -f ${PLUGIN_NAME}/agents/*.md && echo "✓ agent definition"
test -d ${PLUGIN_NAME}/skills/${SKILL_NAME} && echo "✓ skill files"
test -f ${PLUGIN_NAME}/README.md && echo "✓ README.md"

# Count skill components
echo -e "\nSkill components:"
test -f ${PLUGIN_NAME}/skills/${SKILL_NAME}/SKILL.md && echo "✓ SKILL.md"
test -d ${PLUGIN_NAME}/skills/${SKILL_NAME}/scripts && echo "✓ scripts/"
test -d ${PLUGIN_NAME}/skills/${SKILL_NAME}/workflows && echo "✓ workflows/" || echo "  workflows/ (optional)"
test -d ${PLUGIN_NAME}/skills/${SKILL_NAME}/reference && echo "✓ reference/" || echo "  reference/ (optional)"
```

### Step 14: Output Success Message and Next Steps

Display completion message:

```
✓ Plugin created successfully: ${PLUGIN_NAME}

📦 Plugin Structure:
   ${PLUGIN_NAME}/
   ├── .claude-plugin/plugin.json
   ├── agents/{agent-name}.md
   ├── skills/${SKILL_NAME}/
   └── README.md

✓ Marketplace updated: .claude-plugin/marketplace.json

🧪 Testing Instructions:

1. Install the marketplace locally:
   /plugin marketplace add /Users/ulasbilgen/GithubProjects/mcp-skills-plugins

2. Install your plugin:
   /plugin install ${PLUGIN_NAME}@mcp-skills-plugins

3. Restart Claude Code to activate the plugin

4. Verify installation:
   /agents  # Should show {agent-name} agent

5. Test the agent:
   "Use the {agent-name} agent to {example task}"

📝 Before submitting:

1. Test the plugin thoroughly
2. Verify mcp2rest integration works
3. Check that the agent can execute skill scripts
4. Review generated documentation for accuracy
5. Run: npm run validate (if available)

🚀 Ready to submit:

1. Commit your changes:
   git add ${PLUGIN_NAME}/ .claude-plugin/marketplace.json
   git commit -m "Add ${PLUGIN_NAME} plugin"

2. Push to your fork and create a PR

For more details, see CONTRIBUTING.md
```

## Error Handling

Throughout execution, handle these error cases:

- **No skills found:** If .claude/skills/ is empty, inform user to run `/m2s:generate` first
- **Invalid skill selection:** If user selects non-existent skill number, re-prompt
- **Missing required files:** If SKILL.md or scripts/ missing, cannot proceed
- **Plugin already exists:** Ask user to confirm overwrite or choose different name
- **Move fails:** If skill move fails, don't continue (avoid partial plugin)
- **JSON parse errors:** Validate marketplace.json before and after edits

## Notes

- This command is generic and works for any MCP-generated skill
- Agent prompts are dynamically generated based on skill content
- The skill is MOVED (not copied) to ensure single source of truth
- Plugin versioning allows tracking MCP server updates
- Generated plugins follow Claude Code plugin best practices

## Related Commands

- `/m2s:generate` - Generate skills from MCP servers (prerequisite)
- `/m2s:list` - List available MCP servers
- `/m2s:update` - Update existing skills
- `/plugin` - Manage installed plugins
