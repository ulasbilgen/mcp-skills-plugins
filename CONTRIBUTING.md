# Contributing to MCP Skills Plugins

Thank you for your interest in contributing to the MCP Skills Plugins marketplace! This guide will walk you through the process of creating and submitting a plugin from an MCP server.

## Overview

This marketplace accepts **only MCP-based plugins** generated using the [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools) toolchain. Each plugin must use [mcp2rest](https://www.npmjs.com/package/mcp2rest) for communication with MCP servers.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **Git** installed and configured
- **An MCP server** you want to turn into a plugin
- **Claude Code** installed

## Step-by-Step Guide

### 1. Install Required Tools

Install the mcp2skill toolchain globally:

```bash
npm install -g mcp2rest mcp2scripts
```

Verify installation:

```bash
mcp2rest --version
mcp2scripts --version
```

### 2. Clone This Repository

```bash
git clone https://github.com/ulasbilgen/mcp-skills-plugins.git
cd mcp-skills-plugins
```

### 3. Update Submodules

This repository uses git submodules for the mcp2skill-commands:

```bash
git submodule update --init --recursive
```

### 4. Configure and Start mcp2rest

Start the mcp2rest server:

```bash
mcp2rest start
```

Load your MCP server into mcp2rest. For example, if you have a Chrome DevTools MCP server:

```bash
# Configure your MCP server in mcp2rest's config
# See mcp2rest documentation for details
```

Verify your MCP server is loaded:

```bash
mcp2rest list
```

### 5. Generate Skills from MCP Server

Start Claude Code from the repository root:

```bash
claude
```

Run the m2s initialization command:

```bash
/m2s:init
```

Follow the prompts to:
- Select your MCP server
- Choose which tools to generate skills for
- Configure output location (use `~/.claude/skills/` or `./.claude/skills/`)

This will generate:
- `SKILL.md` - Skill definition
- `scripts/` - JavaScript wrappers for each MCP tool

### 6. Create the Plugin

Use the custom skill2plugin command:

```bash
/skill2plugin
```

Provide the requested information:
- **Skill name**: The name of the skill you just generated
- **Plugin description**: Clear description of what the plugin does
- **MCP server name**: Name of the MCP server
- **Your name/username**: Your author information

This command will:
- Create a new plugin folder: `{skill-name}-plugin/`
- Generate all required plugin files
- Update `marketplace.json`
- Create plugin documentation

### 7. Review Generated Files

Check the generated plugin structure:

```
{skill-name}-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata
├── agents/
│   └── {skill-name}.md      # Agent definition
├── skills/
│   └── {skill-name}/        # Your generated skill
│       ├── SKILL.md
│       └── scripts/
└── README.md                 # Plugin documentation
```

### 8. Test Your Plugin Locally

Add this marketplace locally to test:

```bash
/plugin marketplace add /path/to/mcp-skills-plugins
```

Install your plugin:

```bash
/plugin install {skill-name}-plugin@mcp-skills-plugins
```

Test the functionality:
- Verify the agent works correctly
- Test each skill/tool
- Ensure mcp2rest integration is working
- Check for any errors or issues

### 9. Document Your Plugin

Update your plugin's README.md with:
- Clear description of what the plugin does
- Prerequisites (specific MCP server, dependencies)
- Installation instructions
- Usage examples
- Configuration requirements for the MCP server

### 10. Submit a Pull Request

Once you've tested your plugin:

1. Create a new branch:
   ```bash
   git checkout -b add-{skill-name}-plugin
   ```

2. Commit your plugin:
   ```bash
   git add {skill-name}-plugin/
   git add .claude-plugin/marketplace.json
   git commit -m "Add {skill-name} plugin"
   ```

3. Push to your fork:
   ```bash
   git push origin add-{skill-name}-plugin
   ```

4. Open a pull request on GitHub with:
   - Clear title: "Add {skill-name} plugin"
   - Description of what the plugin does
   - MCP server it's based on
   - Testing you've performed

## Plugin Quality Guidelines

All submitted plugins must:

- ✅ Be generated using mcp2skill-tools (mcp2scripts)
- ✅ Use mcp2rest for MCP server communication
- ✅ Include complete plugin.json metadata
- ✅ Have a well-written agent definition
- ✅ Include comprehensive README documentation
- ✅ Be tested locally before submission
- ✅ Have all skills working correctly
- ✅ Include clear prerequisites and setup instructions

## Need Help?

- Check [docs/WORKFLOW.md](./docs/WORKFLOW.md) for detailed examples
- Review existing plugins for reference (once available)
- Open an issue for questions or problems
- See [mcp2skill-tools documentation](https://github.com/ulasbilgen/mcp2skill-tools)

## Code of Conduct

Please be respectful and constructive in all interactions. This is a community project aimed at making MCP servers more accessible to Claude Code users.

## License

By contributing, you agree that your contributions will be licensed under the MIT License. Individual plugins may specify their own license if needed.
