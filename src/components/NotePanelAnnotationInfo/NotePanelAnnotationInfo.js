import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NotePanelAnnotationInfo.scss';

const propTypes = {
  annotInfo: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

function NotePanelAnnotationInfo(props) {
  const { annotInfo } = props;
  const notePanelAnnotationInfoClass = classNames('NotePanelAnnotationInfo');

  const annotInfoStyle = {
    '--annotInfo-text-color': '#f0f0f0',
  };

  return (
    <div className={notePanelAnnotationInfoClass} style={annotInfoStyle}>
      {annotInfo && annotInfo.text}
    </div>
  );
}


NotePanelAnnotationInfo.propTypes = propTypes;

export default NotePanelAnnotationInfo;
