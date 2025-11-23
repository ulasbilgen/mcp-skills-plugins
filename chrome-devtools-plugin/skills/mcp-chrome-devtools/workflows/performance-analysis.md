# Performance Analysis Tools

Measure and analyze page performance, Core Web Vitals, and network conditions.

## Tools in this Group

### performance_start_trace.js
Start performance trace recording to measure page performance and Core Web Vitals.

**Usage:**
```bash
node scripts/performance_start_trace.js --reload <bool> --autoStop <bool>
```

**Parameters:**
- `--reload` (required): Reload page before tracing (true/false)
- `--autoStop` (required): Automatically stop when load completes (true/false)

**Examples:**
```bash
# Trace with page reload (recommended)
node scripts/performance_start_trace.js --reload true --autoStop true

# Trace current page without reload
node scripts/performance_start_trace.js --reload false --autoStop true

# Manual trace (stop with performance_stop_trace.js)
node scripts/performance_start_trace.js --reload true --autoStop false
```

**What it measures:**
- Core Web Vitals (LCP, FID, CLS, INP)
- Load times (DOMContentLoaded, Load event)
- Performance insights and recommendations
- Resource loading timeline

### performance_stop_trace.js
Stop active performance trace recording.

**Usage:**
```bash
node scripts/performance_stop_trace.js
```

**Use case:** When `autoStop: false` was used, manually stop the trace.

**Example workflow:**
```bash
# Start manual trace
node scripts/performance_start_trace.js --reload true --autoStop false

# Interact with page
node scripts/click.js --uid button_load_more
node scripts/wait_for.js --text "Loaded"

# Stop and get results
node scripts/performance_stop_trace.js
```

### performance_analyze_insight.js
Get detailed information about a specific performance insight.

**Usage:**
```bash
node scripts/performance_analyze_insight.js --insightSetId <id> --insightName <name>
```

**Parameters:**
- `--insightSetId` (required): Insight set ID from trace results
- `--insightName` (required): Name of specific insight to analyze

**Example:**
```bash
# After running a trace, analyze specific insights
node scripts/performance_analyze_insight.js --insightSetId "set_0" --insightName "LargestContentfulPaint"
node scripts/performance_analyze_insight.js --insightSetId "set_0" --insightName "LayoutShift"
```

**Common insight names:**
- `LargestContentfulPaint` - LCP metric details
- `CumulativeLayoutShift` - CLS metric details
- `InteractionToNextPaint` - INP metric details
- `SlowCSSSelector` - CSS performance issues
- `RenderBlocking` - Render-blocking resources
- `ThirdParties` - Third-party script impact

### emulate.js
Emulate network conditions and CPU throttling to test performance under constraints.

**Usage:**
```bash
node scripts/emulate.js [--networkConditions <json>] [--cpuThrottlingRate <number>]
```

**Parameters:**
- `--networkConditions` (optional): Network throttling config (JSON)
- `--cpuThrottlingRate` (optional): CPU slowdown multiplier (e.g., 4 = 4x slower)

**Network condition format:**
```json
{
  "downloadThroughput": 50000,    // bytes/sec
  "uploadThroughput": 20000,      // bytes/sec
  "latency": 100                  // milliseconds
}
```

**Examples:**
```bash
# Slow 3G network
node scripts/emulate.js --networkConditions '{
  "downloadThroughput": 50000,
  "uploadThroughput": 20000,
  "latency": 100
}'

# Fast 3G network
node scripts/emulate.js --networkConditions '{
  "downloadThroughput": 180000,
  "uploadThroughput": 75000,
  "latency": 40
}'

# CPU throttling (4x slowdown)
node scripts/emulate.js --cpuThrottlingRate 4

# Both network and CPU throttling
node scripts/emulate.js --networkConditions '{
  "downloadThroughput": 50000,
  "uploadThroughput": 20000,
  "latency": 100
}' --cpuThrottlingRate 4

# Reset to no throttling
node scripts/emulate.js
```

**Preset network profiles:**

**Slow 3G:**
- Download: 50 KB/s
- Upload: 20 KB/s
- Latency: 100ms

**Fast 3G:**
- Download: 180 KB/s
- Upload: 75 KB/s
- Latency: 40ms

**4G:**
- Download: 500 KB/s
- Upload: 200 KB/s
- Latency: 20ms

## Workflows

### Workflow: Measure Core Web Vitals

Get Core Web Vitals scores for a page.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Start trace: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Review CWV scores in output
  - LCP (Largest Contentful Paint): < 2.5s is good
  - CLS (Cumulative Layout Shift): < 0.1 is good
  - INP (Interaction to Next Paint): < 200ms is good
- [ ] Analyze problematic metrics: `node scripts/performance_analyze_insight.js --insightSetId <id> --insightName <metric>`
- [ ] Take screenshot for documentation: `node scripts/take_screenshot.js`

**Example:**
```bash
node scripts/new_page.js --url https://example.com
node scripts/performance_start_trace.js --reload true --autoStop true

# Output shows:
# LCP: 3.2s (needs improvement)
# CLS: 0.05 (good)
# INP: 150ms (good)
# Insight Set ID: set_abc123

# Analyze slow LCP
node scripts/performance_analyze_insight.js --insightSetId set_abc123 --insightName "LargestContentfulPaint"

# Shows: LCP element is hero image, loaded late, render-blocking CSS
```

### Workflow: Test Performance on Slow Connection

Measure performance under constrained network conditions.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Enable Slow 3G: `node scripts/emulate.js --networkConditions <slow-3g>`
- [ ] Run trace: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Review load times and CWV scores
- [ ] Reset network: `node scripts/emulate.js`
- [ ] Compare with normal conditions

**Example:**
```bash
node scripts/new_page.js --url https://example.com

# Test on Slow 3G
node scripts/emulate.js --networkConditions '{
  "downloadThroughput": 50000,
  "uploadThroughput": 20000,
  "latency": 100
}'

node scripts/performance_start_trace.js --reload true --autoStop true
# Results: LCP 8.5s, CLS 0.2, Load time 12s

# Reset and test normal
node scripts/emulate.js
node scripts/performance_start_trace.js --reload true --autoStop true
# Results: LCP 2.1s, CLS 0.05, Load time 3s
```

### Workflow: Test on Low-End Device

Simulate performance on slower devices using CPU throttling.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Enable CPU throttling: `node scripts/emulate.js --cpuThrottlingRate 4`
- [ ] Run trace: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Test interactions: Click buttons, scroll
- [ ] Check INP scores (interaction responsiveness)
- [ ] Reset throttling: `node scripts/emulate.js`

**Example:**
```bash
node scripts/new_page.js --url https://app.example.com

# Simulate 4x slower CPU
node scripts/emulate.js --cpuThrottlingRate 4

# Measure performance
node scripts/performance_start_trace.js --reload true --autoStop true
# Results show slower JavaScript execution, higher INP

# Reset
node scripts/emulate.js
```

### Workflow: Identify Performance Bottlenecks

Find and analyze performance issues.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Run trace: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Review insights in output
- [ ] Identify issues: render-blocking resources, slow selectors, layout shifts
- [ ] Analyze each insight: `node scripts/performance_analyze_insight.js`
- [ ] Document issues: `node scripts/take_screenshot.js`
- [ ] Check network requests: `node scripts/list_network_requests.js`

**Example:**
```bash
node scripts/new_page.js --url https://slow-app.example.com
node scripts/performance_start_trace.js --reload true --autoStop true

# Output shows insights:
# - RenderBlocking: 3 CSS files blocking render
# - LargestContentfulPaint: Slow (4.2s)
# - ThirdParties: Analytics scripts delaying load
# Insight Set ID: set_xyz789

# Analyze render blocking
node scripts/performance_analyze_insight.js --insightSetId set_xyz789 --insightName "RenderBlocking"
# Shows: styles.css, fonts.css, vendor.css all blocking

# Check network timing
node scripts/list_network_requests.js --resourceTypes '["stylesheet"]'
# Shows: Large CSS files with slow load times
```

### Workflow: Measure User Interaction Performance

Test responsiveness of interactive elements.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Start manual trace: `node scripts/performance_start_trace.js --reload false --autoStop false`
- [ ] Perform interactions: Click buttons, fill forms, navigate
- [ ] Stop trace: `node scripts/performance_stop_trace.js`
- [ ] Review INP (Interaction to Next Paint) scores
- [ ] Check for slow event handlers

**Example:**
```bash
node scripts/new_page.js --url https://app.example.com/dashboard
node scripts/performance_start_trace.js --reload false --autoStop false

# Interact with the app
node scripts/take_snapshot.js
node scripts/click.js --uid button_filter
node scripts/wait_for.js --text "Filtered"
node scripts/click.js --uid button_sort
node scripts/wait_for.js --text "Sorted"

# Stop and get results
node scripts/performance_stop_trace.js
# Shows: INP 250ms (needs improvement)
# Insight: Slow event handler on button_filter (200ms)
```

### Workflow: Compare Performance Across Pages

Benchmark multiple pages or variations.

**Steps:**
- [ ] Test page A: `node scripts/new_page.js --url <url-a>`
- [ ] Run trace A: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Save results (copy output)
- [ ] Open page B: `node scripts/navigate_page.js --url <url-b>`
- [ ] Run trace B: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Compare LCP, CLS, INP, load times

**Example:**
```bash
# Test homepage
node scripts/new_page.js --url https://example.com
node scripts/performance_start_trace.js --reload true --autoStop true
# Results: LCP 2.1s, CLS 0.05, Load 3.2s

# Test product page
node scripts/navigate_page.js --url https://example.com/products/item-1
node scripts/performance_start_trace.js --reload true --autoStop true
# Results: LCP 3.5s, CLS 0.15, Load 5.1s

# Conclusion: Product page needs optimization
```

### Workflow: Mobile Performance Testing

Simulate mobile device performance.

**Steps:**
- [ ] Open page: `node scripts/new_page.js --url <url>`
- [ ] Set mobile viewport: `node scripts/resize_page.js --width 375 --height 667`
- [ ] Enable mobile network: `node scripts/emulate.js --networkConditions <3g>`
- [ ] Enable CPU throttling: `node scripts/emulate.js --cpuThrottlingRate 4`
- [ ] Run trace: `node scripts/performance_start_trace.js --reload true --autoStop true`
- [ ] Review mobile-specific CWV scores
- [ ] Reset: `node scripts/emulate.js`

**Example:**
```bash
node scripts/new_page.js --url https://example.com

# Simulate iPhone SE on 3G
node scripts/resize_page.js --width 375 --height 667
node scripts/emulate.js --networkConditions '{
  "downloadThroughput": 180000,
  "uploadThroughput": 75000,
  "latency": 40
}' --cpuThrottlingRate 4

# Measure
node scripts/performance_start_trace.js --reload true --autoStop true
# Results show mobile-specific performance

# Reset
node scripts/emulate.js
node scripts/resize_page.js --width 1920 --height 1080
```

## Common Patterns

### Standard Performance Test
```bash
node scripts/new_page.js --url <url>
node scripts/performance_start_trace.js --reload true --autoStop true
```

### Throttled Performance Test
```bash
node scripts/emulate.js --networkConditions '<slow-3g>' --cpuThrottlingRate 4
node scripts/performance_start_trace.js --reload true --autoStop true
node scripts/emulate.js  # Reset
```

### Analyze Specific Metrics
```bash
# After trace with insightSetId "set_123"
node scripts/performance_analyze_insight.js --insightSetId set_123 --insightName "LargestContentfulPaint"
node scripts/performance_analyze_insight.js --insightSetId set_123 --insightName "CumulativeLayoutShift"
node scripts/performance_analyze_insight.js --insightSetId set_123 --insightName "InteractionToNextPaint"
```

### Reset All Emulation
```bash
# Remove all throttling
node scripts/emulate.js
```

## Core Web Vitals Benchmarks

**Largest Contentful Paint (LCP):**
- Good: < 2.5 seconds
- Needs improvement: 2.5 - 4.0 seconds
- Poor: > 4.0 seconds

**Cumulative Layout Shift (CLS):**
- Good: < 0.1
- Needs improvement: 0.1 - 0.25
- Poor: > 0.25

**Interaction to Next Paint (INP):**
- Good: < 200 milliseconds
- Needs improvement: 200 - 500 milliseconds
- Poor: > 500 milliseconds

## Network Throttling Presets

**Slow 3G:**
```json
{
  "downloadThroughput": 50000,
  "uploadThroughput": 20000,
  "latency": 100
}
```

**Fast 3G:**
```json
{
  "downloadThroughput": 180000,
  "uploadThroughput": 75000,
  "latency": 40
}
```

**Regular 4G:**
```json
{
  "downloadThroughput": 500000,
  "uploadThroughput": 200000,
  "latency": 20
}
```
