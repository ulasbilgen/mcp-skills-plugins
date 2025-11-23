#!/usr/bin/env node
/**
 * Starts a performance trace recording on the selected page. This can be used to look for performance problems and insights to improve the performance of the page. It will also report Core Web Vital (CWV) scores for the page.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('performance_start_trace')
  .description('Starts a performance trace recording on the selected page. This can be used to look for performance problems and insights to improve the performance of the page. It will also report Core Web Vital (CWV) scores for the page.')
  .option('--reload', 'Determines if, once tracing has started, the page should be automatically reloaded.')
  .option('--autoStop', 'Determines if the trace recording should be automatically stopped.')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.reload) {
    console.error('Error: --reload is required');
    process.exit(1);
  }
  if (!options.autoStop) {
    console.error('Error: --autoStop is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.reload) {
    args['reload'] = true;
  }
  if (options.autoStop) {
    args['autoStop'] = true;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'performance_start_trace', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
