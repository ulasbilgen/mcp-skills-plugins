# Advanced Examples

Complex real-world workflows combining multiple tools.

## Example 1: E-commerce Checkout Flow

Complete a full e-commerce purchase flow with validation.

```bash
# 1. Open product page
node scripts/new_page.js --url https://shop.example.com/products/laptop-pro

# 2. Verify product loaded
node scripts/wait_for.js --text "Add to Cart"
node scripts/take_snapshot.js

# 3. Add to cart
node scripts/click.js --uid button_add_to_cart
node scripts/wait_for.js --text "Added to cart"

# 4. Go to cart
node scripts/navigate_page.js --url https://shop.example.com/cart
node scripts/wait_for.js --text "Shopping Cart"
node scripts/take_snapshot.js

# 5. Proceed to checkout
node scripts/click.js --uid button_checkout
node scripts/wait_for.js --text "Checkout"

# 6. Fill shipping information
node scripts/take_snapshot.js
node scripts/fill_form.js --elements '[
  {"uid": "input_first_name", "value": "John"},
  {"uid": "input_last_name", "value": "Doe"},
  {"uid": "input_email", "value": "john@example.com"},
  {"uid": "input_address", "value": "123 Main St"},
  {"uid": "input_city", "value": "San Francisco"},
  {"uid": "input_zip", "value": "94102"}
]'

# 7. Continue to payment
node scripts/click.js --uid button_continue
node scripts/wait_for.js --text "Payment Information"

# 8. Fill payment (test mode)
node scripts/take_snapshot.js
node scripts/fill_form.js --elements '[
  {"uid": "input_card_number", "value": "4242424242424242"},
  {"uid": "input_expiry", "value": "12/25"},
  {"uid": "input_cvv", "value": "123"}
]'

# 9. Review order
node scripts/click.js --uid button_review
node scripts/wait_for.js --text "Review Order"
node scripts/take_screenshot.js --filePath order-review.png

# 10. Place order
node scripts/click.js --uid button_place_order
node scripts/wait_for.js --text "Order Confirmed" --timeout 10000

# 11. Verify confirmation
node scripts/take_snapshot.js
node scripts/take_screenshot.js --filePath order-confirmation.png

# 12. Check for any errors
node scripts/list_console_messages.js --types '["error"]'

# 13. Verify confirmation email sent (check network)
node scripts/list_network_requests.js --resourceTypes '["fetch"]'
```

**Expected result:** Order placed successfully with confirmation screenshot.

## Example 2: Multi-Step Form with Validation

Handle a complex form with client-side validation and error recovery.

```bash
# 1. Open application form
node scripts/new_page.js --url https://example.com/job-application

# 2. Get form structure
node scripts/take_snapshot.js

# 3. Fill required fields
node scripts/fill_form.js --elements '[
  {"uid": "input_name", "value": "Jane Smith"},
  {"uid": "input_email", "value": "invalid-email"},
  {"uid": "input_phone", "value": "555-0123"}
]'

# 4. Try to submit (will fail validation)
node scripts/click.js --uid button_submit

# 5. Check for validation errors
node scripts/wait_for.js --text "Invalid email"
node scripts/take_snapshot.js
# Shows: Error message near input_email

# 6. Fix email and retry
node scripts/fill.js --uid input_email --value "jane@example.com"
node scripts/click.js --uid button_submit

# 7. Wait for next step
node scripts/wait_for.js --text "Step 2"

# 8. Fill work experience section
node scripts/take_snapshot.js
node scripts/fill_form.js --elements '[
  {"uid": "input_company", "value": "Tech Corp"},
  {"uid": "input_position", "value": "Senior Engineer"},
  {"uid": "input_years", "value": "5"}
]'

# 9. Upload resume
node scripts/upload_file.js --uid input_resume --filePath /Users/me/resume.pdf

# 10. Verify upload
node scripts/wait_for.js --text "resume.pdf"
node scripts/take_snapshot.js

# 11. Continue to final step
node scripts/click.js --uid button_continue
node scripts/wait_for.js --text "Step 3"

# 12. Fill cover letter
node scripts/take_snapshot.js
node scripts/fill.js --uid textarea_cover_letter --value "I am excited to apply for this position..."

# 13. Review and submit
node scripts/click.js --uid button_final_submit

# 14. Handle confirmation dialog
node scripts/handle_dialog.js --action accept

# 15. Wait for success
node scripts/wait_for.js --text "Application submitted" --timeout 10000

# 16. Capture confirmation
node scripts/take_screenshot.js --filePath application-success.png

# 17. Verify no errors
node scripts/list_console_messages.js --types '["error"]'
```

**Key techniques:**
- Error detection and recovery
- Multi-step form navigation
- File upload validation
- Dialog handling

## Example 3: Single Page Application Testing

Test a React/Vue/Angular SPA with dynamic content.

```bash
# 1. Open SPA
node scripts/new_page.js --url https://app.example.com
node scripts/wait_for.js --text "Dashboard"

# 2. Get initial state
node scripts/take_snapshot.js
node scripts/take_screenshot.js --filePath state-1-dashboard.png

# 3. Check app loaded correctly
node scripts/evaluate_script.js --function "() => window.__APP_READY__"
node scripts/evaluate_script.js --function "() => document.querySelector('#root').children.length > 0"

# 4. Navigate to users page (client-side routing)
node scripts/click.js --uid link_users
node scripts/wait_for.js --text "User Management"

# 5. Wait for API data to load
node scripts/wait_for.js --text "Loading" --timeout 2000
node scripts/wait_for.js --text "Users loaded"

# 6. Verify API calls
node scripts/list_network_requests.js --resourceTypes '["fetch"]'
# Should show: GET /api/users (200)

# 7. Get updated snapshot (new content)
node scripts/take_snapshot.js

# 8. Filter users
node scripts/fill.js --uid input_search --value "admin"
node scripts/press_key.js --key "Enter"

# 9. Wait for filtered results
node scripts/wait_for.js --text "admin@example.com"

# 10. Take snapshot of filtered state
node scripts/take_snapshot.js
node scripts/take_screenshot.js --filePath state-2-filtered.png

# 11. Click on a user
node scripts/click.js --uid row_user_0

# 12. Wait for modal/sidebar to open
node scripts/wait_for.js --text "User Details"
node scripts/take_snapshot.js

# 13. Edit user
node scripts/click.js --uid button_edit
node scripts/fill.js --uid input_user_name --value "Updated Name"
node scripts/click.js --uid button_save

# 14. Wait for save API call
node scripts/wait_for.js --text "Saved successfully"

# 15. Verify PATCH request
node scripts/list_network_requests.js --resourceTypes '["fetch"]'
# Should show: PATCH /api/users/123 (200)

# 16. Close modal
node scripts/press_key.js --key "Escape"

# 17. Verify no console errors
node scripts/list_console_messages.js --types '["error", "warning"]'

# 18. Check final state
node scripts/take_screenshot.js --filePath state-3-final.png
```

**SPA-specific techniques:**
- Client-side routing navigation
- Waiting for AJAX content
- API call verification
- Dynamic content snapshots

## Example 4: Performance Audit Workflow

Complete performance audit with throttling and analysis.

```bash
# 1. Open page in optimal conditions
node scripts/new_page.js --url https://example.com

# 2. Baseline performance
node scripts/performance_start_trace.js --reload true --autoStop true
# Save output: LCP 2.1s, CLS 0.05, INP 120ms
node scripts/take_screenshot.js --filePath perf-baseline.png

# 3. Test on Slow 3G
node scripts/emulate.js --networkConditions '{
  "downloadThroughput": 50000,
  "uploadThroughput": 20000,
  "latency": 100
}' --cpuThrottlingRate 4

# 4. Performance on slow connection
node scripts/performance_start_trace.js --reload true --autoStop true
# Output: LCP 8.5s, CLS 0.15, INP 450ms, Insight Set: set_abc123

# 5. Analyze problematic metrics
node scripts/performance_analyze_insight.js --insightSetId set_abc123 --insightName "LargestContentfulPaint"
# Shows: Hero image loaded late, blocking CSS

node scripts/performance_analyze_insight.js --insightSetId set_abc123 --insightName "RenderBlocking"
# Shows: 3 CSS files blocking render

node scripts/performance_analyze_insight.js --insightSetId set_abc123 --insightName "ThirdParties"
# Shows: Analytics script delaying load by 2.3s

# 6. Check network waterfall
node scripts/list_network_requests.js
# Identify slow resources

# 7. Test on Fast 3G
node scripts/emulate.js --networkConditions '{
  "downloadThroughput": 180000,
  "uploadThroughput": 75000,
  "latency": 40
}' --cpuThrottlingRate 2

node scripts/performance_start_trace.js --reload true --autoStop true
# Output: LCP 4.2s, CLS 0.08, INP 250ms

# 8. Reset to normal
node scripts/emulate.js

# 9. Test mobile viewport performance
node scripts/resize_page.js --width 375 --height 667
node scripts/performance_start_trace.js --reload true --autoStop true

# 10. Document findings
node scripts/take_screenshot.js --fullPage true --filePath perf-mobile.png

# 11. Generate report (custom script)
echo "Performance Audit Report" > perf-report.txt
echo "========================" >> perf-report.txt
echo "Baseline: LCP 2.1s, CLS 0.05" >> perf-report.txt
echo "Slow 3G: LCP 8.5s, CLS 0.15" >> perf-report.txt
echo "Issues: Render-blocking CSS, large hero image" >> perf-report.txt
```

**Performance testing patterns:**
- Baseline measurement
- Throttled testing (Slow 3G, CPU)
- Insight analysis
- Mobile viewport testing

## Example 5: Automated Screenshot Comparison

Capture screenshots across different states for visual testing.

```bash
# 1. Define viewport sizes
DESKTOP="1920 1080"
TABLET="768 1024"
MOBILE="375 667"

# 2. Open page
node scripts/new_page.js --url https://example.com

# 3. Desktop screenshots
node scripts/resize_page.js --width 1920 --height 1080
node scripts/wait_for.js --text "Ready"

# Home page
node scripts/take_screenshot.js --fullPage true --filePath screenshots/desktop-home.png

# Products page
node scripts/navigate_page.js --url https://example.com/products
node scripts/wait_for.js --text "Products"
node scripts/take_screenshot.js --fullPage true --filePath screenshots/desktop-products.png

# 4. Tablet screenshots
node scripts/resize_page.js --width 768 --height 1024

node scripts/navigate_page.js --url https://example.com
node scripts/wait_for.js --text "Ready"
node scripts/take_screenshot.js --fullPage true --filePath screenshots/tablet-home.png

node scripts/navigate_page.js --url https://example.com/products
node scripts/wait_for.js --text "Products"
node scripts/take_screenshot.js --fullPage true --filePath screenshots/tablet-products.png

# 5. Mobile screenshots
node scripts/resize_page.js --width 375 --height 667

node scripts/navigate_page.js --url https://example.com
node scripts/wait_for.js --text "Ready"
node scripts/take_screenshot.js --fullPage true --filePath screenshots/mobile-home.png

node scripts/navigate_page.js --url https://example.com/products
node scripts/wait_for.js --text "Products"
node scripts/take_screenshot.js --fullPage true --filePath screenshots/mobile-products.png

# 6. Compare with baseline (external tool)
# pixelmatch, ImageMagick, or Percy
```

**Use cases:**
- Visual regression testing
- Responsive design verification
- Cross-browser comparison

## Example 6: Scraping Dynamic Content

Extract data from a dynamic page with pagination.

```bash
# 1. Open listings page
node scripts/new_page.js --url https://example.com/listings

# 2. Wait for content
node scripts/wait_for.js --text "Results"

# 3. Get page 1 data
node scripts/take_snapshot.js
node scripts/evaluate_script.js --function "() => {
  const items = Array.from(document.querySelectorAll('.listing-item'));
  return items.map(item => ({
    title: item.querySelector('.title').textContent,
    price: item.querySelector('.price').textContent,
    url: item.querySelector('a').href
  }));
}" > page1.json

# 4. Go to page 2
node scripts/click.js --uid button_next_page
node scripts/wait_for.js --text "Page 2"

# 5. Get page 2 data
node scripts/evaluate_script.js --function "() => {
  const items = Array.from(document.querySelectorAll('.listing-item'));
  return items.map(item => ({
    title: item.querySelector('.title').textContent,
    price: item.querySelector('.price').textContent,
    url: item.querySelector('a').href
  }));
}" > page2.json

# 6. Continue for more pages...

# 7. Combine results
cat page*.json | jq -s 'add' > all-listings.json
```

**Data extraction patterns:**
- Pagination handling
- JavaScript evaluation for extraction
- JSON output formatting

## Example 7: Testing Authentication Flow

Complete login/logout testing with session verification.

```bash
# 1. Open login page
node scripts/new_page.js --url https://app.example.com/login

# 2. Verify logged out state
node scripts/evaluate_script.js --function "() => !localStorage.getItem('authToken')"

# 3. Fill login form
node scripts/take_snapshot.js
node scripts/fill_form.js --elements '[
  {"uid": "input_email", "value": "test@example.com"},
  {"uid": "input_password", "value": "password123"}
]'

# 4. Submit login
node scripts/click.js --uid button_login
node scripts/wait_for.js --text "Dashboard" --timeout 10000

# 5. Verify logged in
node scripts/evaluate_script.js --function "() => !!localStorage.getItem('authToken')"

# 6. Check auth token
node scripts/evaluate_script.js --function "() => localStorage.getItem('authToken')"

# 7. Verify API calls include auth header
node scripts/list_network_requests.js --resourceTypes '["fetch"]'

# 8. Navigate protected pages
node scripts/navigate_page.js --url https://app.example.com/profile
node scripts/wait_for.js --text "Profile"

node scripts/navigate_page.js --url https://app.example.com/settings
node scripts/wait_for.js --text "Settings"

# 9. Logout
node scripts/take_snapshot.js
node scripts/click.js --uid button_logout

# 10. Handle logout confirmation
node scripts/handle_dialog.js --action accept

# 11. Verify logged out
node scripts/wait_for.js --text "Login"
node scripts/evaluate_script.js --function "() => !localStorage.getItem('authToken')"

# 12. Verify redirected to login
node scripts/evaluate_script.js --function "() => window.location.pathname === '/login'"

# 13. Attempt to access protected page while logged out
node scripts/navigate_page.js --url https://app.example.com/settings

# 14. Should redirect to login
node scripts/wait_for.js --text "Please log in"
node scripts/evaluate_script.js --function "() => window.location.pathname === '/login'"
```

**Authentication testing patterns:**
- Session state verification
- Protected route access
- Logout and cleanup
- Redirect verification

## Example 8: Drag and Drop Kanban Board

Organize tasks using drag-and-drop interface.

```bash
# 1. Open kanban board
node scripts/new_page.js --url https://app.example.com/kanban
node scripts/wait_for.js --text "Task Board"

# 2. Get initial state
node scripts/take_snapshot.js
node scripts/take_screenshot.js --filePath kanban-initial.png

# 3. Move task from TODO to IN PROGRESS
node scripts/drag.js --from-uid card_task_1 --to-uid column_in_progress
node scripts/wait_for.js --text "Task moved"

# 4. Verify API update
node scripts/list_network_requests.js --resourceTypes '["fetch"]'
# Should show: PATCH /api/tasks/1 (200)

# 5. Check new state
node scripts/take_snapshot.js
# card_task_1 now in column_in_progress

# 6. Move task to DONE
node scripts/drag.js --from-uid card_task_1 --to-uid column_done
node scripts/wait_for.js --text "Task completed"

# 7. Move multiple tasks
node scripts/drag.js --from-uid card_task_2 --to-uid column_in_progress
node scripts/drag.js --from-uid card_task_3 --to-uid column_in_progress

# 8. Final state
node scripts/take_screenshot.js --filePath kanban-final.png

# 9. Verify no errors
node scripts/list_console_messages.js --types '["error"]'
```

**Drag-and-drop patterns:**
- Sequential drag operations
- State verification after each move
- API update confirmation

These advanced examples demonstrate complex real-world scenarios combining multiple tools and techniques for comprehensive browser automation.
