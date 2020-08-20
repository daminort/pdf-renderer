const express = require('express');
const cors = require("cors")({ origin: true });
const {
  uploadFile,
  parseContent,
  removeFile,
  extractHTML,
} = require('./utils');

const port = process.env.PORT || 3001;

const app = express();
app.use(cors);

app.post('/pdf', async (req, res, next) => {

  const result = {
    file: '',
    html: '',
    json: '',
    pages: [],
    error: null,
  };

  let path = '';

  try {
    const fileData = await uploadFile(req);

    result.file = fileData.name;
    path = fileData.path;

  } catch (e) {
    result.error = e.message || 'File uploading: something went wrong :(';
    res.status(200).json(result);
    return;
  }

  try {
    result.json = await parseContent(path);

  } catch (e) {
    result.error = e.message || 'File parsing: something went wrong :(';
    res.status(200).json(result);
    return;
  }
  
  result.html = extractHTML(result.json);

  removeFile(path);
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});
