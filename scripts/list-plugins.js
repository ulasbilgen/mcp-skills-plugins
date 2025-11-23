#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const marketplacePath = path.join(__dirname, '..', '.claude-plugin', 'marketplace.json');

if (!fs.existsSync(marketplacePath)) {
  console.error('❌ marketplace.json not found');
  process.exit(1);
}

let marketplace;
try {
  const content = fs.readFileSync(marketplacePath, 'utf-8');
  marketplace = JSON.parse(content);
} catch (err) {
  console.error(`❌ Failed to parse marketplace.json: ${err.message}`);
  process.exit(1);
}

console.log(`\n📦 ${marketplace.name}\n`);
console.log(`Owner: ${marketplace.owner.name}`);
console.log(`Total Plugins: ${marketplace.plugins.length}\n`);

if (marketplace.plugins.length === 0) {
  console.log('No plugins available yet.\n');
  process.exit(0);
}

console.log('Available Plugins:');
console.log('='.repeat(80));

marketplace.plugins.forEach((plugin, index) => {
  console.log(`\n${index + 1}. ${plugin.name}`);
  console.log(`   Source: ${plugin.source}`);
  if (plugin.description) {
    console.log(`   Description: ${plugin.description}`);
  }

  const pluginPath = path.join(__dirname, '..', plugin.source);
  const pluginJsonPath = path.join(pluginPath, '.claude-plugin', 'plugin.json');

  if (fs.existsSync(pluginJsonPath)) {
    try {
      const pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf-8'));
      console.log(`   Version: ${pluginJson.version || 'unknown'}`);
      if (pluginJson.author) {
        console.log(`   Author: ${pluginJson.author.name || 'unknown'}`);
      }
    } catch (err) {
      console.log(`   ⚠️  Could not read plugin.json`);
    }
  }
});

console.log('\n' + '='.repeat(80) + '\n');
