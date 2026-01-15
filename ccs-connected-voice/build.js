#!/usr/bin/env node

/**
 * CCS Connected Voice - Build Script
 * Processes HTML includes and outputs to /dist folder
 * 
 * Usage: node build.js
 * 
 * Supports include syntax: <!--#include file="includes/header.html" -->
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = __dirname;
const DIST_DIR = path.join(__dirname, 'dist');

// Directories to copy as-is
const ASSET_DIRS = ['assets'];

// HTML files to process (relative to SRC_DIR)
const HTML_FILES = [
  'index.html',
  'pricing/index.html',
  'contact-us/index.html',
  'CloudVOIP/index.html',
  '_product-template/index.html'
];

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Process HTML includes recursively
 */
function processIncludes(html, basePath) {
  const includeRegex = /<!--#include\s+file="([^"]+)"\s*-->/g;
  
  return html.replace(includeRegex, (match, filePath) => {
    const includePath = path.join(basePath, filePath);
    
    if (fs.existsSync(includePath)) {
      let content = fs.readFileSync(includePath, 'utf8');
      // Process nested includes
      content = processIncludes(content, path.dirname(includePath));
      return content;
    } else {
      console.warn(`Warning: Include file not found: ${includePath}`);
      return `<!-- Include not found: ${filePath} -->`;
    }
  });
}

/**
 * Copy directory recursively
 */
function copyDir(src, dest) {
  ensureDir(dest);
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Build the site
 */
function build() {
  console.log('Building CCS Connected Voice site...\n');
  
  // Clean dist directory
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  ensureDir(DIST_DIR);
  
  // Process HTML files
  console.log('Processing HTML files...');
  for (const htmlFile of HTML_FILES) {
    const srcPath = path.join(SRC_DIR, htmlFile);
    const destPath = path.join(DIST_DIR, htmlFile);
    
    if (fs.existsSync(srcPath)) {
      ensureDir(path.dirname(destPath));
      
      let html = fs.readFileSync(srcPath, 'utf8');
      html = processIncludes(html, SRC_DIR);
      
      fs.writeFileSync(destPath, html);
      console.log(`  ✓ ${htmlFile}`);
    } else {
      console.log(`  - ${htmlFile} (not found, skipping)`);
    }
  }
  
  // Copy asset directories
  console.log('\nCopying assets...');
  for (const assetDir of ASSET_DIRS) {
    const srcPath = path.join(SRC_DIR, assetDir);
    const destPath = path.join(DIST_DIR, assetDir);
    
    if (fs.existsSync(srcPath)) {
      copyDir(srcPath, destPath);
      console.log(`  ✓ ${assetDir}/`);
    }
  }
  
  console.log('\nBuild complete! Output in /dist folder.');
  console.log('Run "npx serve dist" to preview locally.');
}

// Run build
build();
