import React, { useCallback, useState } from 'react';
import { useAsyncFn } from 'react-use';

import { uploadFile } from '../../api/server';

import { Header } from '../Header';
import { Preview } from '../Preview';

const App = () => {

  const [showLines, setShowLines] = useState(false);

  const [state, upload] = useAsyncFn(async (file) => {
    return await uploadFile(file);
  }, []);

  const onUpload = useCallback(file => {
    upload(file);
  })

  const onShowLines = useCallback(() => {
    setShowLines(!showLines);
  },[showLines, setShowLines]);

  const pdfContent = state.value || null;

  return (
    <div className="app">
      <Header
        onUpload={onUpload}
        onShowLines={onShowLines}
      />
      <Preview
        content={pdfContent}
        showLines={showLines}
      />
    </div>
  );
}

export { App };
