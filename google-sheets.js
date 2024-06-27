import fs from "fs";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

export let dataFromDB;
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.promises.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.promises.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.promises.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1wfnqOPmGjmCKqJ7-4-W5DQRfS97GYFcFyAXsyj3hXRM/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export async function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1wfnqOPmGjmCKqJ7-4-W5DQRfS97GYFcFyAXsyj3hXRM',
        range: 'ГЕНЕРАТОРИ!A2:K',
    });
    const rows = res.data.values;
    dataFromDB = rows;
    console.log(dataFromDB);
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    console.log('S/N, Назва:');
    /*rows.forEach((row) => {
        // Columns A0,B1,C2,D3,E4,F5,G6,H7,I8,J9,K10
        console.log(`${row[0]}, ${row[1]}`);
    });*/
}
