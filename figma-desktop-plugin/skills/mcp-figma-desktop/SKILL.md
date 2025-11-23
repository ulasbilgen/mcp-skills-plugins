---
name: mcp-figma-desktop
description: Extract UI code, design tokens, and screenshots from Figma Desktop. Generate code from selected nodes, get design system variables, capture component visuals, and analyze design structure for design-to-code workflows.
---

# Figma Desktop Integration

Extract design specifications and generate UI code directly from Figma Desktop. Works with your currently open Figma file and selected nodes.

## Prerequisites

- **Figma Desktop app** installed and running
- **mcp2rest** running on http://localhost:28888
- **figma-desktop server** loaded in mcp2rest
- **Node.js** >= 18.0.0
- **Active Figma file** open in Figma Desktop

## Quick Start

Extract code from your currently selected Figma component:

```bash
# 1. Open Figma Desktop and select a component
# 2. Extract UI code from selected node
node scripts/get_design_context.js

# Output: Returns HTML/CSS/React code for the selected component
```

Extract code from a specific node by ID:

```bash
# Node ID from URL: https://figma.com/design/ABC123/MyDesign?node-id=1-2
# Extract node-id: 1-2 becomes 1:2
node scripts/get_design_context.js --nodeId "1:2"
```

## Available Tools

### Design Extraction

**get_design_context** - Generate UI code for Figma nodes
- **Primary tool** for extracting design specifications and code
- Works with selected node or specific node ID
- Returns: HTML, CSS, React components, design tokens
- Optional:
  - `--nodeId` - Node ID (e.g., "123:456" or extracted from URL)
  - `--clientLanguages` - Target languages (e.g., "javascript,typescript")
  - `--clientFrameworks` - Target frameworks (e.g., "react,vue")
  - `--forceCode` - Force code generation even if output is large

Example:
```bash
# Extract selected node with React/TypeScript context
node scripts/get_design_context.js \
  --clientLanguages "typescript" \
  --clientFrameworks "react"

# Extract specific node
node scripts/get_design_context.js \
  --nodeId "145:892" \
  --clientLanguages "javascript,html,css"
```

**get_metadata** - Get page/node structure in XML format
- **Use sparingly** - Prefer get_design_context for most cases
- Returns: Node IDs, layer types, names, positions, sizes
- Useful for: Getting overview of design structure, finding node IDs
- Optional:
  - `--nodeId` - Node or page ID (e.g., "0:1" for page)
  - `--clientLanguages` - Context for logging
  - `--clientFrameworks` - Context for logging

Example:
```bash
# Get structure of entire page
node scripts/get_metadata.js --nodeId "0:1"

# Get structure of selected component
node scripts/get_metadata.js
```

### Assets & Variables

**get_variable_defs** - Get design system variable definitions
- Returns: Color tokens, typography, spacing, etc.
- Format: `{'icon/default/secondary': '#949494'}`
- Optional:
  - `--nodeId` - Node ID to get variables for
  - `--clientLanguages` - Context for logging
  - `--clientFrameworks` - Context for logging

Example:
```bash
# Get all variables from selected component
node scripts/get_variable_defs.js

# Get variables for specific node
node scripts/get_variable_defs.js --nodeId "89:234"
```

**get_screenshot** - Capture visual representation of nodes
- Returns: PNG screenshot of component/node
- Useful for: Documentation, visual regression testing, asset extraction
- Optional:
  - `--nodeId` - Node ID to screenshot
  - `--clientLanguages` - Context for logging
  - `--clientFrameworks` - Context for logging

Example:
```bash
# Screenshot selected component
node scripts/get_screenshot.js

# Screenshot specific node
node scripts/get_screenshot.js --nodeId "156:901"
```

### Design Systems

**create_design_system_rules** - Generate design system documentation
- Returns: Prompt/guide for creating design system rules
- Analyzes design patterns and suggests conventions
- Optional:
  - `--clientLanguages` - Target languages for documentation
  - `--clientFrameworks` - Target frameworks for guidelines

Example:
```bash
# Generate design system rules for React/TypeScript project
node scripts/create_design_system_rules.js \
  --clientLanguages "typescript" \
  --clientFrameworks "react"
```

### FigJam

**get_figjam** - Extract content from FigJam boards
- **FigJam only** - Does not work with regular Figma files
- Returns: FigJam node content and structure
- Optional:
  - `--nodeId` - FigJam node ID (extracted from board URL)
  - `--clientLanguages` - Context for logging
  - `--clientFrameworks` - Context for logging
  - `--includeImagesOfNodes` - Include node images (default: true)

Example:
```bash
# Extract from FigJam board URL:
# https://figma.com/board/XYZ789/MyBoard?node-id=5-10
# Node ID: 5-10 becomes 5:10

node scripts/get_figjam.js --nodeId "5:10"
```

## Common Workflows

### Workflow 1: Extract Component Code

Convert a Figma component to production code:

**Input:**
- Component URL: `https://figma.com/design/ABC123/MyApp?node-id=42-156`
- Target: React + TypeScript
- Node ID: `42:156` (extracted from URL, convert to `42:156`)

**Steps:**
```bash
# 1. Extract UI code with framework context
node scripts/get_design_context.js \
  --nodeId "42:156" \
  --clientLanguages "typescript" \
  --clientFrameworks "react"

# 2. Get design tokens/variables
node scripts/get_variable_defs.js --nodeId "42:156"

# 3. Capture screenshot for documentation
node scripts/get_screenshot.js --nodeId "42:156"
```

**Expected Output:**
- React component code with TypeScript types
- CSS-in-JS or Tailwind classes
- Design token values (colors, spacing, typography)
- Component screenshot

**Checklist:**
- [ ] Extract node ID from Figma URL (change `-` to `:`)
- [ ] Run get_design_context with framework context
- [ ] Extract design variables for token mapping
- [ ] Capture screenshot for component library docs
- [ ] Verify code compiles and renders correctly

### Workflow 2: Build Design Token System

Extract design system variables for theming:

**Input:**
- Design system page URL: `https://figma.com/design/DEF456/DesignSystem?node-id=0-1`
- Target: CSS custom properties
- Page ID: `0:1`

**Steps:**
```bash
# 1. Get page structure to find token groups
node scripts/get_metadata.js --nodeId "0:1"

# 2. Extract variable definitions
node scripts/get_variable_defs.js --nodeId "0:1"

# 3. Generate design system documentation
node scripts/create_design_system_rules.js \
  --clientLanguages "css,javascript" \
  --clientFrameworks "unknown"
```

**Expected Output:**
- Complete variable hierarchy (colors, typography, spacing, etc.)
- Design system guidelines
- Token naming conventions
- CSS custom property mappings

**Checklist:**
- [ ] Identify design system page ID
- [ ] Extract all variable definitions
- [ ] Generate design system rules document
- [ ] Map Figma variables to CSS custom properties
- [ ] Document token usage guidelines

### Workflow 3: Document Components Visually

Create visual documentation for component library:

**Steps:**
```bash
# 1. Open Figma, select component variant group
# 2. Get structure to identify all variants
node scripts/get_metadata.js

# 3. For each variant node ID found, capture screenshot
node scripts/get_screenshot.js --nodeId "VARIANT_1_ID"
node scripts/get_screenshot.js --nodeId "VARIANT_2_ID"
node scripts/get_screenshot.js --nodeId "VARIANT_3_ID"

# 4. Extract code for each variant
node scripts/get_design_context.js --nodeId "VARIANT_1_ID"
node scripts/get_design_context.js --nodeId "VARIANT_2_ID"
node scripts/get_design_context.js --nodeId "VARIANT_3_ID"
```

**Checklist:**
- [ ] Select component in Figma Desktop
- [ ] Get metadata to list all variants
- [ ] Screenshot each variant for visual reference
- [ ] Extract code for each variant state
- [ ] Organize screenshots and code in documentation

### Workflow 4: Work with Selected Nodes

Fastest workflow using Figma's current selection:

**Steps:**
```bash
# 1. Select any node in Figma Desktop
# 2. Extract without specifying nodeId
node scripts/get_design_context.js

# 3. Get variables for selection
node scripts/get_variable_defs.js

# 4. Screenshot selection
node scripts/get_screenshot.js
```

**Note:** All tools work with currently selected node when no `--nodeId` is provided.

## Node ID Reference

### Extracting Node IDs from URLs

Figma URLs contain node IDs that need conversion:

**Design files:**
```
URL:     https://figma.com/design/ABC123/MyDesign?node-id=1-2
Extract: node-id=1-2
Convert: 1-2 → 1:2 (replace dash with colon)
Usage:   --nodeId "1:2"
```

**FigJam boards:**
```
URL:     https://figma.com/board/XYZ789/MyBoard?node-id=5-10
Extract: node-id=5-10
Convert: 5-10 → 5:10
Usage:   --nodeId "5:10"
```

**Page IDs:**
```
First page is usually: 0:1
Second page: 0:2
etc.
```

### Finding Node IDs

**Method 1: From Figma URL**
- Right-click node → "Copy link to selection"
- Extract `node-id` parameter
- Replace `-` with `:`

**Method 2: Using get_metadata**
```bash
# Get structure of entire page
node scripts/get_metadata.js --nodeId "0:1"

# Output includes node IDs for all children
```

**Method 3: Using selection**
- Select node in Figma Desktop
- Run any tool without `--nodeId`
- Works with current selection automatically

## State Persistence

The figma-desktop server maintains state between calls:
- **Active file**: Works with currently open Figma file
- **Selection**: Tracks your current node selection
- **Session**: Persists until Figma Desktop or mcp2rest restarts
- **Shared state**: All scripts access the same Figma instance

## Troubleshooting

### Connection Issues

```bash
# Check mcp2rest is running
curl http://localhost:28888/health

# Verify figma-desktop server is loaded
curl http://localhost:28888/servers

# Should show: "name": "figma-desktop", "status": "connected"
```

### Figma Desktop Not Responding

**Symptoms:**
- Tools return errors about connection
- No data returned from scripts

**Solutions:**
1. Ensure Figma Desktop app is running
2. Restart Figma Desktop app
3. Restart mcp2rest: `mcp2rest restart`
4. Check Figma Desktop plugin/extension is enabled

### Node ID Errors

**Error:** "Node not found" or "Invalid node ID"

**Solutions:**
1. Verify node ID format uses `:` not `-` (e.g., `1:2` not `1-2`)
2. Ensure node exists in currently open file
3. Check if node ID is from correct file
4. Try using selection instead of node ID

### Empty or Missing Output

**Symptoms:**
- get_design_context returns no code
- get_variable_defs returns empty

**Solutions:**
1. Check if node has design properties to extract
2. Try `--forceCode` flag on get_design_context
3. Ensure correct file is open in Figma Desktop
4. Verify node contains actual content (not empty frame)

### FigJam Tools Not Working

**Error:** Tool fails on FigJam board

**Solution:**
- Use `get_figjam` specifically for FigJam boards
- Regular tools only work with design files, not FigJam
- Check URL starts with `figma.com/board/` not `figma.com/design/`

### Script Execution Issues

```bash
# Verify Node.js version (need 18+)
node --version

# Reinstall dependencies if needed
cd scripts/
npm install

# Check script has execute permissions
ls -la scripts/

# Get help for any tool
node scripts/tool_name.js --help
```

## Tips and Best Practices

### For Design-to-Code Workflows

1. **Use framework context** - Always specify `--clientLanguages` and `--clientFrameworks` for better code generation
2. **Extract variables first** - Get design tokens before extracting code to ensure consistency
3. **Prefer selection** - Working with selected nodes is faster than finding node IDs
4. **Batch extractions** - Extract multiple components in sequence for efficiency

### For Design Systems

1. **Page-level extraction** - Use page ID (e.g., `0:1`) to extract all tokens at once
2. **Document conventions** - Use create_design_system_rules for consistent naming
3. **Visual documentation** - Screenshot all token examples for reference
4. **Version tracking** - Re-extract tokens when design system updates

### For Documentation

1. **Screenshot variants** - Capture all component states for comprehensive docs
2. **Extract metadata first** - Use get_metadata to plan extraction strategy
3. **Include context** - Always specify target languages/frameworks in documentation

## Related Commands

- `/m2s:update figma-desktop` - Update this skill with latest tools
- `/m2s:list` - List all available MCP servers

## Script Location

All scripts are in: `.claude/skills/mcp-figma-desktop/scripts/`

Run from anywhere using full path or navigate to scripts directory first.
