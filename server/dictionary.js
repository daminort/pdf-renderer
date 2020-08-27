const pdfColors = [
  '#000000',		// 0
  '#ffffff',		// 1
  '#4c4c4c',		// 2
  '#808080',		// 3
  '#999999',		// 4
  '#c0c0c0',		// 5
  '#cccccc',		// 6
  '#e5e5e5',		// 7
  '#f2f2f2',		// 8
  '#008000',		// 9
  '#00ff00',		// 10
  '#bfffa0',		// 11
  '#ffd629',		// 12
  '#ff99cc',		// 13
  '#004080',		// 14
  '#9fc0e1',		// 15
  '#5580ff',		// 16
  '#a9c9fa',		// 17
  '#ff0080',		// 18
  '#800080',		// 19
  '#ffbfff',		// 20
  '#e45b21',		// 21
  '#ffbfaa',		// 22
  '#008080',		// 23
  '#ff0000',		// 24
  '#fdc59f',		// 25
  '#808000',		// 26
  '#bfbf00',		// 27
  '#824100',		// 28
  '#007256',		// 29
  '#008000',		// 30
  '#000080',		// 31
  '#008080',		// 32
  '#800080',		// 33
  '#ff0000',		// 34
  '#0000ff',		// 35
  '#008000',		// 36
  '#000000',		// 37
];

const pdfFonts = [
  'QuickType,Arial,Helvetica,sans-serif',							            // 0 - QuickType - sans-serif variable font
  'QuickType Condensed,Arial Narrow,Arial,Helvetica,sans-serif',	// 1 - QuickType Condensed - thin sans-serif variable font
  'QuickTypePi',													                        // 2 - QuickType Pi
  'QuickType Mono,Courier New,Courier,monospace',					        // 3 - QuickType Mono - san-serif fixed font
  'OCR-A,Courier New,Courier,monospace',							            // 4 - OCR-A - OCR readable san-serif fixed font
  'OCR B MT,Courier New,Courier,monospace'							          // 5 - OCR-B MT - OCR readable san-serif fixed font
];

const cssProperties = {
  fontFace: 'font-face',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  fontStyle: 'font-style',
  zIndex: 'z-index',
  borderBottom: 'border-bottom',
  borderLeft: 'border-left',
}

const pixelProperties = [
  'left',
  'top',
  'fontSize',
  'width',
  'height',
];

const getColor = (index) => pdfColors[index] || pdfColors[0];

const getFont = (index) => pdfFonts[index] || pdfFonts[0];

const createStyle = (style) => {
  let result = '';
  Object.keys(style).forEach(key => {
    const value = style[key];
    const propertyName = cssProperties[key] || key;
    const propertyValue = pixelProperties.includes(key) ? `${value}px` : value;
    result = result.concat(`${propertyName}:${propertyValue};`);
  });

  return result;
}

const createDataAttributes = (data) => {
  let result = '';
  Object.keys(data).forEach(key => {
    const name = `data-${key}`;
    const value = data[key];
    result = result.concat(`${name}="${value}"`);
  });

  return result;
}

module.exports = {
  getColor,
  getFont,
  createStyle,
  createDataAttributes,
};
