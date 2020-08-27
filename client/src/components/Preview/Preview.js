import React from 'react';
import parse from 'react-html-parser';

const Preview = ({ content }) => {

  console.log('Preview.js [6], value:', content);
  const doc = content?.html?.doc;
  const pages = content?.html?.pages || [];
  const text = (pages[0] && pages[0].text) || [];

  const docStyle = {
    width: doc?.width || 800,
    height: doc?.height || 'auto',
  };

  const blocks = (Array.isArray(text))
    ? text.map(t => parse(t))
    : 'No data';

  return (
    <div className="preview">
      <div className="content" style={docStyle}>
        {blocks}
      </div>
    </div>
  );
};

export { Preview };
