import { patchExample } from "./docx-editor.js"
import { authorize, listMajors, dataFromDB } from "./google-sheets.js"
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

authorize().then(listMajors).catch(console.error).then(
rl.question(`Which position?`, num => {
    patchExample(dataFromDB[parseInt(num-2)][1],dataFromDB[parseInt(num-2)][9]);
    console.log("Invoice is ready.");
    rl.close();
}));