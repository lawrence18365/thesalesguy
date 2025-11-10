#!/usr/bin/env node

/**
 * URL Migration Script for The Sales Guy website
 *
 * This script:
 * 1. Creates new folder structure for clean URLs
 * 2. Copies and updates HTML files with new URL structure
 * 3. Updates all internal links, canonical tags, og:url tags
 * 4. Preserves all tracking codes (GA4, GTM) and forms (Web3Forms)
 */

const fs = require('fs');
const path = require('path');

// URL mapping: old filename -> new folder path
const URL_MAP = {
  'sdr.html': 'sdr-sales-training',
  'ae.html': 'account-executive-training',
  'about.html': 'about',
  'resources.html': 'resources',
  'blog.html': 'blog',
  'privacy.html': 'privacy',
  'terms.html': 'terms',
  'blog-4-life-changing-benefits-cold-calling.html': 'blog/cold-calling-benefits',
  'blog-overcome-call-reluctance.html': 'blog/overcome-call-reluctance',
  'blog-stop-chasing-vanity-metrics.html': 'blog/stop-chasing-vanity-metrics'
};

// Link replacement patterns
const LINK_REPLACEMENTS = [
  // Navigation and internal links
  { from: 'href="sdr.html"', to: 'href="/sdr-sales-training/"' },
  { from: 'href="ae.html"', to: 'href="/account-executive-training/"' },
  { from: 'href="about.html"', to: 'href="/about/"' },
  { from: 'href="resources.html"', to: 'href="/resources/"' },
  { from: 'href="blog.html"', to: 'href="/blog/"' },
  { from: 'href="privacy.html"', to: 'href="/privacy/"' },
  { from: 'href="terms.html"', to: 'href="/terms/"' },

  // Blog posts
  { from: 'href="blog-4-life-changing-benefits-cold-calling.html"', to: 'href="/blog/cold-calling-benefits/"' },
  { from: 'href="blog-overcome-call-reluctance.html"', to: 'href="/blog/overcome-call-reluctance/"' },
  { from: 'href="blog-stop-chasing-vanity-metrics.html"', to: 'href="/blog/stop-chasing-vanity-metrics/"' },

  // Canonical URLs
  { from: 'https://thesalesguy.com.au/sdr.html', to: 'https://thesalesguy.com.au/sdr-sales-training/' },
  { from: 'https://thesalesguy.com.au/ae.html', to: 'https://thesalesguy.com.au/account-executive-training/' },
  { from: 'https://thesalesguy.com.au/about.html', to: 'https://thesalesguy.com.au/about/' },
  { from: 'https://thesalesguy.com.au/resources.html', to: 'https://thesalesguy.com.au/resources/' },
  { from: 'https://thesalesguy.com.au/blog.html', to: 'https://thesalesguy.com.au/blog/' },
  { from: 'https://thesalesguy.com.au/privacy.html', to: 'https://thesalesguy.com.au/privacy/' },
  { from: 'https://thesalesguy.com.au/terms.html', to: 'https://thesalesguy.com.au/terms/' },
  { from: 'https://thesalesguy.com.au/blog-4-life-changing-benefits-cold-calling.html', to: 'https://thesalesguy.com.au/blog/cold-calling-benefits/' },
  { from: 'https://thesalesguy.com.au/blog-overcome-call-reluctance.html', to: 'https://thesalesguy.com.au/blog/overcome-call-reluctance/' },
  { from: 'https://thesalesguy.com.au/blog-stop-chasing-vanity-metrics.html', to: 'https://thesalesguy.com.au/blog/stop-chasing-vanity-metrics/' },

  // CSS/JS paths need to be updated for nested directories
  { from: 'href="css/', to: 'href="../css/' },
  { from: 'src="js/', to: 'src="../js/' },
];

// CSS/JS path replacements for blog subdirectories (2 levels deep)
const BLOG_LINK_REPLACEMENTS = [
  { from: 'href="../css/', to: 'href="../../css/' },
  { from: 'src="../js/', to: 'src="../../js/' },
];

function updateContent(content, isIndexFile = false, isBlogPost = false) {
  let updated = content;

  // Apply all link replacements
  LINK_REPLACEMENTS.forEach(({ from, to }) => {
    updated = updated.split(from).join(to);
  });

  // For blog posts (2 levels deep: /blog/post-name/), adjust CSS/JS paths
  if (isBlogPost) {
    BLOG_LINK_REPLACEMENTS.forEach(({ from, to }) => {
      updated = updated.split(from).join(to);
    });
  }

  return updated;
}

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created directory: ${dirPath}`);
  }
}

function migrateFile(sourceFile, targetFolder, isBlogPost = false) {
  const sourcePath = path.join(__dirname, sourceFile);

  if (!fs.existsSync(sourcePath)) {
    console.log(`✗ Source file not found: ${sourceFile}`);
    return false;
  }

  // Create target directory
  const targetDir = path.join(__dirname, targetFolder);
  createDirectory(targetDir);

  // Read source file
  let content = fs.readFileSync(sourcePath, 'utf8');

  // Update content
  content = updateContent(content, false, isBlogPost);

  // Write to target location
  const targetPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetPath, content, 'utf8');

  console.log(`✓ Migrated: ${sourceFile} -> ${targetFolder}/index.html`);
  return true;
}

console.log('🚀 Starting URL migration...\n');

let successCount = 0;
let failCount = 0;

// Process all files
for (const [sourceFile, targetFolder] of Object.entries(URL_MAP)) {
  const isBlogPost = targetFolder.startsWith('blog/') && targetFolder !== 'blog';

  if (migrateFile(sourceFile, targetFolder, isBlogPost)) {
    successCount++;
  } else {
    failCount++;
  }
}

console.log(`\n✅ Migration complete!`);
console.log(`   Success: ${successCount} files`);
console.log(`   Failed: ${failCount} files`);

if (failCount === 0) {
  console.log('\n📋 Next steps:');
  console.log('   1. Review the new files in their folders');
  console.log('   2. Test locally before deploying');
  console.log('   3. Choose and deploy the appropriate redirect file for your hosting provider');
  console.log('   4. Update sitemap.xml (already done)');
  console.log('   5. Deploy to production');
}
