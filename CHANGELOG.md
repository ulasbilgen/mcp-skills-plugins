# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-11-23

### Added
- **Second plugin**: figma-desktop-plugin v0.5.0
  - Design-to-code automation via Figma Desktop with 6 tools
  - MCP server: Figma Desktop (built-in HTTP-based MCP server)
  - Tools: get_design_context, get_variable_defs, get_screenshot, get_metadata, create_design_system_rules, get_figjam
  - Extract React/Vue/HTML code from Figma components with framework context
  - Design system token extraction (colors, typography, spacing)
  - Component screenshot capture for documentation
  - FigJam board content extraction
  - Comprehensive figma-desktop agent with auto-loaded skill documentation
  - Complete skill documentation with realistic workflows and examples

### Changed
- **Updated m2s commands** from upstream mcp2skill-tools repository
  - `/m2s:generate` - Now displays MCP server version when available (e.g., "chrome-devtools (v0.10.2)")
  - `/m2s:list` - Shows server versions in output for better version tracking
  - Improved version awareness for MCP server integrations
- **marketplace.json** - Added figma-desktop-plugin entry
- **README.md** - Added figma-desktop-plugin to Available Plugins section

## [0.1.1] - 2025-11-23

### Added
- **Comprehensive plugin validation system**
  - `scripts/plugin-schema.js` - Official Claude Code plugin schema definition
  - `scripts/validate-plugin.js` - CLI tool for validating individual plugins
  - Schema validation integrated into `scripts/validate-marketplace.js`
  - New npm script: `npm run validate-plugin <plugin-dir>`

### Changed
- **Enhanced `/skill2plugin` command** with critical validation checkpoint (Step 11.5)
  - Now runs `node scripts/validate-plugin.js` before adding plugin to marketplace
  - Prevents committing plugins with invalid manifests
  - Validates against official Claude Code plugin schema

### Fixed
- **chrome-devtools-plugin v0.5.0** - Removed invalid 'mcp' field from plugin.json
  - Fixed installation error: "Unrecognized key(s) in object: 'mcp'"
  - Plugin now conforms to official Claude Code plugin schema
  - MCP server requirements documented in README instead of manifest

## [0.1.0] - 2025-11-23

### Added
- **First plugin**: chrome-devtools-plugin v0.5.0
  - Browser automation via Chrome DevTools Protocol with 26 tools
  - Tool groups: Page Management (6), Element Interaction (8), Inspection & Debugging (8), Performance Analysis (4)
  - Comprehensive chrome-devtools agent with auto-loaded skill documentation
  - Generated from chrome-devtools-mcp@1.0.2
  - Complete skill documentation with workflows/, reference/, and SKILL.md
  - Detailed workflow guides for all tool groups
  - Advanced examples and troubleshooting documentation

- **Generic `/skill2plugin` command**
  - Converts any MCP skill in `.claude/skills/` into a marketplace plugin
  - Automatically generates plugin.json, agent definition, and README
  - Supports all MCP-generated skills with proper versioning

### Changed
- **Updated m2s commands** from upstream mcp2skill-tools repository
  - `/m2s:generate` - Latest enhancements for skill generation
  - `/m2s:update` - Improved skill update workflow
- **Enhanced `/skill2plugin` command** - Now fully generic and actionable
- **marketplace.json** - Added chrome-devtools-plugin entry and version field
- **README.md** - Updated with plugin listing and corrected installation command

### Fixed
- Installation command in README (chrome-dev-tools → chrome-devtools)

## [0.0.1] - 2025-11-XX

### Added
- Initial marketplace setup
- m2s commands for skill generation from MCP servers
- Project structure and documentation
- CONTRIBUTING.md workflow guide
