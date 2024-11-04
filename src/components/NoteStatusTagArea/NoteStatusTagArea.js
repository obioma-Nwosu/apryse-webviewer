import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NoteStatusTagArea.scss';

const propTypes = {
  tag: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    backgroundColor: PropTypes.string,
  })),
};

function NoteStatusTagArea(props) {
  const {
    tag,
  } = props;

  const noteStatusTagAreaClass = classNames('NoteStatusTagArea');

  const tagStyle = {
    '--tag-background-color': tag.backgroundColor || '#FF2640',
    '--tag-text-color': '#f0f0f0',
  };

  return (
    <div className={noteStatusTagAreaClass} style={tagStyle}>
      {tag && tag.text}
    </div>
  );
}

NoteStatusTagArea.propTypes = propTypes;

export default NoteStatusTagArea;