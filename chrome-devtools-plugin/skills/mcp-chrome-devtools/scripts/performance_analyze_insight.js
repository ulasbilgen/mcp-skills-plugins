#!/usr/bin/env node
/**
 * Provides more detailed information on a specific Performance Insight of an insight set that was highlighted in the results of a trace recording.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('performance_analyze_insight')
  .description('Provides more detailed information on a specific Performance Insight of an insight set that was highlighted in the results of a trace recording.')
  .option('--insightSetId <value>', 'The id for the specific insight set. Only use the ids given in the \"Available insight sets\" list. (required)')
  .option('--insightName <value>', 'The name of the Insight you want more information on. For example: \"DocumentLatency\" or \"LCPBreakdown\" (required)')
  .parse();

const options = program.opts();

  // Validate required options
  if (!options.insightSetId) {
    console.error('Error: --insightSetId is required');
    process.exit(1);
  }
  if (!options.insightName) {
    console.error('Error: --insightName is required');
    process.exit(1);
  }

  // Build arguments object
  const args = {};
  if (options.insightSetId !== undefined) {
    args['insightSetId'] = options.insightSetId;
  }
  if (options.insightName !== undefined) {
    args['insightName'] = options.insightName;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'performance_analyze_insight', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
