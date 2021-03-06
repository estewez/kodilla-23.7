import React, { PropTypes } from 'react';
import style from './Note.css';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { compose } from 'redux';

class Note extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, isDragging, editing, children } = this.props;
    const dragSource = editing ? a => a : connectDragSource;
    return dragSource(connectDropTarget(
      <li
        className={style.Note}
        style={{
          opacity: isDragging ? 0 : 1,
        }}
      >{children}</li>
    ));
  }
}

Note.propTypes = {
  children: PropTypes.any,
  connectDragSource: PropTypes.any,
  isDragging: PropTypes.any,
  editing: PropTypes.any,
  connectDropTarget: PropTypes.any,
};

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
};

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    if (targetProps.id !== sourceProps.id && targetProps.laneId === sourceProps.laneId) {
      targetProps.moveWithinLaneRequest(targetProps.laneId, targetProps.id, sourceProps.id);
    }
  },
};

export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Note);
