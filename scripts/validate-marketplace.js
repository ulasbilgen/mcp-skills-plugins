#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let hasErrors = false;

function error(message) {
  console.error(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function warning(message) {
  console.warn(`⚠️  WARNING: ${message}`);
}

function success(message) {
  console.log(`✅ ${message}`);
}

function validateMarketplace() {
  const marketplacePath = path.join(__dirname, '..', '.claude-plugin', 'marketplace.json');

  if (!fs.existsSync(marketplacePath)) {
    error('marketplace.json not found at .claude-plugin/marketplace.json');
    return;
  }

  let marketplace;
  try {
    const content = fs.readFileSync(marketplacePath, 'utf-8');
    marketplace = JSON.parse(content);
  } catch (err) {
    error(`Failed to parse marketplace.json: ${err.message}`);
    return;
  }

  // Validate marketplace structure
  if (!marketplace.name) {
    error('marketplace.json missing required field: name');
  }

  if (!marketplace.owner || !marketplace.owner.name) {
    error('marketplace.json missing required field: owner.name');
  }

  if (!Array.isArray(marketplace.plugins)) {
    error('marketplace.json plugins field must be an array');
    return;
  }

  success(`Marketplace structure is valid (${marketplace.plugins.length} plugins)`);

  // Validate each plugin
  marketplace.plugins.forEach((plugin, index) => {
    validatePlugin(plugin, index);
  });
}

function validatePlugin(pluginEntry, index) {
  const pluginName = pluginEntry.name || `plugin-${index}`;
  console.log(`\nValidating plugin: ${pluginName}`);

  if (!pluginEntry.name) {
    error(`Plugin at index ${index} missing required field: name`);
  }

  if (!pluginEntry.source) {
    error(`Plugin '${pluginName}' missing required field: source`);
    return;
  }

  const pluginPath = path.join(__dirname, '..', pluginEntry.source);

  if (!fs.existsSync(pluginPath)) {
    error(`Plugin '${pluginName}' source directory not found: ${pluginEntry.source}`);
    return;
  }

  // Validate plugin.json
  const pluginJsonPath = path.join(pluginPath, '.claude-plugin', 'plugin.json');
  if (!fs.existsSync(pluginJsonPath)) {
    error(`Plugin '${pluginName}' missing .claude-plugin/plugin.json`);
    return;
  }

  let pluginJson;
  try {
    const content = fs.readFileSync(pluginJsonPath, 'utf-8');
    pluginJson = JSON.parse(content);
  } catch (err) {
    error(`Plugin '${pluginName}' has invalid plugin.json: ${err.message}`);
    return;
  }

  // Validate plugin.json structure
  if (!pluginJson.name) {
    error(`Plugin '${pluginName}' plugin.json missing: name`);
  }

  if (!pluginJson.version) {
    warning(`Plugin '${pluginName}' plugin.json missing: version`);
  }

  if (!pluginJson.description) {
    warning(`Plugin '${pluginName}' plugin.json missing: description`);
  }

  // Check for required directories/files
  const hasAgents = fs.existsSync(path.join(pluginPath, 'agents'));
  const hasSkills = fs.existsSync(path.join(pluginPath, 'skills'));
  const hasCommands = fs.existsSync(path.join(pluginPath, 'commands'));
  const hasReadme = fs.existsSync(path.join(pluginPath, 'README.md'));

  if (!hasAgents && !hasSkills && !hasCommands) {
    warning(
      `Plugin '${pluginName}' has no agents/, skills/, or commands/ directories`
    );
  }

  if (!hasReadme) {
    warning(`Plugin '${pluginName}' missing README.md`);
  }

  if (hasSkills) {
    success(`  Plugin '${pluginName}' has skills`);
  }

  if (hasAgents) {
    success(`  Plugin '${pluginName}' has agents`);
  }

  success(`Plugin '${pluginName}' structure is valid`);
}

function validateListPluginsScript() {
  const listPluginsPath = path.join(__dirname, 'list-plugins.js');
  if (!fs.existsSync(listPluginsPath)) {
    warning('list-plugins.js script not found');
  }
}

console.log('🔍 Validating MCP Skills Plugins Marketplace\n');

validateMarketplace();
validateListPluginsScript();

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ Validation failed with errors');
  process.exit(1);
} else {
  console.log('✅ All validations passed!');
  process.exit(0);
}
