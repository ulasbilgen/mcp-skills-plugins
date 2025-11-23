#!/usr/bin/env node
/**
 * Resizes the selected page's window so that the page has specified dimension
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('resize_page')
  .description('Resizes the selected page\'s window so that the page has specified dimension')
  .option('--width <value>', 'Page width (required)', parseFloat)
  .addHelpText('after', '  Note: --width is required')
  .option('--height <value>', 'Page height (required)', parseFloat)
  .addHelpText('after', '  Note: --height is required')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.width) {
    console.error('Error: --width is required');
    process.exit(1);
  }
  if (!options.height) {
    console.error('Error: --height is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.width !== undefined) {
    args['width'] = options.width;
  }
  if (options.height !== undefined) {
    args['height'] = options.height;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'resize_page', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
