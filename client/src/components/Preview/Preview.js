import React from 'react';
import parse from 'react-html-parser';

const Preview = ({ content, showLines }) => {

  const doc = content?.html?.doc;
  const pages = content?.html?.pages || [];

  const hLines = (pages[0] && pages[0].hLines) || [];
  const vLines = (pages[0] && pages[0].vLines) || [];
  const text = (pages[0] && pages[0].text) || [];

  const docStyle = {
    width: doc?.width || 800,
    height: doc?.height || 'auto',
  };

  const hl = (showLines && Array.isArray(hLines))
    ? hLines.map(line => parse(line))
    : null;

  const vl = (showLines && Array.isArray(vLines))
    ? vLines.map(line => parse(line))
    : null;

  const blocks = (Array.isArray(text))
    ? text.map(t => parse(t))
    : 'No data';

  return (
    <div className="preview">
      <div className="content" style={docStyle}>
        {hl}
        {vl}
        {blocks}
      </div>
    </div>
  );
};

export { Preview };
