#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'blog');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  return match[1].split('\n').reduce((data, line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      return data;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    data[key] = rawValue.replace(/^"|"$/g, '');
    return data;
  }, {});
}

function getBlogPosts() {
  return fs.readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fullPath = path.join(BLOG_DIR, file);
      const data = parseFrontmatter(fs.readFileSync(fullPath, 'utf8'));
      return {
        file,
        title: data.title,
        date: data.date,
        permalink: data.permalink,
        source: data.source,
        linkedinActivityId: data.linkedinActivityId,
        linkedinUrl: data.linkedinUrl,
        linkedinPostedAt: data.linkedinPostedAt,
        importedAt: data.importedAt,
      };
    });
}

function getSortTime(post) {
  return Date.parse(post.linkedinPostedAt || post.date || '1970-01-01');
}

const posts = getBlogPosts();
const linkedinPosts = posts
  .filter((post) => post.linkedinActivityId || post.linkedinUrl || post.source === 'LinkedIn')
  .sort((a, b) => getSortTime(b) - getSortTime(a));

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ latest: linkedinPosts[0] || null, posts: linkedinPosts }, null, 2));
  process.exit(0);
}

if (!linkedinPosts.length) {
  console.log('No LinkedIn import metadata found.');
  process.exit(0);
}

const latest = linkedinPosts[0];

console.log('Latest LinkedIn import checkpoint');
console.log(`- Title: ${latest.title}`);
console.log(`- LinkedIn posted at: ${latest.linkedinPostedAt || latest.date}`);
console.log(`- Activity ID: ${latest.linkedinActivityId || 'missing'}`);
console.log(`- Site URL: https://thesalesguy.com.au${latest.permalink}`);
console.log(`- Source URL: ${latest.linkedinUrl || 'missing'}`);
console.log('');
console.log(`Tracked LinkedIn posts: ${linkedinPosts.length}`);
