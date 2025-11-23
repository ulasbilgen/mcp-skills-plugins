#!/usr/bin/env node
/**
 * Emulates various features on the selected page.
 */

import { program } from 'commander';
import { callTool } from './mcp_client.js';

program
  .name('emulate')
  .description('Emulates various features on the selected page.')
  .option('--networkConditions <value>', 'Throttle network. Set to \"No emulation\" to disable. If omitted, conditions remain unchanged.. Choices: "No emulation", "Offline", "Slow 3G", "Fast 3G", "Slow 4G", "Fast 4G"')
  .option('--cpuThrottlingRate <value>', 'Represents the CPU slowdown factor. Set the rate to 1 to disable throttling. If omitted, throttling remains unchanged.', parseFloat)
  .parse();

const options = program.opts();

  // Build arguments object
  const args = {};
  if (options.networkConditions !== undefined) {
    args['networkConditions'] = options.networkConditions;
  }
  if (options.cpuThrottlingRate !== undefined) {
    args['cpuThrottlingRate'] = options.cpuThrottlingRate;
  }

// Call the tool
try {
  const result = await callTool('chrome-devtools', 'emulate', args);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
