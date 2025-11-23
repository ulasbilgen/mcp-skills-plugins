#!/usr/bin/env node
/**
 * Select a page as a context for future tool calls.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('select_page')
  .description('Select a page as a context for future tool calls.')
  .option('--pageIdx <value>', 'The index of the page to select. Call list_pages to list pages. (required)', parseFloat)
  .addHelpText('after', '  Note: --pageIdx is required')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.pageIdx) {
    console.error('Error: --pageIdx is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.pageIdx !== undefined) {
    args['pageIdx'] = options.pageIdx;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'select_page', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
