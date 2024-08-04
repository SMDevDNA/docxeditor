import { patchExample } from "./docx-editor.js"
import { authorize, listMajors } from "./google-sheets.js"
import readline from 'node:readline';
import express from 'express';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let dataFromDB;

authorize()
    .then(listMajors)
    .then(data => {dataFromDB = data})
    .then(
        rl.question(`Which position?`, num => {
            patchExample(dataFromDB[parseInt(num-2)][1],dataFromDB[parseInt(num-2)][9]);
            console.log("Invoice is ready.");
            rl.close();
        })
    )
    .catch(console.error);

const app = express();

const port = 4300;

app.use('/', (req, res) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(dataFromDB);

});

app.listen(port, () => {

    console.log(`Сервер запущен на порту ${port}`);

});