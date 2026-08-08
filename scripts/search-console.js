/**
 * Google Search Console API client
 * https://developers.google.com/webmaster-tools/search-console-api-original/v3
 */

const { google } = require('googleapis');
const { getAuthClient } = require('./google-auth');

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

async function getSearchConsoleClient() {
  const auth = await getAuthClient(SCOPES);
  return google.webmasters({ version: 'v3', auth });
}

/**
 * List verified sites in Search Console
 */
async function listSites() {
  const client = await getSearchConsoleClient();
  const res = await client.sites.list();
  return res.data.siteEntry || [];
}

/**
 * Get search analytics data for a site
 * @param {string} siteUrl - e.g. 'sc-domain:thesalesguy.com.au' or 'https://thesalesguy.com.au/'
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @param {string[]} dimensions - e.g. ['query', 'page', 'country', 'device']
 * @param {number} rowLimit
 */
async function getSearchAnalytics(
  siteUrl,
  startDate,
  endDate,
  dimensions = ['query'],
  rowLimit = 1000
) {
  const client = await getSearchConsoleClient();
  const res = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });
  return res.data.rows || [];
}

/**
 * Get total clicks, impressions, CTR, and position for a date range
 */
async function getSearchPerformanceSummary(siteUrl, startDate, endDate) {
  const client = await getSearchConsoleClient();
  const res = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: [],
    },
  });
  return res.data.rows?.[0] || null;
}

module.exports = {
  listSites,
  getSearchAnalytics,
  getSearchPerformanceSummary,
};
