# Detailed Workflow: Creating an MCP Plugin

This document provides a detailed walkthrough of creating a plugin from an MCP server, with concrete examples and troubleshooting tips.

## Complete Example: Creating a Chrome DevTools Plugin

Let's walk through creating a plugin for the Chrome DevTools MCP server.

### Phase 1: Environment Setup

#### 1. Install Tools

```bash
# Install mcp2rest globally
npm install -g mcp2rest

# Install mcp2scripts globally
npm install -g mcp2scripts

# Verify installations
mcp2rest --version  # Should show version number
mcp2scripts --version  # Should show version number
```

#### 2. Clone the Marketplace Repository

```bash
# Clone the repository
git clone https://github.com/ulasbilgen/mcp-skills-plugins.git
cd mcp-skills-plugins

# Initialize submodules (important!)
git submodule update --init --recursive

# Create your feature branch
git checkout -b add-chrome-devtools-plugin
```

### Phase 2: Configure MCP Server

#### 3. Start mcp2rest

```bash
# Start the mcp2rest server (runs on port 28888 by default)
mcp2rest start
```

Expected output:
```
mcp2rest server started on port 28888
```

#### 4. Configure Your MCP Server

Add your MCP server configuration. For Chrome DevTools:

```bash
# Edit mcp2rest config to add your MCP server
# The exact method depends on your MCP server
# See the MCP server's documentation for connection details
```

Verify the server is loaded:

```bash
mcp2rest list
```

Expected output should show your server:
```
Available MCP servers:
  - chrome-dev-tools (running)
```

### Phase 3: Generate Skills

#### 5. Start Claude Code

From the repository root:

```bash
claude
```

#### 6. Initialize Skill Generation

Run the m2s:init command:

```bash
/m2s:init
```

Follow the interactive prompts:

```
? Select MCP server: chrome-dev-tools
? Select tools to generate (space to select, enter to confirm):
  ◉ navigate_to
  ◉ screenshot
  ◉ evaluate_javascript
  ◉ get_elements

? Output location: ~/.claude/skills/
? Skill name: chrome-dev-tools
```

#### 7. Verify Skill Generation

Check that the skills were generated:

```bash
ls -la ~/.claude/skills/chrome-dev-tools/
```

Expected structure:
```
chrome-dev-tools/
├── SKILL.md
└── scripts/
    ├── navigate_to.js
    ├── screenshot.js
    ├── evaluate_javascript.js
    └── get_elements.js
```

### Phase 4: Create the Plugin

#### 8. Run skill2plugin Command

In Claude Code:

```bash
/skill2plugin
```

Provide the information when prompted:

```
1. Skill name: chrome-dev-tools
2. Plugin description: Control Chrome DevTools via MCP - navigate pages, take screenshots, evaluate JavaScript, and query DOM elements
3. MCP server name: @modelcontextprotocol/server-chrome-devtools
4. Your name/username: yourusername
```

#### 9. Review Generated Plugin

Check the created plugin structure:

```bash
ls -la chrome-dev-tools-plugin/
```

Expected output:
```
chrome-dev-tools-plugin/
├── .claude-plugin/
│   └── plugin.json
├── agents/
│   └── chrome-dev-tools.md
├── skills/
│   └── chrome-dev-tools/
│       ├── SKILL.md
│       └── scripts/
│           ├── navigate_to.js
│           ├── screenshot.js
│           ├── evaluate_javascript.js
│           └── get_elements.js
└── README.md
```

#### 10. Customize Agent Definition

Review and enhance `agents/chrome-dev-tools.md`:

```markdown
---
description: Chrome DevTools automation specialist
---

# Chrome DevTools Agent

I am a specialized agent for controlling Chrome DevTools through MCP.

## Capabilities

I can help you with:
- Navigating to URLs in Chrome
- Taking screenshots of web pages
- Evaluating JavaScript in the browser context
- Querying and interacting with DOM elements

## Skills Available

- `chrome-dev-tools` - All Chrome DevTools MCP tools

## Best Practices

When using this agent:
1. Always ensure Chrome DevTools is running and accessible
2. Be specific about which page or element you want to interact with
3. For JavaScript evaluation, provide complete, executable code
4. Screenshots are saved to the specified output location

## Example Usage

"Navigate to google.com and take a screenshot"
"Evaluate document.title on the current page"
"Find all button elements on the page"
```

### Phase 5: Test the Plugin

#### 11. Add Marketplace Locally

```bash
/plugin marketplace add /Users/yourusername/mcp-skills-plugins
```

#### 12. Install Your Plugin

```bash
/plugin install chrome-dev-tools-plugin@mcp-skills-plugins
```

You'll see a confirmation prompt. Select "Install now" and restart Claude Code.

#### 13. Test Functionality

After restarting, test each capability:

```bash
# Test the agent
Hey @chrome-dev-tools, navigate to example.com and take a screenshot

# Test individual skills directly
Use the chrome-dev-tools skill to navigate to github.com
```

Verify:
- ✅ Agent responds appropriately
- ✅ Skills execute without errors
- ✅ mcp2rest communication works
- ✅ Results are as expected

### Phase 6: Document and Submit

#### 14. Update Plugin README

Edit `chrome-dev-tools-plugin/README.md`:

```markdown
# Chrome DevTools Plugin

Control Chrome DevTools through Claude Code using the MCP Chrome DevTools server.

## Features

- Navigate to URLs
- Take screenshots
- Evaluate JavaScript
- Query DOM elements

## Prerequisites

1. **mcp2rest**: `npm install -g mcp2rest`
2. **Chrome DevTools MCP Server**: Install and configure the Chrome DevTools MCP server
3. **Chrome browser**: Must be running with DevTools protocol enabled

## Installation

Add the marketplace:
```bash
/plugin marketplace add ulasbilgen/mcp-skills-plugins
```

Install the plugin:
```bash
/plugin install chrome-dev-tools-plugin@mcp-skills-plugins
```

## Configuration

1. Start mcp2rest: `mcp2rest start`
2. Configure the Chrome DevTools MCP server in mcp2rest
3. Ensure Chrome is running with remote debugging enabled

## Usage

Use the `@chrome-dev-tools` agent:

"Navigate to example.com and get the page title"
"Take a screenshot of the current page"

## Troubleshooting

**Plugin not working?**
- Ensure mcp2rest is running: `mcp2rest status`
- Verify Chrome DevTools server is loaded: `mcp2rest list`
- Check Chrome is running with debugging enabled

## License

MIT
```

#### 15. Commit and Push

```bash
# Stage your plugin
git add chrome-dev-tools-plugin/
git add .claude-plugin/marketplace.json

# Commit
git commit -m "Add Chrome DevTools plugin

- Controls Chrome via MCP DevTools protocol
- Includes navigation, screenshots, JS eval, DOM queries
- Generated with mcp2scripts from @modelcontextprotocol/server-chrome-devtools
"

# Push to your fork
git push origin add-chrome-devtools-plugin
```

#### 16. Create Pull Request

Go to GitHub and create a pull request:

**Title**: Add Chrome DevTools plugin

**Description**:
```markdown
## Plugin Overview
Chrome DevTools control plugin generated from the MCP Chrome DevTools server.

## Features
- Navigate to URLs
- Take screenshots
- Evaluate JavaScript in browser context
- Query DOM elements

## MCP Server
Based on: `@modelcontextprotocol/server-chrome-devtools`

## Testing Performed
- ✅ Navigation works correctly
- ✅ Screenshots save successfully
- ✅ JavaScript evaluation executes properly
- ✅ DOM queries return expected results
- ✅ All tools integrate correctly with mcp2rest

## Prerequisites
- mcp2rest installed and running
- Chrome with DevTools protocol enabled
- Chrome DevTools MCP server configured
```

## Troubleshooting Common Issues

### Issue: Submodule not initialized

**Symptom**: `/m2s:init` command not available

**Solution**:
```bash
git submodule update --init --recursive
```

### Issue: mcp2rest not connecting to MCP server

**Symptom**: Skills execute but return connection errors

**Solution**:
1. Check mcp2rest status: `mcp2rest status`
2. Verify server is loaded: `mcp2rest list`
3. Restart mcp2rest: `mcp2rest restart`

### Issue: Skills not found after plugin installation

**Symptom**: Agent can't find skills

**Solution**:
1. Verify skills are in the plugin's `skills/` directory
2. Check `SKILL.md` is present
3. Restart Claude Code
4. Reinstall the plugin

### Issue: Marketplace.json syntax error

**Symptom**: Plugin installation fails

**Solution**:
Run validation: `npm run validate`

## Additional Examples

See the repository for more plugin examples as they become available.

## Questions?

Open an issue on the GitHub repository or refer to the [mcp2skill-tools documentation](https://github.com/ulasbilgen/mcp2skill-tools).
