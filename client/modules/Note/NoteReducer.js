import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_NOTES, EDIT_NOTE, MOVE_WITHIN_LANE } from './NoteActions';
import { MOVE_BETWEEN_LANES } from '../Lane/LaneActions';
const initialState = {};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
    case UPDATE_NOTE: {
      return { ...state, [action.note.id]: action.note };
    }

    case EDIT_NOTE: {
      const note = { ...state[action.noteId], editing: true };
      return { ...state, [action.noteId]: note };
    }

    case DELETE_NOTE:
    case MOVE_WITHIN_LANE: {
      const notesArray = action.lane.notes;
      let copyState = state;
      notesArray.forEach(note => {
        copyState = { ...copyState, [note.id]: note };
      });
      return { ...copyState };
    }

    case CREATE_NOTES: {
      const notesArray = Object.values(action.notes);
      let notesCopy = { ...action.notes };
      notesArray.forEach(note => {
        const noteWithEditing = { ...note, editing: false };
        notesCopy = { ...notesCopy, [note.id]: noteWithEditing };
      });
      return { ...notesCopy };
    }

    case MOVE_BETWEEN_LANES: {
      const sourceNote = action.lane.notes.filter(note => note.id === action.noteId)[0];
      sourceNote.sort = action.lane.notes.length;
      return { ...state, [action.noteId]: sourceNote };
    }

    default: {
      return state;
    }
  }
}
