import React from 'react';
import PropTypes from 'prop-types';

import NotePopup from 'components/NotePopup';
import NoteState from 'components/NoteState';
import Icon from 'components/Icon';
import NoteUnpostedCommentIndicator from 'components/NoteUnpostedCommentIndicator';
import Choice from 'components/Choice';

import getLatestActivityDate from 'helpers/getLatestActivityDate';
import getColor from 'helpers/getColor';
import { isDarkColorHex, isLightColorHex } from 'helpers/color';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import core from 'core';
import { NotesPanelSortStrategy } from 'constants/sortStrategies';
import Theme from 'constants/theme';
import { OFFICE_EDITOR_TRACKED_CHANGE_KEY } from 'constants/officeEditor';

import './NoteHeader.scss';

const propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  color: PropTypes.string,
  fillColor: PropTypes.string,
  annotation: PropTypes.object,
  language: PropTypes.string,
  noteDateFormat: PropTypes.string,
  isSelected: PropTypes.bool,
  setIsEditing: PropTypes.func,
  notesShowLastUpdatedDate: PropTypes.bool,
  isUnread: PropTypes.bool,
  renderAuthorName: PropTypes.func,
  isNoteStateDisabled: PropTypes.bool,
  isEditing: PropTypes.bool,
  noteIndex: PropTypes.number,
  sortStrategy: PropTypes.string,
  activeTheme: PropTypes.string,
  isMultiSelected: PropTypes.bool,
  isMultiSelectMode: PropTypes.bool,
  handleMultiSelect: PropTypes.func,
  isGroupMember: PropTypes.bool,
  showAnnotationNumbering: PropTypes.bool,
  isTrackedChange: PropTypes.bool,
};

function NoteHeader(props) {
  const {
    icon,
    iconColor,
    annotation,
    language,
    noteDateFormat,
    isSelected,
    setIsEditing,
    notesShowLastUpdatedDate,
    isReply,
    isUnread,
    renderAuthorName,
    isNoteStateDisabled,
    isEditing,
    noteIndex,
    sortStrategy,
    activeTheme,
    isMultiSelected,
    isMultiSelectMode,
    handleMultiSelect,
    isGroupMember,
    showAnnotationNumbering,
    timezone,
    isTrackedChange,
  } = props;

  const [t] = useTranslation();

  let date;
  const dateCreated = (sortStrategy === NotesPanelSortStrategy.MODIFIED_DATE || (notesShowLastUpdatedDate && sortStrategy !== NotesPanelSortStrategy.CREATED_DATE)) ? getLatestActivityDate(annotation) : annotation.DateCreated;
  if (timezone && dateCreated) {
    const datetimeStr = dateCreated.toLocaleString('en-US', { timeZone: timezone });
    date = new Date(datetimeStr);
  } else {
    date = dateCreated;
  }

  let color = annotation[iconColor]?.toHexString?.();

  if (activeTheme === Theme.DARK && color && isDarkColorHex(color)) {
    color = '#FFFFFF';
  } else if (activeTheme === Theme.LIGHT && color && isLightColorHex(color)) {
    color = '#000000';
  }

  const fillColor = getColor(annotation.FillColor);
  const annotationAssociatedNumber = annotation.getAssociatedNumber();
  const annotationDisplayedAssociatedNumber = `#${annotationAssociatedNumber} - `;

  const authorAndDateClass = classNames('author-and-date', { isReply });
  const noteHeaderClass = classNames('NoteHeader', { parent: !isReply && !isGroupMember });

  const acceptTrackedChange = (trackedChangeAnnot) => {
    const trackedChangeId = trackedChangeAnnot.getCustomData(OFFICE_EDITOR_TRACKED_CHANGE_KEY);
    core.getOfficeEditor().acceptTrackedChange(trackedChangeId);
  };
  const rejectTrackedChange = (trackedChangeAnnot) => {
    const trackedChangeId = trackedChangeAnnot.getCustomData(OFFICE_EDITOR_TRACKED_CHANGE_KEY);
    core.getOfficeEditor().rejectTrackedChange(trackedChangeId);
  };
  return (
    <div className={noteHeaderClass}>
      {!isReply && (
        <div className="type-icon-container">
          {isUnread && <div className="unread-notification"></div>}
          <Icon className="type-icon" glyph={icon} color={color} fillColor={fillColor}/>
        </div>
      )}
      <div className={authorAndDateClass}>
        <div className="author-and-overflow">
          <div className="author-and-time">
            <div className="author">
              {showAnnotationNumbering && annotationAssociatedNumber !== undefined && (
                <span className="annotation-number">{annotationDisplayedAssociatedNumber}</span>
              )}
              {renderAuthorName(annotation)}
            </div>
            <div className="date-and-num-replies">
              <div className="date-and-time">
                {date ? dayjs(date).locale(language).format(noteDateFormat) : t('option.notesPanel.noteContent.noDate')}
                {isGroupMember && ` (Page ${annotation.PageNumber})`}
              </div>
            </div>
          </div>
          <div className="state-and-overflow">
            {isMultiSelectMode && !isGroupMember && !isReply && (
              <Choice
                id={`note-multi-select-toggle_${annotation.Id}`}
                checked={isMultiSelected}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleMultiSelect(!isMultiSelected);
                }}
              />
            )}
            <NoteUnpostedCommentIndicator annotationId={annotation.Id}/>
            {!isNoteStateDisabled && !isReply && !isMultiSelectMode && !isGroupMember && !isTrackedChange && (
              <NoteState annotation={annotation} isSelected={isSelected}/>
            )}
            {!isEditing && isSelected && !isMultiSelectMode && !isGroupMember && !isTrackedChange && (
              <NotePopup noteIndex={noteIndex} annotation={annotation} setIsEditing={setIsEditing} isReply={isReply}/>
            )}
            {isSelected && isTrackedChange && !isMultiSelectMode && (
              <>
                <div className="tracked-change-icon-wrapper" onClick={() => acceptTrackedChange(annotation)}>
                  <Icon className="tracked-change-icon" glyph="icon-menu-checkmark"/>
                </div>
                <div className="tracked-change-icon-wrapper" onClick={() => rejectTrackedChange(annotation)}>
                  <Icon className="tracked-change-icon" glyph="icon-close"/>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

NoteHeader.propTypes = propTypes;
export default NoteHeader;
