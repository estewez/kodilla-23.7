import { connect } from 'react-redux';
import Lane from './Lane';
import { deleteLaneRequest, updateLaneRequest, editLane, moveBetweenLanesRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    if (sourceLaneId !== targetProps.lane.id) {
      targetProps.moveBetweenLanesRequest(
        noteId,
        sourceLaneId,
        targetProps.lane.id,
      );
    }
  },
};

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => {
      return { ...state.notes[noteId] };
    }).sort((a, b) => a.sort - b.sort),
  };
};

const mapDispatchToProps = {
  editLane,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanesRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget(),
  }))
)(Lane);
