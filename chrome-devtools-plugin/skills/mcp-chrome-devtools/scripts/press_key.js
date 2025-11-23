#!/usr/bin/env node
/**
 * Press a key or key combination. Use this when other input methods like fill() cannot be used (e.g., keyboard shortcuts, navigation keys, or special key combinations).
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('press_key')
  .description('Press a key or key combination. Use this when other input methods like fill() cannot be used (e.g., keyboard shortcuts, navigation keys, or special key combinations).')
  .option('--key <value>', 'A key or a combination (e.g., \"Enter\", \"Control+A\", \"Control++\", \"Control+Shift+R\"). Modifiers: Control, Shift, Alt, Meta (required)')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.key) {
    console.error('Error: --key is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.key !== undefined) {
    args['key'] = options.key;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'press_key', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
