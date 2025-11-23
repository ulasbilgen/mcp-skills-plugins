#!/usr/bin/env node
/**
 * Upload a file through a provided element.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('upload_file')
  .description('Upload a file through a provided element.')
  .option('--uid <value>', 'The uid of the file input element or an element that will open file chooser on the page from the page content snapshot (required)')
  .option('--filePath <value>', 'The local path of the file to upload (required)')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.uid) {
    console.error('Error: --uid is required');
    process.exit(1);
  }
  if (!options.filePath) {
    console.error('Error: --filePath is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.uid !== undefined) {
    args['uid'] = options.uid;
  }
  if (options.filePath !== undefined) {
    args['filePath'] = options.filePath;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'upload_file', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
