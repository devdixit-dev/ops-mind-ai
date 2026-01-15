// // 1 - PDF to Text

// import fs from 'fs';
// import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

// export const pdfToText = async (filePath) => {
//   const buffer = fs.readFileSync(filePath);
//   const uint8Array = new Uint8Array(buffer)

//   const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;

//   let text = "";

//   for (let n = 1; n <= pdf.numPages; n++) {
//     const page = await pdf.getPage(n);
//     const content = await page.getTextContent();

//     const pageText = content.items.map((item) => item.str).join(" ");
//     text += pageText + "\n";
//   }

//   return text;
// }

// utils/pdfToText.js
import fs from "fs";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

export const pdfToText = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(buffer);

  const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;

  const pages = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    try {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const text = content.items
        .map(item => item.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      if (text.length > 0) {
        pages.push({
          pageNumber: pageNum,
          text,
        });
      }
    } catch (err) {
      console.error(`Failed to read page ${pageNum}`, err);
    }
  }

  return pages; // [{ pageNumber, text }]
};