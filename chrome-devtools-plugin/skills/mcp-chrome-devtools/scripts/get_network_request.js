#!/usr/bin/env node
/**
 * Gets a network request by an optional reqid, if omitted returns the currently selected request in the DevTools Network panel.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('get_network_request')
  .description('Gets a network request by an optional reqid, if omitted returns the currently selected request in the DevTools Network panel.')
  .option('--reqid <value>', 'The reqid of the network request. If omitted returns the currently selected request in the DevTools Network panel.', parseFloat)
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.reqid !== undefined) {
    args['reqid'] = options.reqid;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'get_network_request', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
