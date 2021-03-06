import callApi from '../../util/apiCaller';

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const MOVE_WITHIN_LANE = 'MOVE_WITHIN_LANE';

// Export Actions

export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note,
  };
}

export function createNotes(notesData) {
  return {
    type: CREATE_NOTES,
    notes: notesData,
  };
}

export function createNoteRequest(note, laneId) {
  return (dispatch) => {
    return callApi('notes', 'post', { note, laneId }).then(noteResp => {
      dispatch(createNote(noteResp, laneId));
    });
  };
}

export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note,
  };
}

export function updateNoteRequest(note) {
  return (dispatch) => {
    return callApi(`notes/${note.id}`, 'put', note).then(() => {
      dispatch(updateNote(note));
    });
  };
}

export function deleteNote(lane, noteId, laneId) {
  return {
    type: DELETE_NOTE,
    lane,
    noteId,
    laneId,
  };
}

export function deleteNoteRequest(noteId, laneId) {
  return (dispatch) => {
    return callApi(`notes/${noteId}/${laneId}`, 'delete').then(res =>
      dispatch(deleteNote(res, noteId, laneId))
    );
  };
}

export function editNote(noteId) {
  return {
    type: EDIT_NOTE,
    noteId,
  };
}

export function moveWithinLane(lane, laneId, targetId, sourceId) {
  return {
    type: MOVE_WITHIN_LANE,
    lane,
    laneId,
    targetId,
    sourceId,
  };
}

export function moveWithinLaneRequest(laneId, targetId, sourceId) {
  return (dispatch) => {
    return callApi(`move-within/${laneId}/${targetId}/${sourceId}`, 'put').then(res => {
      dispatch(moveWithinLane(res, laneId, targetId, sourceId));
    });
  };
}
