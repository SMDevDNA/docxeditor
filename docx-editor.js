import * as fs from "fs";
import {
    patchDocument,
    PatchType,
    TextRun
} from "docx";
import { convertToString } from "./numConverter.js";

const item_name = "Generator";
let currentDate = new Date;
let invoiceDate = currentDate.getDate() + "." + currentDate.getMonth() + "." + currentDate.getFullYear()

export function patchExample(item_name,price){

    patchDocument(fs.readFileSync("./invoicePattern.docx"),{
        outputType: "nodebuffer",
        patches: {
            invoiceDate: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun({
                        text: invoiceDate,
                        size: 28,
                        font: "Times New Roman",

                    })
                ]
            },
            item_name: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun({
                        text: item_name,
                        size: 20,
                        font: "Times New Roman",

                    })
                ]
            },
            price: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun({
                        text: price,
                        size: 28,
                        font: "Times New Roman",

                    })
                ]
            },
            summary: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun({
                        text: price,
                        size: 28,
                        font: "Times New Roman",

                    })
                ]
            },
            summary_transcription: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun({
                        text: convertToString(parseInt(price)),
                        size: 24,
                        font: "Times New Roman",

                    })
                ]
            },
        }
    }).then((doc) => {
        fs.writeFileSync("invoice.docx", doc);
    });
}

/*paragraphStyles: [
            {
                id: "normalPara",
                quickFormat: true,
                run: {
                    font: "Calibri",
                    size: 26,
                    bold: true,
                },
            }],
        patches: {
            invoiceDate: {
                type: PatchType.PARAGRAPH,
                children:  [ new Paragraph({
                    style: "normalPara",
                    text: invoiceDate
                })],
            },*/