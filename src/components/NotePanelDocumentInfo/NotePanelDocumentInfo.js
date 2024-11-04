import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NotePanelDocumentInfo.scss';

const propTypes = {
  docInfo: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

function NotePanelDocumentInfo(props) {
  const { docInfo } = props;
  const notePanelDocumentInfoClass = classNames('NotePanelDocumentInfo');

  const docInfoStyle = {
    '--docInfo-text-color': '#f0f0f0',
  };

  return (
    <div className={notePanelDocumentInfoClass} style={docInfoStyle}>
      {docInfo && docInfo.text}
    </div>
  );
}


NotePanelDocumentInfo.propTypes = propTypes;

export default NotePanelDocumentInfo;