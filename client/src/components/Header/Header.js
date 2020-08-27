import React, { useCallback, useState } from 'react';

const Header = ({ onUpload, onShowLines }) => {

  const [file, setFile] = useState(null);

  const onChangeFile = useCallback(({ target }) => {
    const { files } = target;
    const resFiles = (files && files.length > 0) ? files[0] : null;
    setFile(resFiles);
  }, [setFile]);

  const onClickUpload = useCallback(() => {
    if (!file) {
      return;
    }

    onUpload(file);
    setFile(null);
  }, [file, onUpload, setFile]);

  const onChangeShowLines = useCallback(({ target }) => {
    onShowLines(target.checked);
  }, [onShowLines]);

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
      <label className="show-lines">
        <input type="checkbox" onChange={onChangeShowLines} />
        <span>Show lines</span>
      </label>
      <button
        className="btn"
        disabled={!file}
        onClick={onClickUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default Header;
export { Header };

