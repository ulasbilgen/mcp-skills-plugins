#!/usr/bin/env node
/**
 * Get a list of pages open in the browser.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('list_pages')
  .description('Get a list of pages open in the browser.')
  // No options required
  .parse();

const options = program.opts();

  const args = {};

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'list_pages', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
