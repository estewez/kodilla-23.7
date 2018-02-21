import React, { PropTypes } from 'react';
import NoteContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';

// Import Style
import styles from './Lane.css';

const Lane = (props) => {
  const { connectDropTarget, lane, laneNotes, updateLane, addNote, deleteLane, editLane } = props;
  const laneId = lane.id;
  return connectDropTarget(
    <div className={styles.Lane}>
      <div className={styles.name}>
        <div>
          <button className={styles.deleteButton} onClick={() => deleteLane(lane)}>X</button>
        </div>
        <Edit
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => {
            return editLane(laneId);
          }}
          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <div>
          <button className={styles.addButton} onClick={() => addNote({ task: 'New Note (click on text to edit)' }, laneId)}>Add Note</button>
        </div>
      </div>
      <NoteContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
  connectDropTarget: PropTypes.any,
};

export default Lane;
