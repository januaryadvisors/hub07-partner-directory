# HUB 07 Partner Directory

Internal partner directory for [HUB 07](https://hub07gr.org) (1534 Kalamazoo Ave SE, Grand Rapids), built for Amplify GR staff and HUB 07 partners.

**This page is unlisted, not password-protected.** The GitHub Pages URL is public to anyone who has it. Do not share it outside HUB 07 partners and AGR staff, and do not put anything in the sheet that AGR would not want a person with the link to see.

---

## How it works

`index.html` is a single static page hosted on GitHub Pages. It reads data live from the Google Sheet `HUB07_Partner_Directory_Data` using the gviz/tq CSV export. No server is needed.

## Setup checklist

### 1. Publish each sheet tab to the web

In Google Sheets: **File > Share > Publish to web**

Publish these tabs as CSV:
- Partners
- Contacts
- Programs
- Email Templates
- Dropdowns
- Reminder Log

Without publishing, the page cannot load any data.

### 2. Set the GitHub Pages URL in index.html

After the GitHub Pages site is live, open `index.html` and update this line in the CONFIG block:

```js
DIRECTORY_URL: window.location.href.split('?')[0],
```

Replace it with the actual URL, e.g.:

```js
DIRECTORY_URL: 'https://januaryadvisors.github.io/hub07-partner-directory/',
```

This URL appears in the reminder email templates.

### 3. Deploy the Apps Script for reminder logging

1. Open the sheet in Google Sheets.
2. Go to **Extensions > Apps Script**.
3. Replace any existing code with the contents of `apps-script/Code.gs`.
4. Click **Deploy > New deployment**.
   - Type: **Web app**
   - Execute as: **Me** (the sheet owner)
   - Who has access: **Anyone**
5. Copy the web app URL.
6. Paste it into `index.html` in the CONFIG block:
   ```js
   APPS_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_ID/exec',
   ```

Until the URL is configured, reminders still work — nothing is logged.

### 4. Enable GitHub Pages

In the GitHub repo: **Settings > Pages > Source: main branch, / (root)**.

The page will be live at `https://<org>.github.io/<repo>/`.

---

## Updating partner data

Edit the Google Sheet directly. Changes appear on the page after a refresh (allow a few minutes for Google's publish cache to update).

- **Status = Active**: shown by default
- **Status = Coming soon**: shown with a "Coming soon" badge
- Any other status (or blank): hidden

## After the ownership transfer

When the sheet and repo move to an AGR account (or to Kaitlin Dominski):

1. The new sheet owner opens **Extensions > Apps Script** in the sheet.
2. **Deploy > Manage deployments**.
3. Edit the existing deployment and click **Deploy** (run as the new owner, access: Anyone with the link).
4. Copy the new web app URL.
5. Paste it into `CONFIG.APPS_SCRIPT_URL` in `index.html` and commit.

The Apps Script is bound to the sheet and moves with it on ownership transfer.

## Editors

The sheet should have Jenny Luth and at least one other AGR person as editors from the start. Add editors via **Share** in Google Sheets.

## Pre-deploy check

Before committing, confirm no Cherry Hill values remain:

```bash
grep -ri "cherry" index.html apps-script/
grep -ri "script.google.com" index.html apps-script/
grep -ri "docs.google.com/spreadsheets" index.html | grep -v "1HSreicH-9X0XtBhWVX0pXm0YuG6wDWfBz0wl4vg8UOY"
```

All matches should be HUB 07 values or absent.
