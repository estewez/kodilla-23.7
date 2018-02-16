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
      <div className={styles.LaneHeader}>
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNote({ task: 'New Note' }, laneId)}>Add Note</button>
        </div>
        <Edit
          className={styles.LaneName}
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(lane.id)}
          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <div className={styles.LaneDelete}>
          <button onClick={() => deleteLane(laneId)}>Remove Lane</button>
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
  laneNotes: PropTypes.object,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
  connectDropTarget: PropTypes.any,
};

export default Lane;
