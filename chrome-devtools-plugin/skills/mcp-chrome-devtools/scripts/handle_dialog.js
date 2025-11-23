#!/usr/bin/env node
/**
 * If a browser dialog was opened, use this command to handle it
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('handle_dialog')
  .description('If a browser dialog was opened, use this command to handle it')
  .option('--action <value>', 'Whether to dismiss or accept the dialog (required). Choices: "accept", "dismiss"')
  .option('--promptText <value>', 'Optional prompt text to enter into the dialog.')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.action) {
    console.error('Error: --action is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.action !== undefined) {
    args['action'] = options.action;
  }
  if (options.promptText !== undefined) {
    args['promptText'] = options.promptText;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'handle_dialog', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
