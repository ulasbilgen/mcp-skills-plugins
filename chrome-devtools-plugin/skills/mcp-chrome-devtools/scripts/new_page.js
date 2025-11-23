#!/usr/bin/env node
/**
 * Creates a new page
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('new_page')
  .description('Creates a new page')
  .option('--url <value>', 'URL to load in a new page. (required)')
  .option('--timeout <value>', 'Maximum wait time in milliseconds. If set to 0, the default timeout will be used.', (val) => parseInt(val, 10))
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.url) {
    console.error('Error: --url is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.url !== undefined) {
    args['url'] = options.url;
  }
  if (options.timeout !== undefined) {
    args['timeout'] = options.timeout;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'new_page', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
