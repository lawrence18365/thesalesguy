#!/usr/bin/env node
/**
 * Generate an SEO report pulling data from Search Console and GA4.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json \
 *   GA4_PROPERTY_ID=123456789 \
 *   SITE_URL=https://thesalesguy.com.au/ \
 *   node scripts/generate-report.js
 */

require('dotenv').config();

const searchConsole = require('./search-console');
const ga4 = require('./ga4');
const indexing = require('./indexing');

const SITE_URL = process.env.SITE_URL || 'https://thesalesguy.com.au/';
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;

function getDateDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

async function generateReport() {
  const endDate = getDateDaysAgo(1);
  const startDate7d = getDateDaysAgo(7);
  const startDate28d = getDateDaysAgo(28);
  const startDate90d = getDateDaysAgo(90);

  console.log(`\n# SEO Report for ${SITE_URL}`);
  console.log(`Generated: ${new Date().toISOString()}\n`);

  // --- Search Console: Verify site access ---
  console.log('## Search Console Site Access\n');
  try {
    const sites = await searchConsole.listSites();
    const hasAccess = sites.some(
      (s) => s.siteUrl === SITE_URL || s.siteUrl === `sc-domain:${new URL(SITE_URL).hostname.replace(/^www\./, '')}`
    );
    if (hasAccess) {
      console.log('✅ Service account has access to site.\n');
    } else {
      console.log('❌ Service account does NOT have access to this site.');
      console.log('   Add the service account email as a user in Search Console.\n');
    }
  } catch (err) {
    console.error('Error listing sites:', err.message);
  }

  // --- Search Console: Last 28 days summary ---
  console.log('## Search Console Performance (Last 28 Days)\n');
  try {
    const summary = await searchConsole.getSearchPerformanceSummary(SITE_URL, startDate28d, endDate);
    if (summary) {
      console.log(`- Clicks: ${summary.clicks ?? 0}`);
      console.log(`- Impressions: ${summary.impressions ?? 0}`);
      console.log(`- CTR: ${((summary.ctr ?? 0) * 100).toFixed(2)}%`);
      console.log(`- Avg Position: ${(summary.position ?? 0).toFixed(2)}\n`);
    } else {
      console.log('No data available for the selected date range.\n');
    }
  } catch (err) {
    console.error('Error fetching Search Console summary:', err.message);
  }

  // --- Search Console: Top queries last 28 days ---
  console.log('## Top Queries (Last 28 Days)\n');
  try {
    const queries = await searchConsole.getSearchAnalytics(SITE_URL, startDate28d, endDate, ['query'], 20);
    if (queries.length) {
      console.log('| Query | Clicks | Impressions | CTR | Position |');
      console.log('| --- | --- | --- | --- | --- |');
      for (const row of queries) {
        const q = row.keys[0];
        console.log(
          `| ${q} | ${row.clicks} | ${row.impressions} | ${((row.ctr ?? 0) * 100).toFixed(1)}% | ${(row.position ?? 0).toFixed(1)} |`
        );
      }
      console.log('');
    } else {
      console.log('No query data.\n');
    }
  } catch (err) {
    console.error('Error fetching top queries:', err.message);
  }

  // --- Search Console: Top pages last 28 days ---
  console.log('## Top Pages (Last 28 Days)\n');
  try {
    const pages = await searchConsole.getSearchAnalytics(SITE_URL, startDate28d, endDate, ['page'], 20);
    if (pages.length) {
      console.log('| Page | Clicks | Impressions | CTR | Position |');
      console.log('| --- | --- | --- | --- | --- |');
      for (const row of pages) {
        const p = row.keys[0];
        console.log(
          `| ${p} | ${row.clicks} | ${row.impressions} | ${((row.ctr ?? 0) * 100).toFixed(1)}% | ${(row.position ?? 0).toFixed(1)} |`
        );
      }
      console.log('');
    } else {
      console.log('No page data.\n');
    }
  } catch (err) {
    console.error('Error fetching top pages:', err.message);
  }

  // --- GA4: Traffic summary ---
  if (GA4_PROPERTY_ID) {
    console.log('## GA4 Traffic Summary (Last 28 Days)\n');
    try {
      const traffic = await ga4.getTrafficSummary(GA4_PROPERTY_ID, startDate28d, endDate);
      if (traffic.rows?.length) {
        const metricNames = traffic.metricHeaders.map((h) => h.name);
        const values = traffic.rows[0].metricValues.map((v) => v.value);
        for (let i = 0; i < metricNames.length; i++) {
          console.log(`- ${metricNames[i]}: ${values[i]}`);
        }
        console.log('');
      } else {
        console.log('No GA4 data for this period.\n');
      }
    } catch (err) {
      console.error('Error fetching GA4 traffic:', err.message);
    }

    console.log('## GA4 Top Landing Pages (Last 28 Days)\n');
    try {
      const landingPages = await ga4.getTopLandingPages(GA4_PROPERTY_ID, startDate28d, endDate, 15);
      if (landingPages.rows?.length) {
        console.log('| Landing Page | Sessions |');
        console.log('| --- | --- |');
        for (const row of landingPages.rows) {
          const page = row.dimensionValues[0].value;
          const sessions = row.metricValues[0].value;
          console.log(`| ${page} | ${sessions} |`);
        }
        console.log('');
      } else {
        console.log('No landing page data.\n');
      }
    } catch (err) {
      console.error('Error fetching GA4 landing pages:', err.message);
    }

    console.log('## GA4 Traffic by Channel (Last 28 Days)\n');
    try {
      const channels = await ga4.getTrafficByChannel(GA4_PROPERTY_ID, startDate28d, endDate);
      if (channels.rows?.length) {
        console.log('| Channel | Sessions | Users |');
        console.log('| --- | --- | --- |');
        for (const row of channels.rows) {
          const channel = row.dimensionValues[0].value;
          const sessions = row.metricValues[0].value;
          const users = row.metricValues[1].value;
          console.log(`| ${channel} | ${sessions} | ${users} |`);
        }
        console.log('');
      } else {
        console.log('No channel data.\n');
      }
    } catch (err) {
      console.error('Error fetching GA4 channels:', err.message);
    }
  } else {
    console.log('## GA4\n');
    console.log('Skipping GA4 — set GA4_PROPERTY_ID in your environment or .env file.\n');
  }

  console.log('---');
  console.log('Report complete.');
}

generateReport().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
