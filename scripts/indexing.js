/**
 * Google Indexing API client
 * https://developers.google.com/search/apis/indexing-api/v3
 *
 * Requirements:
 * 1. Verify domain ownership in Search Console
 * 2. Authorise the service account as an owner in Search Console
 * 3. Enable the Indexing API in Google Cloud
 */

const { google } = require('googleapis');
const { getAuthClient } = require('./google-auth');

const SCOPES = ['https://www.googleapis.com/auth/indexing'];

async function getIndexingClient() {
  const auth = await getAuthClient(SCOPES);
  return google.indexing({ version: 'v3', auth });
}

/**
 * Submit a URL for indexing (or re-indexing)
 * @param {string} url - Full URL to submit
 * @param {string} type - 'URL_UPDATED' or 'URL_DELETED'
 */
async function submitUrl(url, type = 'URL_UPDATED') {
  const client = await getIndexingClient();
  const res = await client.urlNotifications.publish({
    requestBody: {
      url,
      type,
    },
  });
  return res.data;
}

/**
 * Get the current status of a URL in the indexing queue
 * @param {string} url - Full URL
 */
async function getUrlStatus(url) {
  const client = await getIndexingClient();
  const res = await client.urlNotifications.getMetadata({
    url,
  });
  return res.data;
}

module.exports = {
  submitUrl,
  getUrlStatus,
};
