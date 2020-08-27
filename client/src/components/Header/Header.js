import React, { useCallback, useState } from 'react';

const Header = ({ onUpload }) => {

  const [file, setFile] = useState(null);

  const onChangeFile = useCallback(({ target }) => {
    const { files } = target;
    const resFiles = (files && files.length > 0) ? files[0] : null;
    setFile(resFiles);
  }, [setFile]);

  const onClickUpload = useCallback(() => {
    onUpload(file);
    setFile('');
  }, [file, onUpload, setFile]);

  return (
    <div className="header">
      <div className="label">Select file to upload:</div>
      <input
        className="file"
        type="file"
        name="document"
        accept="application/pdf"
        onChange={onChangeFile}
      />
      <button className="btn" onClick={onClickUpload}>
        Upload
      </button>
    </div>
  );
};

export default Header;
export { Header };

