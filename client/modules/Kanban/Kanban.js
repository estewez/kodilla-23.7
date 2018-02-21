import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { compose } from 'redux';

const Kanban = (props) => {
  return (
    <div className={styles.Kanban}>
      <div className={styles.Header}>
        <h1 className={styles.title}>Kanban</h1>
        <button className={styles.button} onClick={() => props.createLane({ name: 'New lane (click to edit)' })}>Add Lane</button>
      </div>
      <Lanes lanes={props.lanes} />
      <div className={styles.Footer}>
        <h2>© 2018 Tomasz Pajor</h2>
      </div>
    </div>
  );
};

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
  fetchLanes: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes),
});

const mapDispatchToProps = {
  createLane: createLaneRequest,
  fetchLanes,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban);
