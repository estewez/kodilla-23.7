import React, { Component, PropTypes } from 'react';
import style from './Edit.css';

export default class Edit extends Component {
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    const value = e.target.value;
    if (this.props.onUpdate) {
      this.props.onUpdate(value.trim());
    }
  };
  renderDelete = () => {
    return <button className={style.button} onClick={this.props.onDelete}>X</button>;
  };
  renderValue = () => {
    const { value, onDelete, onValueClick } = this.props;
    return (
      <div className={style.Value}>
        <span onClick={onValueClick}>{value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };
  renderEdit = () => {
    return (
      <textarea
        rows={10}
        className={style.Edit}
        type="text"
        autoFocus
        defaultValue={this.props.value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
      />
    );
  };
  render() {
    return (
      <div>
        {this.props.editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}

Edit.propTypes = {
  value: PropTypes.string,
  onUpdate: PropTypes.func,
  onValueClick: PropTypes.func,
  onDelete: PropTypes.func,
  editing: PropTypes.bool,
};
