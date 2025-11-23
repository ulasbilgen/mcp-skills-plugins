#!/usr/bin/env node
/**
 * Navigates the currently selected page to a URL.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('navigate_page')
  .description('Navigates the currently selected page to a URL.')
  .option('--type <value>', 'Navigate the page by URL, back or forward in history, or reload.. Choices: "url", "back", "forward", "reload"')
  .option('--url <value>', 'Target URL (only type=url)')
  .option('--ignoreCache', 'Whether to ignore cache on reload.')
  .option('--timeout <value>', 'Maximum wait time in milliseconds. If set to 0, the default timeout will be used.', (val) => parseInt(val, 10))
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.type !== undefined) {
    args['type'] = options.type;
  }
  if (options.url !== undefined) {
    args['url'] = options.url;
  }
  if (options.ignoreCache) {
    args['ignoreCache'] = true;
  }
  if (options.timeout !== undefined) {
    args['timeout'] = options.timeout;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'navigate_page', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
