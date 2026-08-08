# Google API Auth — The Sales Guy

This project pulls data from **Google Search Console**, **GA4**, and the **Indexing API** using a single existing service account.

---

## ⚠️ READ THIS FIRST — Don't create a new service account

There is **already a working service account** on this project:

```
gtm-api@peaceful-stock-427704-s9.iam.gserviceaccount.com
```

It is an **Administrator on the "Astra Designs" GA4 account**, which is the parent of all 21 GA4 properties on this account — including `The Sales Guy` (`properties/512526813`).

**Do not create a new service account in a new GCP project.** GA4's "Add User" dialog will reject brand-new service account emails with `"This email doesn't match a Google Account"`. The `gtm-api@…` email works because it was added years ago. Reuse it.

---

## Quick Setup (using the existing service account)

```bash
# 1. Generate a fresh JSON key for the existing service account
gcloud iam service-accounts keys create ./service-account-key.json \
  --iam-account=gtm-api@peaceful-stock-427704-s9.iam.gserviceaccount.com \
  --project=peaceful-stock-427704-s9

# 2. Copy env template and fill in values
cp .env.example .env
# Then edit .env so it contains:
#   GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
#   SITE_URL=https://thesalesguy.com.au/
#   GA4_PROPERTY_ID=512526813

# 3. Install deps
npm install

# 4. Sanity check
node -e "require('dotenv').config(); const { getAuthClient } = require('./scripts/google-auth'); getAuthClient(['https://www.googleapis.com/auth/analytics.readonly']).getClient().then(()=>console.log('auth OK'))"
```

---

## Search Console access (one-time, manual)

The service account is already on GA4. For Search Console you have to add it once via the UI:

1. Go to [Search Console](https://search.google.com/search-console) → `sc-domain:thesalesguy.com.au`
2. **Settings → Users and permissions → Add user**
3. Email: `gtm-api@peaceful-stock-427704-s9.iam.gserviceaccount.com`
4. Role: **Full** (Full is required for the Indexing API; Restricted is enough for read-only Search Console)

---

## Reference values

| Key | Value |
|---|---|
| GCP project | `peaceful-stock-427704-s9` ("My First Project") |
| Service account | `gtm-api@peaceful-stock-427704-s9.iam.gserviceaccount.com` |
| GA4 property ID | `512526813` ("The Sales Guy") |
| GA4 measurement ID | `G-08HPNCHLSP` (don't use this — the API needs the numeric ID) |
| Search Console property | `sc-domain:thesalesguy.com.au` |
| Site URL | `https://thesalesguy.com.au/` |

---

## What does NOT work (don't retry)

- **Creating a new GCP project + new service account.** GA4 rejects the new email as "not a real Google Account" even though it is valid.
- **`gcloud auth application-default login --scopes=...,indexing,...`** Returns "This app is blocked." The `indexing` scope is a Google "restricted" scope and gcloud's ADC OAuth client is not verified for it.
- **IAP brand / OAuth consent screen creation via API.** Fails with `"Project must belong to an organization"` on personal Gmail accounts.

---

## Run individual API scripts

```bash
# GA4 traffic summary
node -e "require('dotenv').config(); require('./scripts/ga4').getTrafficSummary(process.env.GA4_PROPERTY_ID, '28daysAgo', 'today').then(r => console.log(JSON.stringify(r, null, 2)))"

# Search Console — list sites (needs Search Console step above first)
node -e "require('dotenv').config(); require('./scripts/search-console').listSites().then(console.log)"

# Indexing API — submit a URL
node -e "require('dotenv').config(); require('./scripts/indexing').submitUrl('https://thesalesguy.com.au/blog/some-post/').then(console.log)"
```

---

## Security

- `service-account-key.json` is gitignored (`service-account*.json`, `*sa-key*.json`).
- `.env` is gitignored.
- If the key ever leaks: revoke it in GCP IAM → Service Accounts → Keys, then create a new one with the command above.

---

## Troubleshooting

| Error | Fix |
|---|---|
| `403: User does not have sufficient permission` | Service account isn't on the property — for GA4 it should already be (it's account-level admin). For Search Console, follow the manual step above. |
| `404: Property not found` | Confirm `GA4_PROPERTY_ID=512526813` in `.env` (not the `G-XXXXXXXX` measurement ID). |
| `accountSummaries` returns `{}` | Wrong scopes on the auth client. You need `https://www.googleapis.com/auth/analytics.readonly`. |
| `Token has been expired or revoked` | Generate a fresh key with the gcloud command above. |
| GA4 UI says "This email doesn't match a Google Account" | You're trying to add a different (newly created) service account. **Stop. Use `gtm-api@peaceful-stock-427704-s9.iam.gserviceaccount.com` instead.** |
