#!/usr/bin/env node
/**
 * List all requests for the currently selected page since the last navigation.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('list_network_requests')
  .description('List all requests for the currently selected page since the last navigation.')
  .option('--pageSize <value>', 'Maximum number of requests to return. When omitted, returns all requests.', (val) => parseInt(val, 10))
  .option('--pageIdx <value>', 'Page number to return (0-based). When omitted, returns the first page.', (val) => parseInt(val, 10))
  .option('--resourceTypes <items...>', 'Filter requests to only return requests of the specified resource types. When omitted or empty, returns all requests.')
  .option('--includePreservedRequests', 'Set to true to return the preserved requests over the last 3 navigations.')
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
  if (options.resourceTypes !== undefined) {
    args['resourceTypes'] = options.resourceTypes;
  }
  if (options.includePreservedRequests) {
    args['includePreservedRequests'] = true;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'list_network_requests', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
