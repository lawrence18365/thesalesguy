/**
 * Google Analytics 4 Data API client
 * https://developers.google.com/analytics/devguides/reporting/data/v1
 *
 * NOTE: Use the numeric GA4 Property ID, not the Measurement ID (G-XXXXXXXX).
 * Find it in GA4 Admin > Property Settings > Property ID.
 */

const { google } = require('googleapis');
const { getAuthClient } = require('./google-auth');

const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

function getPropertyPath(propertyId) {
  const id = String(propertyId).replace(/^properties\//, '');
  return `properties/${id}`;
}

async function getAnalyticsClient() {
  const auth = await getAuthClient(SCOPES);
  return google.analyticsdata({ version: 'v1beta', auth });
}

/**
 * Run a custom report
 * @param {string} propertyId - Numeric GA4 property ID
 * @param {object} reportRequest - GA4 RunReportRequest body
 */
async function runReport(propertyId, reportRequest) {
  const client = await getAnalyticsClient();
  const res = await client.properties.runReport({
    property: getPropertyPath(propertyId),
    requestBody: reportRequest,
  });
  return res.data;
}

/**
 * Get basic traffic summary: sessions, users, newUsers, bounceRate, averageSessionDuration
 */
async function getTrafficSummary(propertyId, startDate, endDate) {
  return runReport(propertyId, {
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' },
    ],
  });
}

/**
 * Get top landing pages by sessions
 */
async function getTopLandingPages(propertyId, startDate, endDate, limit = 25) {
  return runReport(propertyId, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'landingPage' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit,
  });
}

/**
 * Get traffic by channel group
 */
async function getTrafficByChannel(propertyId, startDate, endDate) {
  return runReport(propertyId, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });
}

module.exports = {
  runReport,
  getTrafficSummary,
  getTopLandingPages,
  getTrafficByChannel,
};
