import React, { useState, useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import { Document, Page } from 'react-pdf';
import JSONTree from 'react-json-tree';
import parse from 'react-html-parser';

import { PDF_BASE64_PREFIX, PDF_FILE_TYPE } from '../../constants/files';
import { THEME } from '../../constants/theme';

import { CommonUtils } from '../../utils/CommonUtils';
import { NotificationUtils } from '../../utils/NotificationUtils';
import { LogUtils } from '../../utils/LogUtils';
import { TemporaryServicePDF } from '../../services/TemporaryServicePDF';

import { Upload, Button } from '../../lib/ui';

import { invoiceTemplate, adobeSample } from './base64';
import { Wrapper } from './TemporaryPDF.style';

const invoiceFileURL = CommonUtils.base64toURL(invoiceTemplate, PDF_BASE64_PREFIX, PDF_FILE_TYPE);
const adobeFileURL = CommonUtils.base64toURL(adobeSample, PDF_BASE64_PREFIX, PDF_FILE_TYPE);

const TemporaryPDF = () => {

  const [currentFiles, setCurrentFiles] = useState([]);
  const [showPDF, setShowPDF] = useState(false);
  const [fileType, setFileType] = useState('invoice');

  const [fileContent, getFileContent] = useAsyncFn(async (mode) => {
    const result = await TemporaryServicePDF.uploadFile(currentFiles[0], mode);
    return result;
  }, [currentFiles]);

  const beforeUpload = useCallback((_, fileList) => {
    setCurrentFiles([fileList[0]]);
    return false;
  }, [currentFiles, currentFiles]);

  const onRemove = useCallback(file => {
    const newFileList = currentFiles.filter(currentFile => currentFile !== file);
    setCurrentFiles(newFileList);
  }, [currentFiles, setCurrentFiles]);

  const onClickRegular = useCallback(() => {
    getFileContent('pdf');
  }, [getFileContent]);

  const onClickShowPDF = useCallback(() => {
    setShowPDF(!showPDF);
  }, [showPDF, setShowPDF]);

  const onClickChangePDF = useCallback(() => {
    const newFileType = fileType === 'invoice' ? 'adobe' : 'invoice';
    setFileType(newFileType);
  }, [fileType, setFileType]);

  const onMouseUp = useCallback((event) => {

    const pdfPage = event.currentTarget.querySelector('.react-pdf__Page__textContent');

    const selection = window.getSelection();
    const selectedText = selection.toString();

    NotificationUtils.info('Selected text:', selectedText);
  }, []);

  const htmlDoc = fileContent?.value?.html?.doc || null;
  const htmlPages = fileContent?.value?.html?.pages || [];

  const showContent = !!htmlDoc;
  const btnTitle = showPDF ? 'Switch to Upload mode' : 'Switch to PDF view mode';
  const fileURL = (fileType === 'invoice') ? invoiceFileURL : adobeFileURL;

  LogUtils.info({ fileContent });

  let htmlStyle = {};
  let htmlItems = [];
  if (showContent) {

    htmlStyle = {
      width: htmlDoc.width,
      height: htmlDoc.height,
    };

    const htmlPage = htmlPages[0];

    htmlItems = htmlPage.text.map(htmlString => parse(htmlString))
  }

  return (
    <Wrapper>
      <Button className="switcher" onClick={onClickShowPDF}>
        {btnTitle}
      </Button>

      {!showPDF && (
        <>
          <h3>Upload files:</h3>
          <div className="upload">
            <Upload
              accept="*.pdf"
              multiple={false}
              fileList={currentFiles}
              uploaded={false}
              valid
              beforeUpload={beforeUpload}
              onRemove={onRemove}
            />
          </div>
          <div className="buttons">
            <Button
              type="primary"
              disabled={fileContent.loading}
              onClick={onClickRegular}
            >
              Upload
            </Button>
          </div>

          {showContent && (
            <div>
              <h3>HTML:</h3>
              <div className="sheet" style={htmlStyle}>
                {htmlItems}
              </div>
            </div>
          )}

          {showContent && (
            <div>
              <h3>Raw Content:</h3>
              <div className="sheet">
            <pre>
              <JSONTree data={fileContent?.value?.html} theme={THEME.jsonTree} hideRoot />
            </pre>
              </div>
            </div>
          )}
        </>
      )}

      {showPDF && (
        <>
          <Button className="change" onClick={onClickChangePDF}>
            Change PDF file
          </Button>
          <div className="sheet" onMouseUp={onMouseUp}>
            <Document
              id="pdf-sheet"
              file={fileURL}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </>
      )}

    </Wrapper>
  );
};

export default TemporaryPDF;
export { TemporaryPDF };
