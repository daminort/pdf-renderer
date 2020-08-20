const fs = require('fs');
const PDFParser = require('pdf2json');
const formidable = require('formidable');

const {
  getColor,
  getFont,
  createStyle,
} = require('./dictionary');

function uploadFile(req) {

  const form = formidable({
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {

    form.parse(req, (err, _, files) => {
      if (err) {
        reject(err);
      }

      const file = files.document;
      if (!file) {
        const err = new Error('No field called "document" in form data or empty file');
        reject(err);
      }

      const { path, name } = file;

      resolve({
        path,
        name,
      });
    });
  });
}

function parseContent(path) {
  const parser = new PDFParser();
  parser.loadPDF(path);

  return new Promise((resolve, reject) => {
    parser.on('pdfParser_dataError', reject);
    parser.on('pdfParser_dataReady', data => resolve(decodeText(data)));
  });
}

function removeFile(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    }
  })
}

function decodeText(pdfData) {
  for (let page of pdfData.formImage.Pages) {
    for (let item of page.Texts) {
      item.text = decodeURIComponent(item.R[0].T);
    }
  }

  return pdfData;
}

function scaleContent(pdfData, scale = 1) {

  pdfData.formImage.Width = pdfData.formImage.Width * scale;

  for (let page of pdfData.formImage.Pages) {
    page.Height = page.Height * scale;

    for (let item of page.Texts) {
      item.x = item.x * scale;
      item.y = item.y * scale;
    }

    for (let item of page.HLines) {
      item.x = item.x * scale;
      item.y = item.y * scale;
      item.l = item.l * scale;
    }

    for (let item of page.VLines) {
      item.x = item.x * scale;
      item.y = item.y * scale;
      item.l = item.l * scale;
    }
  }

  return pdfData;
}

function detectScale(pageWidth) {
  const range = [50, 40, 30, 20, 10];
  for (let scale of range) {
    const resWidth = pageWidth * scale;
    if (resWidth <= 800) {
      return scale;
    }
  }

  return 1;
}

function extractHTML(pdfData) {

  const { formImage } = pdfData;
  const pageWidth = formImage.Width;

  const scale = detectScale(pageWidth);

  const result = {
    doc: {
      scale,
      width: formImage.Width * scale,
      height: 0,
    },
    pages: [],
  };

  for (let page of formImage.Pages) {
    const pageHeight = page.Height * scale;
    if (pageHeight > result.doc.height) {
      result.doc.height = pageHeight;
    }

    const htmlPage = {
      number: result.pages.length + 1,
      text: [],
      hLines: [],
      vLines: [],
    };

    for (let item of page.Texts) {
      const { x, y, text, clr, R } = item;
      const fontConfig = R[0].TS;
      const [fontID, fontSize, isBold, isItalic] = fontConfig;

      const style = createStyle({
        position: 'absolute',
        left: x * scale,
        top: y * scale,
        color: getColor(clr),
        fontFace: getFont(fontID),
        fontSize,
        fontWeight: !!isBold ? 'bold' : 'normal',
        fontStyle: !!isItalic ? 'italic' : 'normal',
      });

      const dataAttributes = `data-posX="${x}" data-posY="${y}"`;

      const html = `<div ${dataAttributes} style="${style}">${text}</div>`;

      htmlPage.text.push(html);
    }

    // for (let item of page.HLines) {
    //   item.x = item.x * scale;
    //   item.y = item.y * scale;
    //   item.l = item.l * scale;
    // }
    //
    // for (let item of page.VLines) {
    //   item.x = item.x * scale;
    //   item.y = item.y * scale;
    //   item.l = item.l * scale;
    // }

    result.pages.push(htmlPage);
  }

  return result;
}

module.exports = {
  uploadFile,
  parseContent,
  removeFile,
  scaleContent,
  extractHTML,
};