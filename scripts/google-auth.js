const { google } = require('googleapis');
const path = require('path');

function getAuthClient(scopes) {
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!keyFile) {
    throw new Error('Missing GOOGLE_APPLICATION_CREDENTIALS env var');
  }
  return new google.auth.GoogleAuth({
    keyFile: path.resolve(keyFile),
    scopes,
  });
}

module.exports = { getAuthClient };
