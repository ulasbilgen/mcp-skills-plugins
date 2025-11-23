# Inspection & Debugging Tools

Debug and monitor web applications: screenshots, console logs, network traffic, JavaScript execution.

## Tools in this Group

### take_screenshot.js
Capture visual snapshots of the page or specific elements.

**Usage:**
```bash
node scripts/take_screenshot.js [--format <format>] [--quality <0-100>] [--uid <element-uid>] [--fullPage <bool>] [--filePath <path>]
```

**Parameters:**
- `--format` (optional): Image format (png, jpeg, webp)
- `--quality` (optional): JPEG/WebP quality 0-100
- `--uid` (optional): Capture specific element only
- `--fullPage` (optional): Capture full scrollable page
- `--filePath` (optional): Save to specific path

**Examples:**
```bash
# Full page screenshot
node scripts/take_screenshot.js --format png --fullPage true

# Specific element
node scripts/take_screenshot.js --uid header_0 --filePath header.png

# High quality JPEG
node scripts/take_screenshot.js --format jpeg --quality 95 --filePath page.jpg
```

### list_console_messages.js
List console messages (logs, errors, warnings) from the page.

**Usage:**
```bash
node scripts/list_console_messages.js [--pageSize <num>] [--pageIdx <num>] [--types <json-array>] [--includePreservedMessages <bool>]
```

**Parameters:**
- `--pageSize` (optional): Number of messages per page
- `--pageIdx` (optional): Page number for pagination
- `--types` (optional): Filter by type: `["log", "error", "warning", "info"]`
- `--includePreservedMessages` (optional): Include messages from before navigation

**Examples:**
```bash
# All console messages
node scripts/list_console_messages.js

# Only errors and warnings
node scripts/list_console_messages.js --types '["error", "warning"]'

# First 10 errors
node scripts/list_console_messages.js --types '["error"]' --pageSize 10 --pageIdx 0
```

**Output example:**
```
Message ID: msg_0
Type: error
Text: "Uncaught TypeError: Cannot read property 'value' of null"
Source: https://example.com/app.js:42

Message ID: msg_1
Type: warning
Text: "Cookie 'session' will be rejected..."
```

### get_console_message.js
Get detailed information about a specific console message.

**Usage:**
```bash
node scripts/get_console_message.js --msgid <message-id>
```

**Parameters:**
- `--msgid` (required): Message ID from `list_console_messages.js`

**Example:**
```bash
node scripts/get_console_message.js --msgid msg_0
```

### list_network_requests.js
List network requests made by the page.

**Usage:**
```bash
node scripts/list_network_requests.js [--pageSize <num>] [--pageIdx <num>] [--resourceTypes <json-array>] [--includePreservedRequests <bool>]
```

**Parameters:**
- `--pageSize` (optional): Number of requests per page
- `--pageIdx` (optional): Page number for pagination
- `--resourceTypes` (optional): Filter by type: `["document", "xhr", "fetch", "script", "stylesheet", "image"]`
- `--includePreservedRequests` (optional): Include requests from before navigation

**Examples:**
```bash
# All network requests
node scripts/list_network_requests.js

# Only API calls (XHR/Fetch)
node scripts/list_network_requests.js --resourceTypes '["xhr", "fetch"]'

# Failed image requests
node scripts/list_network_requests.js --resourceTypes '["image"]'
```

**Output example:**
```
Request ID: req_0
Type: fetch
URL: https://api.example.com/users
Status: 200
Method: GET

Request ID: req_1
Type: xhr
URL: https://api.example.com/posts
Status: 404
Method: POST
```

### get_network_request.js
Get detailed information about a specific network request.

**Usage:**
```bash
node scripts/get_network_request.js [--reqid <request-id>]
```

**Parameters:**
- `--reqid` (optional): Request ID from `list_network_requests.js`. If omitted, returns currently selected request in DevTools.

**Example:**
```bash
node scripts/get_network_request.js --reqid req_0
```

**Output includes:** Headers, response body, timing, status code, etc.

### evaluate_script.js
Execute JavaScript code in the page context.

**Usage:**
```bash
node scripts/evaluate_script.js --function "<javascript-function>" [--args <json-array>]
```

**Parameters:**
- `--function` (required): JavaScript function as string
- `--args` (optional): Arguments to pass to the function (JSON array)

**Important:** Return values must be JSON-serializable.

**Examples:**
```bash
# Get page title
node scripts/evaluate_script.js --function "() => document.title"

# Get element count
node scripts/evaluate_script.js --function "() => document.querySelectorAll('button').length"

# With arguments
node scripts/evaluate_script.js --function "(selector) => document.querySelector(selector).textContent" --args '["h1"]'

# Get localStorage
node scripts/evaluate_script.js --function "() => JSON.parse(localStorage.getItem('user'))"

# Check if element exists
node scripts/evaluate_script.js --function "(id) => document.getElementById(id) !== null" --args '["submit-button"]'
```

### handle_dialog.js
Handle browser dialogs (alert, confirm, prompt).

**Usage:**
```bash
node scripts/handle_dialog.js --action <action> [--promptText <text>]
```

**Parameters:**
- `--action` (required): Action to take: "accept" or "dismiss"
- `--promptText` (optional): Text to enter for prompt dialogs

**Examples:**
```bash
# Accept alert
node scripts/handle_dialog.js --action accept

# Dismiss confirm
node scripts/handle_dialog.js --action dismiss

# Answer prompt
node scripts/handle_dialog.js --action accept --promptText "My Answer"
```

**Workflow:**
```bash
# Trigger dialog
node scripts/click.js --uid button_delete

# Handle confirmation
node scripts/handle_dialog.js --action accept
```

### wait_for.js
Wait for specific text to appear on the page.

**Usage:**
```bash
node scripts/wait_for.js --text <text> [--timeout <ms>]
```

**Parameters:**
- `--text` (required): Text to wait for
- `--timeout` (optional): Maximum wait time in milliseconds

**Examples:**
```bash
node scripts/wait_for.js --text "Loading complete"
node scripts/wait_for.js --text "Error" --timeout 5000
node scripts/wait_for.js --text "Dashboard"
```

**Use cases:**
- Wait for page loads
- Wait for AJAX content
- Verify form submissions
- Detect error messages

## Workflows

### Workflow: Debug JavaScript Errors

Identify and analyze JavaScript errors on a page.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Trigger error: Interact with page (click buttons, fill forms)
- [ ] List errors: `node scripts/list_console_messages.js --types '["error"]'`
- [ ] Get error details: `node scripts/get_console_message.js --msgid <error-id>`
- [ ] Take screenshot of error state: `node scripts/take_screenshot.js --filePath error.png`
- [ ] Inspect page state: `node scripts/evaluate_script.js --function "() => document.readyState"`

**Example:**
```bash
node scripts/new_page.js --url https://buggy-app.example.com
node scripts/click.js --uid button_submit

# Check for errors
node scripts/list_console_messages.js --types '["error"]'
# Output shows: msg_0 - "Uncaught TypeError..."

# Get full error details
node scripts/get_console_message.js --msgid msg_0

# Capture error state
node scripts/take_screenshot.js --filePath error-state.png
```

### Workflow: Monitor API Calls

Track and debug API requests.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Trigger API calls: Interact with page
- [ ] List API requests: `node scripts/list_network_requests.js --resourceTypes '["xhr", "fetch"]'`
- [ ] Inspect failed requests: Look for status codes 4xx/5xx
- [ ] Get request details: `node scripts/get_network_request.js --reqid <req-id>`
- [ ] Check response data and headers

**Example:**
```bash
node scripts/new_page.js --url https://app.example.com/dashboard
node scripts/click.js --uid button_load_data

# List all API calls
node scripts/list_network_requests.js --resourceTypes '["xhr", "fetch"]'
# Output shows: req_0 (200), req_1 (404), req_2 (200)

# Inspect the failed request
node scripts/get_network_request.js --reqid req_1
# Shows URL, headers, response body, timing
```

### Workflow: Validate Form Submission

Verify form submission and check for errors.

**Steps:**
- [ ] Open form: `node scripts/new_page.js --url <form-url>`
- [ ] Get form structure: `node scripts/take_snapshot.js`
- [ ] Fill form: `node scripts/fill_form.js --elements <data>`
- [ ] Submit: `node scripts/click.js --uid <submit-uid>`
- [ ] Wait for response: `node scripts/wait_for.js --text "Success"`
- [ ] Check console for errors: `node scripts/list_console_messages.js --types '["error"]'`
- [ ] Check network for failed requests: `node scripts/list_network_requests.js`
- [ ] Capture final state: `node scripts/take_screenshot.js`

**Example:**
```bash
node scripts/new_page.js --url https://example.com/signup
node scripts/take_snapshot.js

node scripts/fill_form.js --elements '[
  {"uid": "input_email", "value": "test@example.com"},
  {"uid": "input_password", "value": "pass123"}
]'

node scripts/click.js --uid button_signup
node scripts/wait_for.js --text "Welcome" --timeout 5000

# Verify no errors occurred
node scripts/list_console_messages.js --types '["error"]'

# Check API response
node scripts/list_network_requests.js --resourceTypes '["fetch"]'
```

### Workflow: Execute Custom Diagnostics

Run JavaScript diagnostics to check page state.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Check document ready: `evaluate_script.js --function "() => document.readyState"`
- [ ] Count elements: `evaluate_script.js --function "() => document.querySelectorAll('.item').length"`
- [ ] Check local storage: `evaluate_script.js --function "() => localStorage"`
- [ ] Verify cookies: `evaluate_script.js --function "() => document.cookie"`
- [ ] Custom checks based on application

**Example:**
```bash
node scripts/new_page.js --url https://app.example.com

# Check if user is logged in
node scripts/evaluate_script.js --function "() => !!localStorage.getItem('authToken')"

# Count loaded items
node scripts/evaluate_script.js --function "() => document.querySelectorAll('.product-card').length"

# Check current route
node scripts/evaluate_script.js --function "() => window.location.pathname"

# Get app version
node scripts/evaluate_script.js --function "() => window.__APP_VERSION__"
```

### Workflow: Visual Regression Testing

Capture screenshots for comparison.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Wait for load: `node scripts/wait_for.js --text "Ready"`
- [ ] Capture baseline: `node scripts/take_screenshot.js --fullPage true --filePath baseline.png`
- [ ] Make changes (or test different branch)
- [ ] Capture new version: `node scripts/take_screenshot.js --fullPage true --filePath current.png`
- [ ] Compare screenshots externally

**Example:**
```bash
# Baseline
node scripts/new_page.js --url https://app.example.com/home
node scripts/wait_for.js --text "Welcome"
node scripts/take_screenshot.js --fullPage true --filePath screenshots/home-baseline.png

# After changes
node scripts/navigate_page.js --url https://app.example.com/home
node scripts/wait_for.js --text "Welcome"
node scripts/take_screenshot.js --fullPage true --filePath screenshots/home-current.png

# Compare with external tool (e.g., pixelmatch, ImageMagick)
```

### Workflow: Dialog Handling

Test workflows with browser dialogs.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Trigger dialog: `node scripts/click.js --uid <button-uid>`
- [ ] Handle dialog: `node scripts/handle_dialog.js --action <accept|dismiss>`
- [ ] Verify result: `node scripts/wait_for.js --text "Confirmed"`

**Example:**
```bash
node scripts/new_page.js --url https://app.example.com/delete-account
node scripts/take_snapshot.js

# Click delete button (triggers confirm dialog)
node scripts/click.js --uid button_delete

# Accept confirmation
node scripts/handle_dialog.js --action accept

# Verify deletion
node scripts/wait_for.js --text "Account deleted"
```

## Common Patterns

### Console Error Detection
```bash
# After any interaction, check for errors
node scripts/click.js --uid button_action
node scripts/list_console_messages.js --types '["error"]'
```

### Network Request Validation
```bash
# Check that API calls succeeded
node scripts/list_network_requests.js --resourceTypes '["fetch"]'
# Look for status codes 200-299
```

### Screenshot Before/After
```bash
# Document state changes
node scripts/take_screenshot.js --filePath before.png
node scripts/click.js --uid button_transform
node scripts/wait_for.js --text "Complete"
node scripts/take_screenshot.js --filePath after.png
```

### JavaScript State Inspection
```bash
# Common state checks
node scripts/evaluate_script.js --function "() => document.readyState"
node scripts/evaluate_script.js --function "() => window.location.href"
node scripts/evaluate_script.js --function "() => localStorage.getItem('user')"
```
