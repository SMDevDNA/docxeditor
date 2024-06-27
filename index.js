import { patchExample } from "./docx-editor.js"
import { authorize, listMajors, dataFromDB } from "./google-sheets.js"
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let counter;

authorize().then(listMajors).catch(console.error).then(
rl.question(`Which position?`, num => {
    console.log(dataFromDB[parseInt(num-2)]);
    patchExample(dataFromDB[parseInt(num-2)][1],dataFromDB[parseInt(num-2)][9]);
    rl.close();
}));