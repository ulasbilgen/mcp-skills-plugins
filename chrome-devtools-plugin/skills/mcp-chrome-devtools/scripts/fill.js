#!/usr/bin/env node
/**
 * Type text into a input, text area or select an option from a <select> element.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('fill')
  .description('Type text into a input, text area or select an option from a <select> element.')
  .option('--uid <value>', 'The uid of an element on the page from the page content snapshot (required)')
  .option('--value <value>', 'The value to fill in (required)')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.uid) {
    console.error('Error: --uid is required');
    process.exit(1);
  }
  if (!options.value) {
    console.error('Error: --value is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.uid !== undefined) {
    args['uid'] = options.uid;
  }
  if (options.value !== undefined) {
    args['value'] = options.value;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'fill', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
