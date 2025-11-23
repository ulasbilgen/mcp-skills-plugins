# Chrome DevTools Browser Automation Plugin

Browser automation via Chrome DevTools Protocol. Control Chrome programmatically, interact with pages, debug applications, and analyze performance using mcp2rest.

## Overview

This plugin provides comprehensive browser automation capabilities through the chrome-devtools MCP server integration. Automate web tasks, test applications, fill forms, debug frontend issues, and measure performance using the Chrome DevTools Protocol.

**Key Features:**
- **26 automation tools** organized into 4 functional groups
- **Browser control**: Navigate, click, fill forms, drag and drop
- **Debugging**: Console logs, network monitoring, JavaScript execution
- **Performance testing**: Core Web Vitals, throttling, performance insights
- **Visual testing**: Screenshots and page structure snapshots

**Generated from MCP server:** chrome-devtools-mcp@1.0.2

## Prerequisites

Before using this plugin, ensure you have:

- **Claude Code** installed and running
- **Node.js** >= 18.0.0
- **mcp2rest** installed and running
- **chrome-devtools MCP server** configured in mcp2rest

### Installing mcp2rest

If you haven't already, install mcp2rest globally:

```bash
npm install -g mcp2rest
mcp2rest start
```

Verify mcp2rest is running:
```bash
curl http://localhost:28888/health
```

### Configuring the MCP Server

Add the chrome-devtools server to mcp2rest:

```bash
# Add the MCP server with specific version
mcp2rest add chrome-devtools chrome-devtools-mcp@1.0.2

# Verify it's loaded and connected
mcp2rest list
```

You should see chrome-devtools in the list with status "connected".

## Installation

### From Marketplace

```bash
# Add the marketplace (if not already added)
/plugin marketplace add ulasbilgen/mcp-skills-plugins

# Install this plugin
/plugin install chrome-devtools-plugin@mcp-skills-plugins
```

**Restart Claude Code** to activate the plugin and agent.

### Local Development

For local testing or development:

```bash
# Clone the marketplace repository
git clone https://github.com/ulasbilgen/mcp-skills-plugins.git

# Add as local marketplace
/plugin marketplace add ./mcp-skills-plugins

# Install the plugin
/plugin install chrome-devtools-plugin@mcp-skills-plugins
```

Restart Claude Code to complete installation.

## Quick Start

After installation, try this simple automation:

```bash
# 1. Open a web page
node skills/mcp-chrome-devtools/scripts/new_page.js --url https://github.com/login

# 2. Get the page structure with element identifiers
node skills/mcp-chrome-devtools/scripts/take_snapshot.js

# Output shows interactive elements with UIDs:
# TextField "Username or email" [uid: input_0]
# TextField "Password" [uid: input_1]
# Button "Sign in" [uid: button_0]

# 3. Fill the login form
node skills/mcp-chrome-devtools/scripts/fill.js --uid input_0 --value "myusername"
node skills/mcp-chrome-devtools/scripts/fill.js --uid input_1 --value "mypassword"

# 4. Click sign in
node skills/mcp-chrome-devtools/scripts/click.js --uid button_0

# 5. Wait for the dashboard to load
node skills/mcp-chrome-devtools/scripts/wait_for.js --text "Dashboard"
```

## Available Capabilities

This plugin provides 26 automation tools organized into 4 groups:

### 1. Page Management (6 tools)
Manage browser pages and navigation:
- Create new pages/tabs
- Navigate to URLs
- Switch between multiple pages
- Close pages
- Resize viewport for responsive testing

### 2. Element Interaction (8 tools)
Interact with web page elements:
- **Critical**: `take_snapshot.js` - Get page structure with element UIDs
- Click buttons and links
- Fill form fields (single or bulk)
- Hover over elements
- Drag and drop
- Keyboard input
- Upload files

### 3. Inspection & Debugging (8 tools)
Debug and monitor web applications:
- Capture screenshots (full page or specific elements)
- Monitor console logs and errors
- Track network requests and responses
- Execute JavaScript in page context
- Handle browser dialogs (alerts, confirms, prompts)
- Wait for content to appear

### 4. Performance Analysis (4 tools)
Measure and analyze web performance:
- Record performance traces
- Measure Core Web Vitals (LCP, CLS, INP)
- Analyze performance insights
- Emulate network throttling and CPU slowdown

## Using the Agent

After installation, the `chrome-devtools` agent will be available in Claude Code.

### View Available Agents

```bash
/agents
```

You should see the chrome-devtools agent in the list.

### Invoke the Agent Explicitly

```
> Use the chrome-devtools agent to open example.com and take a screenshot

> Have the chrome-devtools agent fill out the contact form on mysite.com

> Ask the chrome-devtools agent to measure the performance of my landing page
```

### Automatic Invocation

Claude will automatically invoke the chrome-devtools agent when you request browser automation tasks:

```
> Automate filling out the login form on github.com

> Check the console errors on my website

> Measure the Core Web Vitals for this URL

> Take a screenshot of the homepage
```

## Documentation

Complete skill documentation is available within the plugin:

- **Main documentation**: `skills/mcp-chrome-devtools/SKILL.md`
  - Prerequisites and setup
  - Quick start guide
  - Tool groups overview
  - Common workflows
  - State management

- **Detailed workflows**: `skills/mcp-chrome-devtools/workflows/`
  - `page-management.md` - Page lifecycle and navigation
  - `element-interaction.md` - Forms, clicks, drag-and-drop
  - `inspection-debugging.md` - Debugging and monitoring
  - `performance-analysis.md` - Performance testing and Core Web Vitals

- **Reference documentation**: `skills/mcp-chrome-devtools/reference/`
  - `all-tools.md` - Complete tool listing with examples
  - `troubleshooting.md` - Common issues and solutions
  - `advanced-examples.md` - Complex real-world workflows

## Common Use Cases

### Form Automation
```
> Fill out the contact form on example.com with name "John Doe" and email "john@example.com"
```

### Web Application Testing
```
> Test the login flow on my staging site and verify it redirects to the dashboard
```

### Performance Testing
```
> Measure the Core Web Vitals for my landing page and test it under Slow 3G conditions
```

### Debugging
```
> Check if there are any console errors on example.com and list any failed network requests
```

### Visual Testing
```
> Take full-page screenshots of my homepage at desktop, tablet, and mobile sizes
```

## Troubleshooting

### mcp2rest Connection Issues

If tools fail with connection errors:

```bash
# Check if mcp2rest is running
curl http://localhost:28888/health

# Expected: {"status":"ok"}

# Verify chrome-devtools server is loaded
curl http://localhost:28888/servers

# Should show chrome-devtools with status "connected"

# If server is disconnected, restart mcp2rest
mcp2rest restart
```

### Script Execution Issues

If scripts fail to run:

```bash
# Verify Node.js version (need 18+)
node --version

# Check if script dependencies are installed
ls chrome-devtools-plugin/skills/mcp-chrome-devtools/scripts/node_modules/

# If missing, install dependencies
cd chrome-devtools-plugin/skills/mcp-chrome-devtools/scripts
npm install
```

### Element Not Found Errors

If click or fill operations fail with "element not found":

1. Element UIDs change dynamically - always take a fresh snapshot before interacting
2. Ensure the page has finished loading - use `wait_for.js` first
3. Check if the element is visible (not hidden by CSS or JavaScript)

```bash
# Correct workflow
node scripts/take_snapshot.js       # Get fresh UIDs
node scripts/click.js --uid button_0  # Use UID from snapshot
```

### Agent Not Available

If the chrome-devtools agent doesn't appear:

1. Verify plugin is installed: `/plugin` → "Manage Plugins"
2. Restart Claude Code after installation
3. Check `/agents` to see if the agent is listed
4. Ensure mcp2rest and chrome-devtools server are running

For more troubleshooting information, see `skills/mcp-chrome-devtools/reference/troubleshooting.md`.

## Contributing

Found an issue or have improvements for this plugin?

1. **Check existing issues**: https://github.com/ulasbilgen/mcp-skills-plugins/issues
2. **Submit bug reports**: Include reproduction steps and error messages
3. **Propose enhancements**: Open a pull request with your changes

Please follow the contribution guidelines in the marketplace repository.

## Version Information

- **Plugin version:** 0.5.0
- **MCP server:** chrome-devtools-mcp@1.0.2
- **Generated with:** [mcp2skill-tools](https://github.com/ulasbilgen/mcp2skill-tools)
- **Requires:** mcp2rest for MCP server communication

## License

MIT License - See repository for details.

## Links

- **Marketplace**: https://github.com/ulasbilgen/mcp-skills-plugins
- **MCP Server**: chrome-devtools-mcp (Chrome DevTools Protocol integration)
- **mcp2rest**: https://www.npmjs.com/package/mcp2rest
- **mcp2scripts**: https://www.npmjs.com/package/mcp2scripts

## Support

For issues and questions:
- Plugin issues: Open an issue in the marketplace repository
- MCP server issues: Check the chrome-devtools-mcp documentation
- mcp2rest issues: See mcp2rest documentation

---

**Note**: This plugin requires an active mcp2rest server with the chrome-devtools MCP server loaded. Ensure both are running before using the automation tools.
