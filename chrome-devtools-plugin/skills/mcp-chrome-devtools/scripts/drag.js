#!/usr/bin/env node
/**
 * Drag an element onto another element
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('drag')
  .description('Drag an element onto another element')
  .option('--from-uid <value>', 'The uid of the element to drag (required)')
  .option('--to-uid <value>', 'The uid of the element to drop into (required)')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.fromUid) {
    console.error('Error: --from-uid is required');
    process.exit(1);
  }
  if (!options.toUid) {
    console.error('Error: --to-uid is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.fromUid !== undefined) {
    args['from_uid'] = options.fromUid;
  }
  if (options.toUid !== undefined) {
    args['to_uid'] = options.toUid;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'drag', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
