import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NoteButtonArea.scss';

const propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
  })),
};

function NoteButtonArea(props) {
  const {
    buttons,
  } = props;

  const noteButtonAreaClass = classNames('NoteButtonArea');

  const buttonStyle = (button) => ({
    '--button-color': button.color ? button.color : 'var(--primary-button)',
  });

  const renderButtons = () => {
    return buttons.map((button, index) => (
      <button key={index} onClick={button.onClick} style={buttonStyle(button)}>
        {button.label}
      </button>
    ));
  };

  return (
    <div className={noteButtonAreaClass}>
      {buttons && renderButtons()}
    </div>
  );
}

NoteButtonArea.propTypes = propTypes;

export default NoteButtonArea;
