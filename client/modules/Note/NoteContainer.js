import { connect } from 'react-redux';
import Notes from './Notes';
import { deleteNoteRequest, editNote, updateNoteRequest, moveWithinLaneRequest } from '../Note/NoteActions';

const mapDispatchToProps = {
  editNote,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  moveWithinLaneRequest,
};

export default connect(null, mapDispatchToProps)(Notes);
