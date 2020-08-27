import React, { useCallback, useState } from 'react';
import { useAsyncFn } from 'react-use';

import { uploadFile } from '../../api/server';

import { Header } from '../Header';
import { Preview } from '../Preview';

const App = () => {

  const [state, upload] = useAsyncFn(async (file) => {
    console.log('App.js [12], file:', file);
    return await uploadFile(file);
  }, []);

  const onUpload = useCallback(file => {
    console.log('App.js [17], file:', file);
    upload(file);
  })

  const pdfContent = state.value || null;

  return (
    <div className="app">
      <Header onUpload={onUpload} />
      <Preview content={pdfContent} />
    </div>
  );
}

export { App };
