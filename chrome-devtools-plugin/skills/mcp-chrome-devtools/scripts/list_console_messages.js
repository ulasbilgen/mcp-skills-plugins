#!/usr/bin/env node
/**
 * List all console messages for the currently selected page since the last navigation.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('list_console_messages')
  .description('List all console messages for the currently selected page since the last navigation.')
  .option('--pageSize <value>', 'Maximum number of messages to return. When omitted, returns all requests.', (val) => parseInt(val, 10))
  .option('--pageIdx <value>', 'Page number to return (0-based). When omitted, returns the first page.', (val) => parseInt(val, 10))
  .option('--types <items...>', 'Filter messages to only return messages of the specified resource types. When omitted or empty, returns all messages.')
  .option('--includePreservedMessages', 'Set to true to return the preserved messages over the last 3 navigations.')
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.pageSize !== undefined) {
    args['pageSize'] = options.pageSize;
  }
  if (options.pageIdx !== undefined) {
    args['pageIdx'] = options.pageIdx;
  }
  if (options.types !== undefined) {
    args['types'] = options.types;
  }
  if (options.includePreservedMessages) {
    args['includePreservedMessages'] = true;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'list_console_messages', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
