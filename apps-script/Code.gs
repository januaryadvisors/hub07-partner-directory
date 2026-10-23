/**
 * HUB 07 Partner Directory — reminder logging
 *
 * Deploy as a web app:
 *   Extensions > Apps Script > Deploy > New deployment
 *   Type: Web app
 *   Execute as: Me (the sheet owner)
 *   Who has access: Anyone
 *
 * After deploy, paste the web app URL into CONFIG.APPS_SCRIPT_URL in index.html.
 *
 * After an ownership transfer (see README), the new owner (Kaitlin Dominski) must:
 *   1. Open Extensions > Apps Script in the sheet.
 *   2. Deploy > Manage deployments.
 *   3. Edit the existing deployment, click Deploy (no changes needed).
 *   4. Copy the new web app URL and paste it into CONFIG.APPS_SCRIPT_URL in index.html.
 */

const SHEET_NAME = 'Reminder Log';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const orgs    = Array.isArray(payload.orgs) ? payload.orgs : [];

    orgs.forEach(org => {
      sheet.appendRow([
        payload.timestamp || new Date().toISOString(),
        payload.sender    || '',
        payload.type      || '',
        org.name          || '',
        org.contactEmail  || '',
      ]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Health check — visit the web app URL in a browser to confirm it is live. */
function doGet() {
  return ContentService
    .createTextOutput('HUB 07 reminder logger is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
