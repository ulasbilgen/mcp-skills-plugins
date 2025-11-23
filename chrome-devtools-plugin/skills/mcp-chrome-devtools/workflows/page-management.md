# Page Management Tools

Manage browser pages: create, navigate, switch between, resize, and close pages.

## Tools in this Group

### new_page.js
Create a new browser page (tab).

**Usage:**
```bash
node scripts/new_page.js --url <url> [--timeout <ms>]
```

**Parameters:**
- `--url` (required): URL to navigate to
- `--timeout` (optional): Navigation timeout in milliseconds

**Example:**
```bash
node scripts/new_page.js --url https://github.com
node scripts/new_page.js --url https://example.com --timeout 30000
```

### list_pages.js
List all currently open pages with their indices.

**Usage:**
```bash
node scripts/list_pages.js
```

**Output example:**
```
Page 0: https://github.com (selected)
Page 1: https://example.com
Page 2: https://google.com
```

### select_page.js
Switch context to a different page. All subsequent commands operate on the selected page.

**Usage:**
```bash
node scripts/select_page.js --pageIdx <index>
```

**Parameters:**
- `--pageIdx` (required): Zero-based page index from list_pages

**Example:**
```bash
node scripts/select_page.js --pageIdx 0  # Switch to first page
node scripts/select_page.js --pageIdx 2  # Switch to third page
```

### close_page.js
Close a page by its index. Cannot close the last remaining page.

**Usage:**
```bash
node scripts/close_page.js --pageIdx <index>
```

**Parameters:**
- `--pageIdx` (required): Zero-based page index to close

**Example:**
```bash
node scripts/close_page.js --pageIdx 1
```

**Note:** Cannot close the last open page.

### navigate_page.js
Navigate the currently selected page to a new URL.

**Usage:**
```bash
node scripts/navigate_page.js [--url <url>] [--type <type>] [--ignoreCache <bool>] [--timeout <ms>]
```

**Parameters:**
- `--url` (optional): URL to navigate to
- `--type` (optional): Navigation type (e.g., "reload")
- `--ignoreCache` (optional): Ignore browser cache (true/false)
- `--timeout` (optional): Navigation timeout in milliseconds

**Examples:**
```bash
node scripts/navigate_page.js --url https://github.com/explore
node scripts/navigate_page.js --type reload
node scripts/navigate_page.js --url https://example.com --ignoreCache true
```

### resize_page.js
Resize the browser window to specific dimensions.

**Usage:**
```bash
node scripts/resize_page.js --width <pixels> --height <pixels>
```

**Parameters:**
- `--width` (required): Window width in pixels
- `--height` (required): Window height in pixels

**Example:**
```bash
node scripts/resize_page.js --width 1920 --height 1080
node scripts/resize_page.js --width 375 --height 667  # iPhone size
```

## Workflows

### Workflow: Multi-Tab Testing

Test a workflow across multiple pages simultaneously.

**Steps:**
- [ ] Open first page: `node scripts/new_page.js --url https://app.example.com/login`
- [ ] Open second page: `node scripts/new_page.js --url https://app.example.com/signup`
- [ ] List all pages: `node scripts/list_pages.js`
- [ ] Switch to login page: `node scripts/select_page.js --pageIdx 0`
- [ ] Test login flow on page 0
- [ ] Switch to signup page: `node scripts/select_page.js --pageIdx 1`
- [ ] Test signup flow on page 1
- [ ] Close signup page: `node scripts/close_page.js --pageIdx 1`

**Example:**
```bash
# Open multiple pages
node scripts/new_page.js --url https://github.com
node scripts/new_page.js --url https://github.com/login
node scripts/new_page.js --url https://github.com/pricing

# Check what's open
node scripts/list_pages.js

# Work with page 1
node scripts/select_page.js --pageIdx 1
node scripts/take_snapshot.js

# Clean up
node scripts/close_page.js --pageIdx 2
node scripts/close_page.js --pageIdx 1
```

### Workflow: Responsive Design Testing

Test the same page at different viewport sizes.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Test desktop: `node scripts/resize_page.js --width 1920 --height 1080`
- [ ] Capture desktop: `node scripts/take_screenshot.js --filePath desktop.png`
- [ ] Test tablet: `node scripts/resize_page.js --width 768 --height 1024`
- [ ] Capture tablet: `node scripts/take_screenshot.js --filePath tablet.png`
- [ ] Test mobile: `node scripts/resize_page.js --width 375 --height 667`
- [ ] Capture mobile: `node scripts/take_screenshot.js --filePath mobile.png`

**Example:**
```bash
node scripts/new_page.js --url https://example.com

# Desktop
node scripts/resize_page.js --width 1920 --height 1080
node scripts/take_screenshot.js --filePath desktop.png

# iPad
node scripts/resize_page.js --width 768 --height 1024
node scripts/take_screenshot.js --filePath ipad.png

# iPhone
node scripts/resize_page.js --width 375 --height 667
node scripts/take_screenshot.js --filePath iphone.png
```

### Workflow: Sequential Page Navigation

Navigate through a series of pages in order.

**Steps:**
- [ ] Open starting page: `node scripts/new_page.js --url <start-url>`
- [ ] Navigate to step 2: `node scripts/navigate_page.js --url <step2-url>`
- [ ] Wait for content: `node scripts/wait_for.js --text "Expected text"`
- [ ] Navigate to step 3: `node scripts/navigate_page.js --url <step3-url>`
- [ ] Verify final state: `node scripts/take_snapshot.js`

**Example:**
```bash
# Multi-step checkout flow
node scripts/new_page.js --url https://shop.example.com/cart
node scripts/wait_for.js --text "Shopping Cart"

node scripts/navigate_page.js --url https://shop.example.com/checkout
node scripts/wait_for.js --text "Checkout"

node scripts/navigate_page.js --url https://shop.example.com/payment
node scripts/wait_for.js --text "Payment Information"
```

## Common Patterns

### Opening and Switching Pages
```bash
# Always get page indices first
node scripts/list_pages.js

# Then switch to the desired page
node scripts/select_page.js --pageIdx <N>
```

### Page State Management
```bash
# Remember: Currently selected page is the context for all subsequent commands
node scripts/select_page.js --pageIdx 0
node scripts/take_snapshot.js  # This snapshots page 0

node scripts/select_page.js --pageIdx 1
node scripts/take_snapshot.js  # This snapshots page 1
```

### Cleaning Up Pages
```bash
# Close pages in reverse order to avoid index shifting
node scripts/close_page.js --pageIdx 2
node scripts/close_page.js --pageIdx 1
# Page 0 remains (cannot close last page)
```
