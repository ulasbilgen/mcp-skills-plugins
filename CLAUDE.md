# MCP Skills Plugins Marketplace

This is a Claude Code plugins marketplace specifically for MCP (Model Context Protocol) server integrations.

## Project Overview

This marketplace hosts Claude Code plugins generated from MCP servers using the [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools) toolchain. Each plugin:

1. Is generated from an MCP server using `mcp2scripts`
2. Uses `mcp2rest` to communicate with the MCP server via REST API
3. Includes Skills (JavaScript scripts) and Agents that know how to use those skills
4. Can be installed by users via `/plugin marketplace add ulasbilgen/mcp-skills-plugins`

## Project Structure

```
mcp-skills-plugins/
├── .claude/
│   └── commands/
│       ├── m2s/             # MCP-to-skill commands
│       └── skill2plugin.md  # Custom command to create plugins
├── .claude-plugin/
│   └── marketplace.json     # Marketplace catalog
├── {plugin-name}-plugin/    # Individual plugin folders
└── docs/                    # Documentation
```

## Available Commands

### MCP-to-Skill Commands (m2s)

- `/m2s:init` - Generate skills from an MCP server
- `/m2s:generate` - Generate scripts for specific tools
- `/m2s:update` - Update existing skills
- `/m2s:list` - List available MCP servers
- `/m2s:add` - Add new MCP server

### Plugin Management

- `/skill2plugin` - Convert a generated skill into a marketplace plugin

## Typical Workflow for Adding Plugins

When contributing a new plugin:

1. **Start mcp2rest**: `mcp2rest start`
2. **Load your MCP server** into mcp2rest
3. **Generate skills**: Run `/m2s:init` and follow prompts
4. **Create plugin**: Run `/skill2plugin` and provide plugin info
5. **Test locally**: Install marketplace and test the plugin
6. **Submit PR**: Commit plugin folder and updated marketplace.json

## Important Rules

- **All plugins MUST be generated using mcp2skill-tools**
- **All plugins MUST use mcp2rest** for MCP communication
- **Always update `marketplace.json`** when adding a new plugin
- **Test plugins locally** before submitting

## Updating m2s Commands

The m2s commands in `.claude/commands/m2s/` are maintained separately from the upstream [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools) repository. When new versions of mcp2skill-tools are released with updated commands, they should be manually copied into this repository.

## Validation

Run validation before committing:

```bash
npm run validate
```

List all plugins:

```bash
npm run list-plugins
```

## Documentation

- [README.md](./README.md) - Marketplace overview
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Complete contribution guide
- [docs/WORKFLOW.md](./docs/WORKFLOW.md) - Detailed workflow examples
- [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools) - Tooling documentation

## Current Status

- Marketplace is set up and ready
- Awaiting first plugins: chrome-dev-tools-plugin and figma-desktop-plugin
- Contributors can submit plugins following the workflow above
