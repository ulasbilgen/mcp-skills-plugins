#!/usr/bin/env node
/**
 * Wait for the specified text to appear on the selected page.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('wait_for')
  .description('Wait for the specified text to appear on the selected page.')
  .option('--text <value>', 'Text to appear on the page (required)')
  .option('--timeout <value>', 'Maximum wait time in milliseconds. If set to 0, the default timeout will be used.', (val) => parseInt(val, 10))
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.text) {
    console.error('Error: --text is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.text !== undefined) {
    args['text'] = options.text;
  }
  if (options.timeout !== undefined) {
    args['timeout'] = options.timeout;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'wait_for', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
