#!/usr/bin/env node
/**
 * Generate a screenshot for a given node or the currently selected node in the Figma desktop app. Use the nodeId parameter to specify a node id. If no node id is provided, the currently selected node will be used. If a URL is provided, extract the node id from the URL, for example, if given the URL https://figma.com/design/:fileKey/:fileName?node-id=1-2, the extracted nodeId would be `1:2`
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('get_screenshot')
  .description('Generate a screenshot for a given node or the currently selected node in the Figma desktop app. Use the nodeId parameter to specify a node id. If no node id is provided, the currently selected node will be used. If a URL is provided, extract the node id from the URL, for example, if given the URL https://figma.com/design/:fileKey/:fileName?node-id=1-2, the extracted nodeId would be `1:2`')
  .option('--nodeId <value>', 'The ID of the node in the Figma document, eg. \"123:456\" or \"123-456\". This should be a valid node ID in the Figma document.')
  .option('--clientLanguages <value>', 'A comma separated list of programming languages used by the client in the current context in string form, e.g. `javascript`, `html,css,typescript`, etc. If you do not know, please list `unknown`. This is used for logging purposes to understand which languages are being used. If you are unsure, it is better to list `unknown` than to make a guess.')
  .option('--clientFrameworks <value>', 'A comma separated list of frameworks used by the client in the current context, e.g. `react`, `vue`, `django` etc. If you do not know, please list `unknown`. This is used for logging purposes to understand which frameworks are being used. If you are unsure, it is better to list `unknown` than to make a guess')
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.nodeId !== undefined) {
    args['nodeId'] = options.nodeId;
  }
  if (options.clientLanguages !== undefined) {
    args['clientLanguages'] = options.clientLanguages;
  }
  if (options.clientFrameworks !== undefined) {
    args['clientFrameworks'] = options.clientFrameworks;
  }

// Call the tool
try {
  const result = await callTool('figma-desktop', 'get_screenshot', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
