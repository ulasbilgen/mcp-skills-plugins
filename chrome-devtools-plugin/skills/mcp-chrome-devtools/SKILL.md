---
name: mcp-chrome-devtools
description: Automate Chrome browser via DevTools Protocol. Navigate pages, interact with elements, inspect network/console, analyze performance, and capture screenshots for web testing and automation tasks.
---

# Chrome DevTools Browser Automation

Control Chrome browser programmatically using the Chrome DevTools Protocol. This skill enables comprehensive browser automation including page navigation, element interaction, debugging, and performance analysis.

## Prerequisites

- **Node.js 18+** installed
- **mcp2rest** running on `http://localhost:28888`
- **chrome-devtools** server loaded in mcp2rest
- **Dependencies installed**: Run `npm install` in the `scripts/` directory (already done)

Verify setup:
```bash
curl http://localhost:28888/servers | grep chrome-devtools
```

## Quick Start

Open a page, get its structure, and interact with elements:

```bash
# 1. Open a new page
node scripts/new_page.js --url https://github.com/login

# 2. Get page structure with element UIDs
node scripts/take_snapshot.js

# Output shows elements like:
# TextField "Username or email" [uid: input_0]
# TextField "Password" [uid: input_1]
# Button "Sign in" [uid: button_0]

# 3. Fill the login form
node scripts/fill.js --uid input_0 --value "myusername"
node scripts/fill.js --uid input_1 --value "mypassword"

# 4. Click sign in
node scripts/click.js --uid button_0

# 5. Wait for dashboard to load
node scripts/wait_for.js --text "Dashboard"
```

## Tool Groups

This skill provides **26 tools** organized into **4 groups**:

### 1. Page Management (6 tools)
Core page lifecycle: create, navigate, switch between, and manage browser pages.

**See:** [workflows/page-management.md](workflows/page-management.md) for detailed workflows

**Quick reference:**
- `new_page.js` - Create new browser page
- `list_pages.js` - List all open pages
- `select_page.js` - Switch to a different page
- `close_page.js` - Close a page by index
- `navigate_page.js` - Navigate to URL
- `resize_page.js` - Set browser window size

### 2. Element Interaction (8 tools)
Interact with page elements: click, fill forms, drag, upload files, keyboard input.

**See:** [workflows/element-interaction.md](workflows/element-interaction.md) for detailed workflows

**Quick reference:**
- `take_snapshot.js` - **Start here**: Get page structure with UIDs
- `click.js` - Click elements
- `fill.js` - Fill single form field
- `fill_form.js` - Fill multiple fields at once
- `hover.js` - Hover over elements
- `drag.js` - Drag and drop
- `press_key.js` - Keyboard shortcuts
- `upload_file.js` - Upload files

### 3. Inspection & Debugging (8 tools)
Debug and monitor: screenshots, console logs, network traffic, JavaScript execution.

**See:** [workflows/inspection-debugging.md](workflows/inspection-debugging.md) for detailed workflows

**Quick reference:**
- `take_screenshot.js` - Capture visual snapshots
- `list_console_messages.js` - Get console logs
- `get_console_message.js` - Get specific log
- `list_network_requests.js` - Monitor network
- `get_network_request.js` - Get specific request
- `evaluate_script.js` - Execute JavaScript
- `handle_dialog.js` - Handle alerts/confirms
- `wait_for.js` - Wait for text to appear

### 4. Performance Analysis (4 tools)
Measure and analyze page performance, Core Web Vitals, network conditions.

**See:** [workflows/performance-analysis.md](workflows/performance-analysis.md) for detailed workflows

**Quick reference:**
- `performance_start_trace.js` - Start recording
- `performance_stop_trace.js` - Stop recording
- `performance_analyze_insight.js` - Analyze insights
- `emulate.js` - Emulate network/CPU throttling

## Common Workflows

### Workflow 1: Automated Form Submission

**Use case:** Fill and submit web forms automatically

- [ ] Open target page: `node scripts/new_page.js --url <form-url>`
- [ ] Get element UIDs: `node scripts/take_snapshot.js`
- [ ] Identify form field UIDs from snapshot output
- [ ] Fill each field: `node scripts/fill.js --uid <uid> --value <value>`
- [ ] Submit form: `node scripts/click.js --uid <submit-button-uid>`
- [ ] Verify success: `node scripts/wait_for.js --text "Success"`
- [ ] Capture result: `node scripts/take_screenshot.js`

**Example:**
```bash
# Contact form submission
node scripts/new_page.js --url https://example.com/contact
node scripts/take_snapshot.js
# Snapshot shows: input_0 (name), input_1 (email), textarea_0 (message), button_0 (submit)
node scripts/fill.js --uid input_0 --value "John Doe"
node scripts/fill.js --uid input_1 --value "john@example.com"
node scripts/fill.js --uid textarea_0 --value "Hello, I'd like to inquire about..."
node scripts/click.js --uid button_0
node scripts/wait_for.js --text "Thank you"
```

### Workflow 2: Multi-Page Navigation Testing

**Use case:** Test navigation flows across multiple pages

- [ ] Open first page: `node scripts/new_page.js --url <url1>`
- [ ] Open second page in new tab: `node scripts/new_page.js --url <url2>`
- [ ] List pages: `node scripts/list_pages.js`
- [ ] Switch to page 0: `node scripts/select_page.js --pageIdx 0`
- [ ] Interact with page 0: `node scripts/take_snapshot.js`
- [ ] Switch to page 1: `node scripts/select_page.js --pageIdx 1`
- [ ] Interact with page 1: `node scripts/take_snapshot.js`
- [ ] Close page when done: `node scripts/close_page.js --pageIdx 1`

### Workflow 3: Debugging Web Application

**Use case:** Inspect console errors and network failures

- [ ] Open application: `node scripts/new_page.js --url <app-url>`
- [ ] Navigate to problem area: `node scripts/navigate_page.js --url <problem-url>`
- [ ] Check console messages: `node scripts/list_console_messages.js --types '["error", "warning"]'`
- [ ] Check failed requests: `node scripts/list_network_requests.js`
- [ ] Get specific error details: `node scripts/get_console_message.js --msgid <id>`
- [ ] Capture screenshot: `node scripts/take_screenshot.js --filePath debug.png`
- [ ] Run diagnostic script: `node scripts/evaluate_script.js --function "() => document.readyState"`

### Workflow 4: Performance Testing

**Use case:** Measure Core Web Vitals and identify bottlenecks

- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Start trace with reload: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Wait for trace to complete (autoStop handles this)
- [ ] Review insights in output (CWV scores, performance issues)
- [ ] Analyze specific insight: `node scripts/performance_analyze_insight.js --insightSetId <id> --insightName <name>`
- [ ] Test with throttling: `node scripts/emulate.js --networkConditions '{"downloadThroughput": 50000}'`
- [ ] Run trace again to compare results

## State Persistence

**Important:** This server maintains state between tool calls:

- **Current page context**: `select_page.js` changes which page subsequent tools operate on
- **Page lifecycle**: Opened pages remain open until explicitly closed
- **Console/Network logs**: Accumulate since last navigation
- **State persists** until mcp2rest restarts

**Example of state:**
```bash
# Page 0 becomes the context
node scripts/new_page.js --url https://example.com

# All subsequent commands operate on page 0
node scripts/take_snapshot.js  # snapshots page 0
node scripts/click.js --uid button_0  # clicks on page 0

# Open page 1
node scripts/new_page.js --url https://another.com
# Now page 1 is the context

# Switch back to page 0
node scripts/select_page.js --pageIdx 0
# Now operating on page 0 again
```

## Reference Documentation

- **Complete tool listing:** [reference/all-tools.md](reference/all-tools.md)
- **Troubleshooting guide:** [reference/troubleshooting.md](reference/troubleshooting.md)
- **Advanced examples:** [reference/advanced-examples.md](reference/advanced-examples.md)

## Getting Help

Each script supports `--help`:
```bash
node scripts/<tool-name>.js --help
```

For connection issues, check mcp2rest status:
```bash
curl http://localhost:28888/health
curl http://localhost:28888/servers
```
