# Complete Tool Reference

Alphabetical listing of all 26 tools with parameters and examples.

## click.js
Click on an element by its UID.

**Parameters:**
- `--uid` (required): Element UID from snapshot
- `--dblClick` (optional): Perform double-click (true/false)

**Examples:**
```bash
node scripts/click.js --uid button_0
node scripts/click.js --uid link_submit --dblClick true
```

## close_page.js
Close a page by its index. Cannot close the last open page.

**Parameters:**
- `--pageIdx` (required): Zero-based page index

**Example:**
```bash
node scripts/close_page.js --pageIdx 1
```

## drag.js
Drag an element onto another element.

**Parameters:**
- `--from-uid` (required): UID of element to drag
- `--to-uid` (required): UID of drop target

**Example:**
```bash
node scripts/drag.js --from-uid item_3 --to-uid dropzone_0
```

## emulate.js
Emulate network conditions and CPU throttling.

**Parameters:**
- `--networkConditions` (optional): Network throttling JSON config
- `--cpuThrottlingRate` (optional): CPU slowdown multiplier

**Examples:**
```bash
node scripts/emulate.js --networkConditions '{"downloadThroughput": 50000, "uploadThroughput": 20000, "latency": 100}'
node scripts/emulate.js --cpuThrottlingRate 4
node scripts/emulate.js  # Reset all throttling
```

## evaluate_script.js
Execute JavaScript in the page context. Return values must be JSON-serializable.

**Parameters:**
- `--function` (required): JavaScript function as string
- `--args` (optional): Function arguments as JSON array

**Examples:**
```bash
node scripts/evaluate_script.js --function "() => document.title"
node scripts/evaluate_script.js --function "(selector) => document.querySelector(selector).textContent" --args '["h1"]'
```

## fill.js
Fill a single form field (input, textarea, or select).

**Parameters:**
- `--uid` (required): Element UID from snapshot
- `--value` (required): Text to enter or option to select

**Examples:**
```bash
node scripts/fill.js --uid input_0 --value "user@example.com"
node scripts/fill.js --uid textarea_msg --value "Multi-line text"
```

## fill_form.js
Fill multiple form fields at once.

**Parameters:**
- `--elements` (required): JSON array of `{uid, value}` objects

**Example:**
```bash
node scripts/fill_form.js --elements '[{"uid": "input_0", "value": "John"}, {"uid": "input_1", "value": "Doe"}]'
```

## get_console_message.js
Get detailed information about a specific console message.

**Parameters:**
- `--msgid` (required): Message ID from list_console_messages

**Example:**
```bash
node scripts/get_console_message.js --msgid msg_0
```

## get_network_request.js
Get detailed information about a network request.

**Parameters:**
- `--reqid` (optional): Request ID from list_network_requests. If omitted, returns currently selected request.

**Example:**
```bash
node scripts/get_network_request.js --reqid req_0
node scripts/get_network_request.js  # Get currently selected request
```

## handle_dialog.js
Handle browser dialogs (alert, confirm, prompt).

**Parameters:**
- `--action` (required): "accept" or "dismiss"
- `--promptText` (optional): Text for prompt dialogs

**Examples:**
```bash
node scripts/handle_dialog.js --action accept
node scripts/handle_dialog.js --action accept --promptText "My answer"
```

## hover.js
Hover over an element.

**Parameters:**
- `--uid` (required): Element UID from snapshot

**Example:**
```bash
node scripts/hover.js --uid button_info
```

## list_console_messages.js
List console messages from the page.

**Parameters:**
- `--pageSize` (optional): Messages per page
- `--pageIdx` (optional): Page number
- `--types` (optional): Filter by type: `["log", "error", "warning", "info"]`
- `--includePreservedMessages` (optional): Include messages from before navigation

**Examples:**
```bash
node scripts/list_console_messages.js
node scripts/list_console_messages.js --types '["error", "warning"]'
```

## list_network_requests.js
List network requests made by the page.

**Parameters:**
- `--pageSize` (optional): Requests per page
- `--pageIdx` (optional): Page number
- `--resourceTypes` (optional): Filter by type: `["document", "xhr", "fetch", "script", "stylesheet", "image"]`
- `--includePreservedRequests` (optional): Include requests from before navigation

**Examples:**
```bash
node scripts/list_network_requests.js
node scripts/list_network_requests.js --resourceTypes '["xhr", "fetch"]'
```

## list_pages.js
List all currently open pages with their indices.

**Usage:**
```bash
node scripts/list_pages.js
```

**Output example:**
```
Page 0: https://example.com (selected)
Page 1: https://github.com
```

## navigate_page.js
Navigate the currently selected page to a URL.

**Parameters:**
- `--url` (optional): URL to navigate to
- `--type` (optional): Navigation type (e.g., "reload")
- `--ignoreCache` (optional): Ignore cache (true/false)
- `--timeout` (optional): Navigation timeout in milliseconds

**Examples:**
```bash
node scripts/navigate_page.js --url https://example.com
node scripts/navigate_page.js --type reload
```

## new_page.js
Create a new browser page.

**Parameters:**
- `--url` (required): URL to navigate to
- `--timeout` (optional): Navigation timeout in milliseconds

**Examples:**
```bash
node scripts/new_page.js --url https://github.com
node scripts/new_page.js --url https://example.com --timeout 30000
```

## performance_analyze_insight.js
Get detailed information about a specific performance insight.

**Parameters:**
- `--insightSetId` (required): Insight set ID from trace results
- `--insightName` (required): Name of specific insight

**Example:**
```bash
node scripts/performance_analyze_insight.js --insightSetId set_0 --insightName "LargestContentfulPaint"
```

**Common insight names:**
- `LargestContentfulPaint`
- `CumulativeLayoutShift`
- `InteractionToNextPaint`
- `RenderBlocking`
- `ThirdParties`

## performance_start_trace.js
Start performance trace recording.

**Parameters:**
- `--reload` (required): Reload page before tracing (true/false)
- `--autoStop` (required): Auto-stop when load completes (true/false)

**Examples:**
```bash
node scripts/performance_start_trace.js --reload true --autoStop true
node scripts/performance_start_trace.js --reload false --autoStop false
```

## performance_stop_trace.js
Stop active performance trace recording.

**Usage:**
```bash
node scripts/performance_stop_trace.js
```

## press_key.js
Press keyboard keys or key combinations.

**Parameters:**
- `--key` (required): Key name or combination

**Examples:**
```bash
node scripts/press_key.js --key "Enter"
node scripts/press_key.js --key "Tab"
node scripts/press_key.js --key "Control+A"
node scripts/press_key.js --key "Meta+S"
```

**Common keys:**
- Enter, Tab, Escape, Space
- ArrowUp, ArrowDown, ArrowLeft, ArrowRight
- Control+<key>, Meta+<key>, Alt+<key>, Shift+<key>

## resize_page.js
Resize the browser window.

**Parameters:**
- `--width` (required): Window width in pixels
- `--height` (required): Window height in pixels

**Examples:**
```bash
node scripts/resize_page.js --width 1920 --height 1080
node scripts/resize_page.js --width 375 --height 667  # iPhone SE
```

**Common viewport sizes:**
- Desktop: 1920×1080, 1366×768
- Tablet: 768×1024 (iPad), 800×1280
- Mobile: 375×667 (iPhone SE), 414×896 (iPhone XR)

## select_page.js
Switch context to a different page.

**Parameters:**
- `--pageIdx` (required): Zero-based page index

**Example:**
```bash
node scripts/select_page.js --pageIdx 0
```

## take_screenshot.js
Capture visual snapshots of page or elements.

**Parameters:**
- `--format` (optional): Image format (png, jpeg, webp)
- `--quality` (optional): JPEG/WebP quality 0-100
- `--uid` (optional): Capture specific element only
- `--fullPage` (optional): Capture full scrollable page
- `--filePath` (optional): Save to specific path

**Examples:**
```bash
node scripts/take_screenshot.js --format png --fullPage true
node scripts/take_screenshot.js --uid header_0 --filePath header.png
node scripts/take_screenshot.js --format jpeg --quality 95
```

## take_snapshot.js
Get text snapshot of page with element UIDs. **Always use this before interacting with elements.**

**Parameters:**
- `--verbose` (optional): Include more details
- `--filePath` (optional): Save snapshot to file

**Examples:**
```bash
node scripts/take_snapshot.js
node scripts/take_snapshot.js --verbose true --filePath snapshot.txt
```

## upload_file.js
Upload a file through a file input element.

**Parameters:**
- `--uid` (required): UID of file input element
- `--filePath` (required): Absolute path to file

**Example:**
```bash
node scripts/upload_file.js --uid input_file_0 --filePath /Users/me/documents/resume.pdf
```

**Important:** File path must be absolute.

## wait_for.js
Wait for specific text to appear on the page.

**Parameters:**
- `--text` (required): Text to wait for
- `--timeout` (optional): Maximum wait time in milliseconds

**Examples:**
```bash
node scripts/wait_for.js --text "Loading complete"
node scripts/wait_for.js --text "Error" --timeout 5000
```

**Use cases:**
- Wait for page loads
- Wait for AJAX content
- Verify form submissions
- Detect error messages
