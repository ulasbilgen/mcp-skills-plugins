#!/usr/bin/env node
/**
 * Fill out multiple form elements at once
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('fill_form')
  .description('Fill out multiple form elements at once')
  .option('--elements <items...>', 'Elements from snapshot to fill out. (required)')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.elements) {
    console.error('Error: --elements is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.elements !== undefined) {
    args['elements'] = options.elements;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'fill_form', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
