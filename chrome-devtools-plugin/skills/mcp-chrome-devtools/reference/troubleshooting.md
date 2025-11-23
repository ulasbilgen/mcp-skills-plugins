# Troubleshooting Guide

Common issues and solutions when using the chrome-devtools skill.

## Connection Issues

### mcp2rest Not Running

**Symptom:** Connection errors or "Cannot connect to mcp2rest" messages.

**Solution:**
```bash
# Check if mcp2rest is running
curl http://localhost:28888/health

# If not running, start it
mcp2rest start

# Verify it's running
curl http://localhost:28888/servers
```

### chrome-devtools Server Not Loaded

**Symptom:** "Server 'chrome-devtools' not found" error.

**Solution:**
```bash
# List loaded servers
curl http://localhost:28888/servers

# If chrome-devtools is not listed, add it
mcp2rest add chrome-devtools chrome-devtools-mcp@latest

# Verify it's loaded and connected
curl http://localhost:28888/servers | grep chrome-devtools
```

### Server Disconnected

**Symptom:** Server shows as "disconnected" in server list.

**Solution:**
```bash
# Restart mcp2rest
mcp2rest restart

# Or restart specific server
mcp2rest restart chrome-devtools

# Check status
curl http://localhost:28888/servers
```

## Script Execution Issues

### Dependencies Not Installed

**Symptom:** `Error: Cannot find module 'axios'` or `Cannot find module 'commander'`

**Solution:**
```bash
cd .claude/skills/mcp-chrome-devtools/scripts
npm install
```

### Permission Denied

**Symptom:** `EACCES: permission denied` when running scripts.

**Solution:**
```bash
# Ensure scripts are executable
chmod +x scripts/*.js

# Or run with node explicitly
node scripts/tool_name.js --help
```

### Wrong Node.js Version

**Symptom:** Syntax errors or compatibility issues.

**Solution:**
```bash
# Check Node.js version (need 18+)
node --version

# Update Node.js if needed
nvm install 18
nvm use 18
```

## Element Interaction Issues

### Element UID Not Found

**Symptom:** `Element with UID 'button_0' not found`

**Cause:** UIDs change when page content changes.

**Solution:**
```bash
# Always take a fresh snapshot before interacting
node scripts/take_snapshot.js

# Use the UIDs from the latest snapshot
node scripts/click.js --uid <actual-uid-from-snapshot>
```

### Element Not Clickable

**Symptom:** Click doesn't work or element is not visible.

**Solution:**
```bash
# Wait for page to load first
node scripts/wait_for.js --text "Expected content"

# Then take snapshot and interact
node scripts/take_snapshot.js
node scripts/click.js --uid <uid>

# If element is hidden, check with evaluate_script
node scripts/evaluate_script.js --function "() => document.querySelector('.element').style.display"
```

### Form Fill Not Working

**Symptom:** Form fields not accepting input.

**Solution:**
```bash
# Ensure element is a form field
node scripts/take_snapshot.js  # Check element type

# Try clicking field first to focus
node scripts/click.js --uid input_0
node scripts/fill.js --uid input_0 --value "text"

# For complex inputs, use JavaScript
node scripts/evaluate_script.js --function "(val) => document.querySelector('#input').value = val" --args '["text"]'
```

## Page State Issues

### Wrong Page Selected

**Symptom:** Commands affect wrong page.

**Solution:**
```bash
# Always check which pages are open
node scripts/list_pages.js

# Select the correct page
node scripts/select_page.js --pageIdx <correct-index>

# Verify with snapshot
node scripts/take_snapshot.js
```

### Page Not Loading

**Symptom:** Timeout errors or page stuck loading.

**Solution:**
```bash
# Increase timeout
node scripts/new_page.js --url https://slow-site.com --timeout 60000

# Check network issues
node scripts/list_network_requests.js

# Check console for errors
node scripts/list_console_messages.js --types '["error"]'
```

### Cannot Close Last Page

**Symptom:** `Cannot close the last open page` error.

**Expected behavior:** Chrome DevTools requires at least one page to remain open.

**Solution:**
```bash
# Open a new page first, then close the old one
node scripts/new_page.js --url about:blank
node scripts/close_page.js --pageIdx 0
```

## Performance Tracing Issues

### Trace Already Running

**Symptom:** `Performance trace already active` error.

**Solution:**
```bash
# Stop the existing trace first
node scripts/performance_stop_trace.js

# Then start a new trace
node scripts/performance_start_trace.js --reload true --autoStop true
```

### Insight Set ID Not Found

**Symptom:** `Insight set 'set_xyz' not found` error.

**Cause:** Using wrong insight set ID from previous trace.

**Solution:**
```bash
# Run a fresh trace and use the insight set ID from its output
node scripts/performance_start_trace.js --reload true --autoStop true

# Output shows: "Insight Set ID: set_abc123"
# Use that ID:
node scripts/performance_analyze_insight.js --insightSetId set_abc123 --insightName "LargestContentfulPaint"
```

### Throttling Not Resetting

**Symptom:** Page still slow after removing throttling.

**Solution:**
```bash
# Explicitly reset emulation
node scripts/emulate.js

# Reload page
node scripts/navigate_page.js --type reload

# Verify network is normal
node scripts/list_network_requests.js
```

## Dialog Handling Issues

### Dialog Not Handled

**Symptom:** Page stuck after alert/confirm/prompt appears.

**Solution:**
```bash
# Handle the dialog immediately after triggering action
node scripts/click.js --uid button_delete
node scripts/handle_dialog.js --action accept

# For prompt dialogs, provide text
node scripts/handle_dialog.js --action accept --promptText "Answer"
```

### No Dialog to Handle

**Symptom:** `No active dialog` error.

**Cause:** Dialog already dismissed or never appeared.

**Solution:**
```bash
# Check if action actually triggers a dialog
node scripts/evaluate_script.js --function "() => alert('test')"
node scripts/handle_dialog.js --action accept

# Some "dialogs" are HTML modals, not browser dialogs
# Use snapshot and click for HTML modals
node scripts/take_snapshot.js
node scripts/click.js --uid button_modal_close
```

## Network and Console Monitoring Issues

### No Messages/Requests Listed

**Symptom:** `list_console_messages` or `list_network_requests` returns empty.

**Cause:** Messages/requests cleared by navigation.

**Solution:**
```bash
# Console/network logs are cleared on navigation
# Monitor before navigating away

# For preserved messages across navigations:
node scripts/list_console_messages.js --includePreservedMessages true
node scripts/list_network_requests.js --includePreservedRequests true
```

### Request ID Not Found

**Symptom:** `Request 'req_0' not found` error.

**Cause:** Using old request ID after navigation.

**Solution:**
```bash
# Get fresh request list after each navigation
node scripts/list_network_requests.js

# Use request IDs from latest list
node scripts/get_network_request.js --reqid <latest-id>
```

## JavaScript Execution Issues

### evaluate_script Returns Error

**Symptom:** JavaScript errors when using `evaluate_script.js`

**Solution:**
```bash
# Ensure function is valid JavaScript
node scripts/evaluate_script.js --function "() => { return document.title; }"

# For arrow functions, use concise syntax
node scripts/evaluate_script.js --function "() => document.title"

# Ensure return value is JSON-serializable
# BAD: returns DOM element (not serializable)
node scripts/evaluate_script.js --function "() => document.querySelector('div')"

# GOOD: returns element properties
node scripts/evaluate_script.js --function "() => document.querySelector('div').textContent"
```

### Cannot Access Variables

**Symptom:** `ReferenceError: variable is not defined`

**Cause:** Variable doesn't exist in page context.

**Solution:**
```bash
# Check if variable exists first
node scripts/evaluate_script.js --function "() => typeof window.myVar !== 'undefined'"

# If it exists, access it
node scripts/evaluate_script.js --function "() => window.myVar"

# For localStorage/sessionStorage
node scripts/evaluate_script.js --function "() => localStorage.getItem('key')"
```

## File Upload Issues

### Upload File Path Invalid

**Symptom:** `File not found` or `ENOENT` error.

**Cause:** Using relative path instead of absolute path.

**Solution:**
```bash
# WRONG: relative path
node scripts/upload_file.js --uid input_file --filePath ./file.pdf

# RIGHT: absolute path
node scripts/upload_file.js --uid input_file --filePath /Users/me/documents/file.pdf

# Get absolute path
realpath ./file.pdf
```

### File Input Not Accepting File

**Symptom:** Upload completes but file not selected.

**Cause:** Wrong element UID or element not a file input.

**Solution:**
```bash
# Verify element is a file input
node scripts/take_snapshot.js
# Look for: FileInput "Upload" [uid: input_file_0]

# Ensure UID is correct
node scripts/upload_file.js --uid input_file_0 --filePath /path/to/file
```

## General Debugging

### Enable Verbose Logging

```bash
# Take verbose snapshot
node scripts/take_snapshot.js --verbose true

# Check detailed network requests
node scripts/list_network_requests.js --pageSize 100

# Get full console output
node scripts/list_console_messages.js --pageSize 100
```

### Check Server Logs

```bash
# View mcp2rest logs
mcp2rest logs

# Check for errors in server communication
mcp2rest logs --follow
```

### Verify Skill Installation

```bash
# Check skill exists
ls -la .claude/skills/mcp-chrome-devtools/

# Verify scripts
ls .claude/skills/mcp-chrome-devtools/scripts/

# Check dependencies
cd .claude/skills/mcp-chrome-devtools/scripts && npm list
```

## Getting More Help

If issues persist:

1. **Check mcp2rest status:**
   ```bash
   curl http://localhost:28888/health
   curl http://localhost:28888/servers
   ```

2. **Test with simple operations:**
   ```bash
   node scripts/new_page.js --url https://example.com
   node scripts/take_snapshot.js
   ```

3. **Review script help:**
   ```bash
   node scripts/<tool-name>.js --help
   ```

4. **Check Node.js and dependencies:**
   ```bash
   node --version  # Should be 18+
   npm list        # In scripts/ directory
   ```
