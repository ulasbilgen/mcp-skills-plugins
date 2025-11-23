#!/usr/bin/env node
/**
 * Gets a console message by its ID. You can get all messages by calling list_console_messages.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('get_console_message')
  .description('Gets a console message by its ID. You can get all messages by calling list_console_messages.')
  .option('--msgid <value>', 'The msgid of a console message on the page from the listed console messages (required)', parseFloat)
  .addHelpText('after', '  Note: --msgid is required')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.msgid) {
    console.error('Error: --msgid is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.msgid !== undefined) {
    args['msgid'] = options.msgid;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'get_console_message', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
