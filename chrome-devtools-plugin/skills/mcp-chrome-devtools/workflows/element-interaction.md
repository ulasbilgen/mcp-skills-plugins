# Element Interaction Tools

Interact with page elements: click, fill forms, drag, upload files, and keyboard input.

## Critical First Step: take_snapshot.js

**Always start with a snapshot** to get element UIDs before interacting with elements.

**Usage:**
```bash
node scripts/take_snapshot.js [--verbose <bool>] [--filePath <path>]
```

**Parameters:**
- `--verbose` (optional): Include more details about elements
- `--filePath` (optional): Save snapshot to file

**Example output:**
```
Page: https://github.com/login
TextField "Username or email address" [uid: input_0]
TextField "Password" [uid: input_1]
Button "Sign in" [uid: button_0]
Link "Forgot password?" [uid: link_0]
```

## Tools in this Group

### click.js
Click on an element by its UID.

**Usage:**
```bash
node scripts/click.js --uid <element-uid> [--dblClick <bool>]
```

**Parameters:**
- `--uid` (required): Element UID from snapshot
- `--dblClick` (optional): Perform double-click (true/false)

**Examples:**
```bash
node scripts/click.js --uid button_0
node scripts/click.js --uid link_5
node scripts/click.js --uid button_submit --dblClick true
```

### fill.js
Fill a single form field (input, textarea, or select).

**Usage:**
```bash
node scripts/fill.js --uid <element-uid> --value <text>
```

**Parameters:**
- `--uid` (required): Element UID from snapshot
- `--value` (required): Text to enter or option to select

**Examples:**
```bash
node scripts/fill.js --uid input_0 --value "username@example.com"
node scripts/fill.js --uid textarea_0 --value "This is a multi-line comment"
node scripts/fill.js --uid select_0 --value "Option 2"
```

### fill_form.js
Fill multiple form fields at once.

**Usage:**
```bash
node scripts/fill_form.js --elements '<json-array>'
```

**Parameters:**
- `--elements` (required): JSON array of `{uid, value}` objects

**Example:**
```bash
node scripts/fill_form.js --elements '[
  {"uid": "input_0", "value": "john@example.com"},
  {"uid": "input_1", "value": "John Doe"},
  {"uid": "textarea_0", "value": "Message text"}
]'
```

**Use case:** More efficient than multiple `fill.js` calls when filling entire forms.

### hover.js
Hover over an element to reveal tooltips, dropdowns, or trigger hover effects.

**Usage:**
```bash
node scripts/hover.js --uid <element-uid>
```

**Parameters:**
- `--uid` (required): Element UID from snapshot

**Example:**
```bash
node scripts/hover.js --uid button_info  # Show tooltip
node scripts/hover.js --uid nav_menu     # Open dropdown
```

### drag.js
Drag an element onto another element (drag-and-drop).

**Usage:**
```bash
node scripts/drag.js --from-uid <source-uid> --to-uid <target-uid>
```

**Parameters:**
- `--from-uid` (required): UID of element to drag
- `--to-uid` (required): UID of drop target

**Example:**
```bash
node scripts/drag.js --from-uid item_3 --to-uid dropzone_0
node scripts/drag.js --from-uid card_1 --to-uid column_2
```

### press_key.js
Press keyboard keys or key combinations.

**Usage:**
```bash
node scripts/press_key.js --key <key-or-combo>
```

**Parameters:**
- `--key` (required): Key name or combination (e.g., "Enter", "Control+C")

**Examples:**
```bash
node scripts/press_key.js --key "Enter"
node scripts/press_key.js --key "Tab"
node scripts/press_key.js --key "Escape"
node scripts/press_key.js --key "Control+A"
node scripts/press_key.js --key "Meta+S"  # Cmd+S on Mac
```

**Use cases:**
- Submit forms without clicking buttons
- Navigate with Tab/Enter
- Trigger keyboard shortcuts
- Close modals with Escape

### upload_file.js
Upload a file through a file input element.

**Usage:**
```bash
node scripts/upload_file.js --uid <element-uid> --filePath <absolute-path>
```

**Parameters:**
- `--uid` (required): UID of file input element
- `--filePath` (required): Absolute path to file

**Example:**
```bash
node scripts/upload_file.js --uid input_file_0 --filePath /Users/me/documents/resume.pdf
node scripts/upload_file.js --uid file_upload --filePath /tmp/image.png
```

**Important:** File path must be absolute, not relative.

## Workflows

### Workflow: Login Form Automation

Fill and submit a login form.

**Steps:**
- [ ] Open login page: `node scripts/new_page.js --url <login-url>`
- [ ] Get element UIDs: `node scripts/take_snapshot.js`
- [ ] Identify username and password field UIDs
- [ ] Fill username: `node scripts/fill.js --uid <username-uid> --value <username>`
- [ ] Fill password: `node scripts/fill.js --uid <password-uid> --value <password>`
- [ ] Click login button: `node scripts/click.js --uid <button-uid>`
- [ ] Wait for redirect: `node scripts/wait_for.js --text "Dashboard"`
- [ ] Verify login: `node scripts/take_snapshot.js`

**Example:**
```bash
node scripts/new_page.js --url https://app.example.com/login
node scripts/take_snapshot.js
# Output shows: input_0 (email), input_1 (password), button_0 (submit)

node scripts/fill.js --uid input_0 --value "user@example.com"
node scripts/fill.js --uid input_1 --value "secretpass123"
node scripts/click.js --uid button_0
node scripts/wait_for.js --text "Welcome"
```

### Workflow: Complex Form with File Upload

Fill a multi-field form including file upload.

**Steps:**
- [ ] Open form page: `node scripts/new_page.js --url <form-url>`
- [ ] Get element UIDs: `node scripts/take_snapshot.js`
- [ ] Fill text fields using `fill_form.js` for efficiency
- [ ] Upload file: `node scripts/upload_file.js --uid <file-input-uid> --filePath <path>`
- [ ] Submit form: `node scripts/click.js --uid <submit-uid>`
- [ ] Verify submission: `node scripts/wait_for.js --text "Success"`

**Example:**
```bash
node scripts/new_page.js --url https://example.com/job-application
node scripts/take_snapshot.js

# Fill multiple fields at once
node scripts/fill_form.js --elements '[
  {"uid": "input_name", "value": "Jane Smith"},
  {"uid": "input_email", "value": "jane@example.com"},
  {"uid": "input_phone", "value": "555-0123"},
  {"uid": "textarea_cover", "value": "I am excited to apply..."}
]'

# Upload resume
node scripts/upload_file.js --uid input_resume --filePath /Users/me/resume.pdf

# Submit
node scripts/click.js --uid button_submit
node scripts/wait_for.js --text "Application received"
```

### Workflow: Drag and Drop Interface

Organize items using drag-and-drop.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Get element UIDs: `node scripts/take_snapshot.js`
- [ ] Identify draggable items and drop zones
- [ ] Drag item to zone: `node scripts/drag.js --from-uid <item> --to-uid <zone>`
- [ ] Verify new state: `node scripts/take_snapshot.js`
- [ ] Repeat for additional items

**Example:**
```bash
node scripts/new_page.js --url https://trello-like-app.example.com
node scripts/take_snapshot.js
# Output shows: card_1, card_2 in column_todo; column_done is empty

# Move card_1 to done column
node scripts/drag.js --from-uid card_1 --to-uid column_done

# Verify
node scripts/take_snapshot.js
# Now card_1 is in column_done
```

### Workflow: Keyboard Navigation

Navigate and interact using only keyboard.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Tab to first field: `node scripts/press_key.js --key "Tab"`
- [ ] Fill focused field: `node scripts/fill.js --uid <uid> --value <value>`
- [ ] Tab to next field: `node scripts/press_key.js --key "Tab"`
- [ ] Continue tabbing through form
- [ ] Submit with Enter: `node scripts/press_key.js --key "Enter"`

**Example:**
```bash
node scripts/new_page.js --url https://example.com/quick-search
node scripts/take_snapshot.js

# Focus search box and type
node scripts/press_key.js --key "/"  # Focus search (keyboard shortcut)
node scripts/fill.js --uid input_search --value "documentation"
node scripts/press_key.js --key "Enter"  # Submit search

# Navigate results
node scripts/press_key.js --key "ArrowDown"
node scripts/press_key.js --key "ArrowDown"
node scripts/press_key.js --key "Enter"  # Open selected result
```

### Workflow: Dropdown Menu Interaction

Interact with hover-based dropdowns.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Get element UIDs: `node scripts/take_snapshot.js`
- [ ] Hover over menu trigger: `node scripts/hover.js --uid <trigger-uid>`
- [ ] Wait for menu to appear (brief pause)
- [ ] Take new snapshot: `node scripts/take_snapshot.js`
- [ ] Click menu item: `node scripts/click.js --uid <menu-item-uid>`

**Example:**
```bash
node scripts/new_page.js --url https://example.com
node scripts/take_snapshot.js
# Shows: nav_products (menu trigger)

node scripts/hover.js --uid nav_products
node scripts/wait_for.js --text "All Products"  # Wait for dropdown
node scripts/take_snapshot.js
# Now shows dropdown items: link_product_1, link_product_2, etc.

node scripts/click.js --uid link_product_1
```

## Common Patterns

### Always Start with Snapshot
```bash
# WRONG: Guessing UIDs
node scripts/click.js --uid button_submit  # Might not exist!

# RIGHT: Get UIDs first
node scripts/take_snapshot.js
# Then use actual UIDs from output
node scripts/click.js --uid button_0
```

### Handling Dynamic Content
```bash
# Take snapshot before and after actions
node scripts/take_snapshot.js
node scripts/click.js --uid button_load_more
node scripts/wait_for.js --text "Loaded"
node scripts/take_snapshot.js  # Get new UIDs for loaded content
```

### Form Filling Strategies

**Single fields:**
```bash
node scripts/fill.js --uid input_0 --value "value1"
node scripts/fill.js --uid input_1 --value "value2"
```

**Multiple fields (more efficient):**
```bash
node scripts/fill_form.js --elements '[
  {"uid": "input_0", "value": "value1"},
  {"uid": "input_1", "value": "value2"}
]'
```

### Error Recovery
```bash
# If form submission fails, take snapshot to see error messages
node scripts/click.js --uid button_submit
node scripts/wait_for.js --text "Error"
node scripts/take_snapshot.js  # See error message and form state
```
