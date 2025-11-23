#!/usr/bin/env node
/**
 * Hover over the provided element
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('hover')
  .description('Hover over the provided element')
  .option('--uid <value>', 'The uid of an element on the page from the page content snapshot (required)')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.uid) {
    console.error('Error: --uid is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.uid !== undefined) {
    args['uid'] = options.uid;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'hover', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
