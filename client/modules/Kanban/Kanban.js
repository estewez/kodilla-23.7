import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from '../Lane/Lane.css';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { compose } from 'redux';

class Kanban extends React.Component {
  componentDidMount() {
    this.props.fetchLanes();
  }
  render() {
    return (
      <div>
        <button className={styles.AddLane} onClick={() => this.props.createLane({ name: 'New lane' })}>Add Lane</button>
        <Lanes lanes={this.props.lanes} />
      </div>
    );
  }
}

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
