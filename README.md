# MCP Skills Plugins Marketplace

A curated collection of Claude Code plugins generated from MCP (Model Context Protocol) servers. Each plugin provides agents and skills that enable Claude to interact with external tools and services through [mcp2rest](https://github.com/ulasbilgen/mcp2skill-tools/tree/main/packages/mcp2rest).

## What are MCP Skills Plugins?

These plugins bridge MCP servers with Claude Code by:

1. **MCP Server** → Running via `mcp2rest` (persistent REST API gateway)
2. **Skills** → Generated JavaScript scripts that call MCP tools via REST
3. **Agents** → Specialized agents that know how to use the skills effectively
4. **Plugin** → Packaged together for easy installation and distribution

## Installation

### Add the Marketplace

```bash
/plugin marketplace add ulasbilgen/mcp-skills-plugins
```

### Install a Plugin

```bash
/plugin install chrome-dev-tools-plugin@mcp-skills-plugins
```

or browse all plugins:

```bash
/plugin
```

### Prerequisites

All plugins in this marketplace require:

- **[mcp2rest](https://www.npmjs.com/package/mcp2rest)** - Install globally: `npm install -g mcp2rest`
- **The corresponding MCP server** configured in mcp2rest
- **Node.js** >= 18.0.0

## Available Plugins

<!-- Plugins will be listed here as they are added -->

*No plugins available yet. Coming soon: chrome-dev-tools-plugin and figma-desktop-plugin!*

## How It Works

```
┌─────────────────┐
│   MCP Server    │ (Chrome DevTools, Figma, etc.)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    mcp2rest     │ Runs MCP server, exposes REST API
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Plugin Skills  │ Generated JavaScript scripts
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Claude Code     │ Uses skills via specialized agents
│    Agents       │
└─────────────────┘
```

## Contributing

We welcome contributions! To add a new plugin from an MCP server:

1. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the complete workflow
2. All plugins must be generated using [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools)
3. Plugins must use mcp2rest for MCP server communication

## Development

This repository includes:

- **m2s commands** from [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools) for generating skills
- **Custom `/skill2plugin` command** to streamline plugin creation
- **Validation scripts** to ensure plugin quality

## Related Projects

- [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools) - Tooling suite for MCP-to-skill conversion
- [mcp2rest](https://www.npmjs.com/package/mcp2rest) - REST API gateway for MCP servers
- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specification
- [Claude Code](https://claude.com/claude-code) - AI coding assistant

## License

MIT License - See [LICENSE](./LICENSE) for details

Individual plugins may have their own licenses specified in their README files.
