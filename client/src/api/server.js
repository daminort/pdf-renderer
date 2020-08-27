import axios from 'axios';

const apiHost = 'http://localhost:3001';
const baseURL = `${apiHost}/pdf`;

async function uploadFile(file) {
  console.log('server.js [7]:', { file });

  const formData = new FormData();
  formData.append('document', file);

  console.log('server.js [10]:', { formData });

  const result = await axios.post(baseURL, formData, {
    headers: {},
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
  });
  if (result?.error) {
    console.error('Error: ', result?.error);
    return null;
  }

  return result;
}

export {
  uploadFile,
}
