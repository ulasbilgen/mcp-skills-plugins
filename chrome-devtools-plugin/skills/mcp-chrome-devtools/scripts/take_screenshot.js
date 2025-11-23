#!/usr/bin/env node
/**
 * Take a screenshot of the page or element.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('take_screenshot')
  .description('Take a screenshot of the page or element.')
  .option('--format <value>', 'Type of format to save the screenshot as. Default is \"png\". Choices: "png", "jpeg", "webp"')
  .option('--quality <value>', 'Compression quality for JPEG and WebP formats (0-100). Higher values mean better quality but larger file sizes. Ignored for PNG format.', parseFloat)
  .option('--uid <value>', 'The uid of an element on the page from the page content snapshot. If omitted takes a pages screenshot.')
  .option('--fullPage', 'If set to true takes a screenshot of the full page instead of the currently visible viewport. Incompatible with uid.')
  .option('--filePath <value>', 'The absolute path, or a path relative to the current working directory, to save the screenshot to instead of attaching it to the response.')
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.format !== undefined) {
    args['format'] = options.format;
  }
  if (options.quality !== undefined) {
    args['quality'] = options.quality;
  }
  if (options.uid !== undefined) {
    args['uid'] = options.uid;
  }
  if (options.fullPage) {
    args['fullPage'] = true;
  }
  if (options.filePath !== undefined) {
    args['filePath'] = options.filePath;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'take_screenshot', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
