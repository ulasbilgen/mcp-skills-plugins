---
description: Convert an MCP-generated skill into a Claude Code plugin
---

# skill2plugin Command

This command helps you package an MCP-generated skill (created via `/m2s:init`) into a complete Claude Code plugin for this marketplace.

## Prerequisites

Before running this command, you should have:
1. Generated a skill using `/m2s:init` from an MCP server
2. The skill should be in `~/.claude/skills/` or `./.claude/skills/`

## What this command does

This command will:
1. Ask you for the skill name (e.g., "chrome-dev-tools", "figma-desktop")
2. Create a new plugin folder: `{skill-name}-plugin/`
3. Generate the plugin structure:
   - `.claude-plugin/plugin.json` with metadata
   - `agents/{skill-name}.md` - agent definition for using the skill
   - `skills/` - copy or link the skill files
   - `README.md` - plugin documentation
4. Update the root `marketplace.json` to register the plugin
5. Provide next steps for testing and submitting

## Instructions

Follow these steps to create a plugin from your MCP skill:

### Step 1: Gather Information

First, I need to know:
- **Skill name**: The name of the skill you generated (should match the folder name in ~/.claude/skills/ or ./.claude/skills/)
- **Plugin description**: A brief description of what this plugin does
- **MCP server name**: The name of the MCP server this skill is based on
- **Author name**: Your name or username

### Step 2: Create Plugin Structure

I will create a new plugin folder with this structure:

```
{skill-name}-plugin/
├── .claude-plugin/
│   └── plugin.json
├── agents/
│   └── {skill-name}.md
├── skills/
│   └── {skill-name}/
│       └── SKILL.md
│       └── scripts/
└── README.md
```

### Step 3: Generate Plugin Files

**plugin.json**:
```json
{
  "name": "{skill-name}-plugin",
  "description": "{description}",
  "version": "1.0.0",
  "author": {
    "name": "{author}"
  },
  "mcp": {
    "server": "{mcp-server-name}",
    "requires": "mcp2rest"
  }
}
```

**agents/{skill-name}.md**:
- Agent definition that knows how to use the skill effectively
- Includes context about the MCP server and available tools
- Best practices for using the skill

**skills/{skill-name}/**:
- Copy the skill from ~/.claude/skills/ or ./.claude/skills/
- Include all generated scripts and SKILL.md

**README.md**:
- Plugin overview
- Installation instructions
- Usage examples
- Prerequisites (mcp2rest, MCP server configuration)

### Step 4: Update Marketplace

Add the plugin to `.claude-plugin/marketplace.json`:
```json
{
  "name": "{skill-name}-plugin",
  "source": "./{skill-name}-plugin",
  "description": "{description}"
}
```

### Step 5: Test Locally

Instructions for testing:
1. Add this marketplace locally: `/plugin marketplace add /path/to/mcp-skills-plugins`
2. Install your plugin: `/plugin install {skill-name}-plugin@mcp-skills-plugins`
3. Test the agent and skill functionality
4. Verify mcp2rest integration works

### Step 6: Submit PR

Once tested:
1. Commit your plugin folder
2. Push to your fork
3. Create a pull request to the main repository

---

Please provide the following information to create your plugin:

1. **Skill name** (from ~/.claude/skills/ or ./.claude/skills/):
2. **Plugin description**:
3. **MCP server name**:
4. **Your name/username**:

I'll then create the complete plugin structure for you!
