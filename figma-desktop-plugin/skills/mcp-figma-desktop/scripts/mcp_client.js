#!/usr/bin/env node
/**
 * Shared MCP REST client for tool scripts.
 */

import axios from 'axios';

// MCP2REST endpoint (configurable via environment variable)
const MCP_REST_URL = process.env.MCP_REST_URL || 'http://localhost:28888';

/**
 * Call an MCP tool via mcp2rest REST API.
 *
 * @param {string} server - Server name (e.g., "chrome-devtools")
 * @param {string} tool - Tool name (e.g., "click")
 * @param {object} args - Tool arguments as object
 * @returns {Promise<string>} Tool result as formatted string
 */
export async function callTool(server, tool, args) {
  const url = `${MCP_REST_URL}/call`;
  const payload = {
    server,
    tool,
    arguments: args || {},
  };

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
    });

    const data = response.data;

    if (data.success) {
      // Extract and format result
      const result = data.result || {};
      const content = result.content || [];

      // Format output nicely
      const outputParts = [];
      for (const item of content) {
        if (item.type === 'text') {
          outputParts.push(item.text || '');
        } else if (item.type === 'image') {
          // For images, just note their presence
          const dataLen = (item.data || '').length;
          outputParts.push(`[Image data: ${dataLen} bytes]`);
        } else if (item.type === 'resource') {
          outputParts.push(JSON.stringify(item.resource || {}, null, 2));
        }
      }

      return outputParts.length > 0 ? outputParts.join('\n') : JSON.stringify(result, null, 2);
    } else {
      const error = data.error || {};
      const errorMsg = error.message || 'Unknown error';
      const errorCode = error.code || 'UNKNOWN';
      console.error(`Error [${errorCode}]: ${errorMsg}`);
      process.exit(1);
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error(`Error: Cannot connect to mcp2rest at ${MCP_REST_URL}`);
      console.error('Make sure mcp2rest is running.');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      console.error('Error: Request timed out after 30 seconds');
    } else if (error.response) {
      console.error(`Error: HTTP ${error.response.status} - ${error.response.data}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
}
