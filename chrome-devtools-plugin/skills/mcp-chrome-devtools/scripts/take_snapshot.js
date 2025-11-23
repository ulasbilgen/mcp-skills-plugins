#!/usr/bin/env node
/**
 * Take a text snapshot of the currently selected page based on the a11y tree. The snapshot lists page elements along with a unique
identifier (uid). Always use the latest snapshot. Prefer taking a snapshot over taking a screenshot. The snapshot indicates the element selected
in the DevTools Elements panel (if any).
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('take_snapshot')
  .description('Take a text snapshot of the currently selected page based on the a11y tree. The snapshot lists page elements along with a unique\nidentifier (uid). Always use the latest snapshot. Prefer taking a snapshot over taking a screenshot. The snapshot indicates the element selected\nin the DevTools Elements panel (if any).')
  .option('--verbose', 'Whether to include all possible information available in the full a11y tree. Default is false.')
  .option('--filePath <value>', 'The absolute path, or a path relative to the current working directory, to save the snapshot to instead of attaching it to the response.')
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.verbose) {
    args['verbose'] = true;
  }
  if (options.filePath !== undefined) {
    args['filePath'] = options.filePath;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'take_snapshot', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
