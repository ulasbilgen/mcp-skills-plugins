# Figma Desktop Plugin

Design-to-code automation via Figma Desktop. Extract UI code, design tokens, and screenshots from Figma files using mcp2rest integration.

## Overview

This plugin provides design-to-code automation capabilities through the Figma Desktop MCP server integration. Extract production-ready React, Vue, or HTML/CSS code directly from your Figma designs, along with design system variables and component screenshots.

**Generated from MCP server:** Figma Desktop (built-in MCP server) v1.0.0

## Prerequisites

- **Claude Code** installed
- **Figma Desktop app** >= v1.0.0 (with built-in MCP server support)
- **Node.js** >= 18.0.0
- **mcp2rest** installed and running

### Installing mcp2rest

```bash
npm install -g mcp2rest
mcp2rest start
```

### Configuring the Figma Desktop MCP Server

The Figma Desktop MCP server is built into the Figma Desktop application and runs via HTTP.

**Add to mcp2rest:**

```bash
# Add figma-desktop server (HTTP transport)
mcp2rest add figma-desktop http://127.0.0.1:3845/mcp

# Verify it's connected
mcp2rest list
# Should show: figma-desktop - connected - 6 tools
```

**Prerequisites:**
1. Figma Desktop app must be installed and running
2. MCP server feature must be enabled in Figma Desktop settings
3. Server typically runs on port 3845 (default)

## Installation

### From Marketplace

```bash
# Add the marketplace (if not already added)
/plugin marketplace add ulasbilgen/mcp-skills-plugins

# Install this plugin
/plugin install figma-desktop-plugin@mcp-skills-plugins
```

Restart Claude Code to activate the plugin.

### Local Development

```bash
# Clone the marketplace repository
git clone https://github.com/ulasbilgen/mcp-skills-plugins.git

# Add as local marketplace
/plugin marketplace add ./mcp-skills-plugins

# Install the plugin
/plugin install figma-desktop-plugin@mcp-skills-plugins
```

## Quick Start

### 1. Ensure Prerequisites

```bash
# Check Figma Desktop is running (with a file open)
# Check mcp2rest is running
curl http://localhost:28888/health

# Verify figma-desktop server is connected
curl http://localhost:28888/servers | grep figma-desktop
```

### 2. Extract Code from Figma Component

**Using Figma selection (easiest):**

```
> Use the figma-desktop agent to extract code from my currently selected component
```

**Using Figma URL:**

```
> Extract React code from this Figma component:
  https://figma.com/design/ABC123/MyDesign?node-id=42-156
```

### 3. Extract Design Tokens

```
> Use the figma-desktop agent to extract all color and typography variables from my design system page
```

### 4. Generate Component Documentation

```
> Create documentation for all button variants in my Figma file including screenshots and code
```

## Available Capabilities

This plugin provides 6 tools organized into categories:

### Design Extraction
- **get_design_context** - Extract UI code (React, Vue, HTML/CSS) from components
- **get_metadata** - Get page/component structure overview in XML format

### Assets & Variables
- **get_variable_defs** - Extract design system variables (colors, typography, spacing)
- **get_screenshot** - Capture PNG screenshots of components

### Design Systems
- **create_design_system_rules** - Generate design system documentation and guidelines

### FigJam
- **get_figjam** - Extract content from FigJam boards

## Using the Agent

After installation, the `figma-desktop` agent will be available:

```bash
/agents  # List all agents (should show figma-desktop)
```

**Invoke the agent explicitly:**
```
> Use the figma-desktop agent to extract React code from my Button component
```

**Automatic invocation:**
Claude will automatically use this agent when you request design-to-code tasks like:
- "Extract code from this Figma component"
- "Get design tokens from my Figma file"
- "Screenshot this Figma component"
- "Convert Figma designs to React components"

## Common Use Cases

### 1. Component Code Extraction

**Input:**
- Figma component URL: `https://figma.com/design/ABC123/MyApp?node-id=42-156`
- Target: React + TypeScript

**Ask Claude:**
```
> Extract React TypeScript code from this Figma component:
  https://figma.com/design/ABC123/MyApp?node-id=42-156
```

**Agent will:**
1. Extract node ID from URL (`42-156` → `42:156`)
2. Run `get_design_context` with React/TypeScript context
3. Extract design variables
4. Capture screenshot
5. Present complete code with tokens

### 2. Design System Token Extraction

**Input:**
- Design system page in Figma
- Target: CSS custom properties

**Ask Claude:**
```
> Extract all design system variables from my Figma design system and convert them to CSS custom properties
```

**Agent will:**
1. Get page structure with `get_metadata`
2. Extract all variables with `get_variable_defs`
3. Parse and organize token hierarchy
4. Generate CSS custom property mappings
5. Create design system documentation

### 3. Component Library Documentation

**Input:**
- Component with multiple variants
- Need: Visual docs with code examples

**Ask Claude:**
```
> Document all variants of the Button component including screenshots and code for each state
```

**Agent will:**
1. Use `get_metadata` to find variant node IDs
2. Screenshot each variant
3. Extract code for each variant
4. Compile into organized documentation

### 4. Quick Selection-Based Workflow

**Input:**
- Component selected in Figma Desktop

**Ask Claude:**
```
> Extract code and variables from my currently selected Figma component
```

**Agent will:**
1. Work with Figma Desktop's current selection
2. Extract code without needing node ID
3. Get variables
4. Capture screenshot

## Documentation

Complete skill documentation is available in:
- `skills/mcp-figma-desktop/SKILL.md` - Main documentation, tool reference, and workflows

### Key Documentation Sections:

**Tool Reference:**
- Detailed parameter documentation for all 6 tools
- Command-line examples for each tool
- Framework context guidelines

**Workflows:**
- Extract Component Code - Figma to production code
- Build Design Token System - Extract design variables
- Document Components Visually - Screenshots + code
- Work with Selected Nodes - Quick interactive workflow

**Node ID Reference:**
- How to extract node IDs from Figma URLs
- Conversion rules (dash → colon)
- Three methods for finding node IDs

**Troubleshooting:**
- Connection issues
- Figma Desktop not responding
- Node ID errors
- Empty output scenarios
- FigJam-specific issues

## Troubleshooting

### mcp2rest Connection Issues

```bash
# Check if mcp2rest is running
curl http://localhost:28888/health

# Verify figma-desktop server is loaded and connected
curl http://localhost:28888/servers

# Should show:
# {
#   "name": "figma-desktop",
#   "status": "connected",
#   "transport": "http",
#   "url": "http://127.0.0.1:3845/mcp"
# }
```

**If not connected:**
1. Ensure Figma Desktop app is running
2. Verify MCP server is enabled in Figma Desktop settings
3. Restart Figma Desktop app
4. Restart mcp2rest: `mcp2rest restart`
5. Re-add server: `mcp2rest add figma-desktop http://127.0.0.1:3845/mcp`

### Figma Desktop Not Responding

**Symptoms:**
- Tools return connection errors
- No data returned from commands

**Solutions:**
1. Ensure Figma Desktop app is running with a file open
2. Check that MCP server feature is enabled in settings
3. Restart Figma Desktop app
4. Check Figma Desktop console for errors
5. Verify port 3845 is not blocked by firewall

### Node ID Errors

**Error:** "Node not found" or "Invalid node ID"

**Solutions:**
1. Verify node ID format uses `:` not `-` (e.g., `1:2` not `1-2`)
   - URLs show `node-id=1-2` but tools need `1:2`
2. Ensure node exists in currently open file
3. Check if you're using node ID from a different file
4. Try using Figma Desktop selection instead of node ID

### Empty or Missing Output

**Symptoms:**
- `get_design_context` returns no code
- `get_variable_defs` returns empty

**Solutions:**
1. Check if node has design properties to extract
2. Verify node contains actual content (not empty frame)
3. Try `--forceCode` flag on `get_design_context`
4. Ensure correct file is open in Figma Desktop
5. Check that node is not hidden or locked

### Script Execution Issues

```bash
# Navigate to skill scripts directory
cd figma-desktop-plugin/skills/mcp-figma-desktop/scripts/

# Verify Node.js version (need 18+)
node --version

# Check if dependencies are installed
test -d node_modules && echo "✓ Dependencies OK" || npm install

# Get help for any tool
node get_design_context.js --help
```

### FigJam Tools Not Working

**Error:** Tool fails when working with FigJam board

**Solution:**
- Use `get_figjam` specifically for FigJam boards
- Regular tools (get_design_context, etc.) only work with design files
- Verify URL starts with `figma.com/board/` not `figma.com/design/`
- FigJam node IDs follow same conversion rules (dash → colon)

### Port Conflicts

**Error:** "Connection refused" or "Port in use"

**Solutions:**
1. Check if port 3845 is available: `lsof -i :3845`
2. Verify Figma Desktop MCP server port in settings
3. Update mcp2rest configuration if Figma uses different port
4. Restart both Figma Desktop and mcp2rest

## Tips and Best Practices

### For Design-to-Code Workflows

1. **Always specify framework context** for better code generation:
   - React: `--clientFrameworks "react"`
   - Vue: `--clientFrameworks "vue"`
   - Multiple: `--clientFrameworks "react,nextjs"`

2. **Extract variables first** before extracting code:
   - Ensures design token consistency
   - Maps Figma variables to code tokens

3. **Use selection-based workflow** for speed:
   - Select in Figma Desktop
   - Run tools without `--nodeId`
   - Faster than finding node IDs

4. **Batch extractions** for multiple components:
   - Extract all at once for efficiency
   - Use `get_metadata` first to plan strategy

### For Design Systems

1. **Page-level extraction** for complete token sets:
   - Use page ID (e.g., `0:1`) to extract all tokens
   - More complete than node-by-node extraction

2. **Document naming conventions** with `create_design_system_rules`:
   - Generates consistent naming patterns
   - Creates documentation structure

3. **Screenshot token examples** for visual reference:
   - Use `get_screenshot` on color/typography samples
   - Include in design system docs

4. **Re-extract when designs update**:
   - Track design system version in Figma
   - Re-run extraction workflow after updates

### For Documentation

1. **Screenshot all component variants**:
   - Capture every state (default, hover, disabled, etc.)
   - Use in component library docs

2. **Extract metadata first** to plan documentation:
   - See full component structure
   - Identify all variants and states

3. **Include framework context** in documentation:
   - Generate code for each target framework
   - Document framework-specific patterns

## Contributing

Found an issue or have improvements? Please:
1. Check existing issues: https://github.com/ulasbilgen/mcp-skills-plugins/issues
2. Submit bug reports with reproduction steps
3. Propose enhancements via pull requests

## Version Information

- **Plugin version:** 0.5.0
- **MCP server:** Figma Desktop (built-in MCP server) v1.0.0
- **Transport:** HTTP (http://127.0.0.1:3845/mcp)
- **Tools:** 6 design-to-code tools
- **Generated with:** [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools)
- **Requires:** mcp2rest for MCP server communication

## Related Projects

- [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools) - Tooling for MCP skill generation
- [mcp2rest](https://www.npmjs.com/package/mcp2rest) - REST API gateway for MCP servers
- [Figma Desktop](https://www.figma.com/downloads/) - Design tool with built-in MCP server
- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specification

## License

MIT License - See repository for details.
