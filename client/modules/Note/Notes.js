import React, { PropTypes } from 'react';
import Note from './Note';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLaneRequest }) => (
  <ul>{notes.map(note =>
    <Note
      id={note.id}
      key={note.id}
      moveWithinLaneRequest={moveWithinLaneRequest}
      laneId={laneId}
      editing={note.editing}
    >
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onUpdate={task => updateNote({
          ...note,
          task,
          editing: false,
        })}
        onDelete={() => deleteNote(note.id, laneId)}
      />
    </Note>
  )}</ul>
);

Notes.propTypes = {
  deleteNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
  updateNote: PropTypes.func,
  moveWithinLaneRequest: PropTypes.func,
};

export default Notes;
