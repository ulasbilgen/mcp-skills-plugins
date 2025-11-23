# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
