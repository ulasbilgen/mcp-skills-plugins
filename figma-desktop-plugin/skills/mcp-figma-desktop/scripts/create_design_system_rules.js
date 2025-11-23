#!/usr/bin/env node
/**
 * Provides a prompt to generate design system rules for this repo.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('create_design_system_rules')
  .description('Provides a prompt to generate design system rules for this repo.')
  .option('--clientLanguages <value>', 'A comma separated list of programming languages used by the client in the current context in string form, e.g. `javascript`, `html,css,typescript`, etc. If you do not know, please list `unknown`. This is used for logging purposes to understand which languages are being used. If you are unsure, it is better to list `unknown` than to make a guess.')
  .option('--clientFrameworks <value>', 'A comma separated list of frameworks used by the client in the current context, e.g. `react`, `vue`, `django` etc. If you do not know, please list `unknown`. This is used for logging purposes to understand which frameworks are being used. If you are unsure, it is better to list `unknown` than to make a guess')
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.clientLanguages !== undefined) {
    args['clientLanguages'] = options.clientLanguages;
  }
  if (options.clientFrameworks !== undefined) {
    args['clientFrameworks'] = options.clientFrameworks;
  }

// Call the tool
try {
  const result = await callTool('figma-desktop', 'create_design_system_rules', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
