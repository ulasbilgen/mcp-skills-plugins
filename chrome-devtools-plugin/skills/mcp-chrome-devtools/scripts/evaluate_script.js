#!/usr/bin/env node
/**
 * Evaluate a JavaScript function inside the currently selected page. Returns the response as JSON
so returned values have to JSON-serializable.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('evaluate_script')
  .description('Evaluate a JavaScript function inside the currently selected page. Returns the response as JSON\nso returned values have to JSON-serializable.')
  .option('--function <value>', 'A JavaScript function declaration to be executed by the tool in the currently selected page.
Example without arguments: `() => {
  return document.title
}` or `async () => {
  return await fetch(\"example.com\")
}`.
Example with arguments: `(el) => {
  return el.innerText;
}`
 (required)')
  .option('--args <items...>', 'An optional list of arguments to pass to the function.')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.function) {
    console.error('Error: --function is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.function !== undefined) {
    args['function'] = options.function;
  }
  if (options.args !== undefined) {
    args['args'] = options.args;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'evaluate_script', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
