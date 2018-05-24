import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loadTasks, initializeTaskForEditing, openNewTaskDialog } from '../../redux/ActionCreators'
import { bindActionCreators } from 'redux'
import TaskEditForm from './TaskEditForm'
import NewTaskForm from './NewTaskForm'

import { buttonStyle } from '../../modulesCss/appCss'

class TasksTable extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.props);
    this.props._loadTasks();
    this.drowRows = this.drowRows.bind(this);
    this.drowHeaders = this.drowHeaders.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let newState = Object.assign({}, this.state, nextProps);
    this.setState(newState);
  }

  drowHeaders() {
    if (this.state.tasks[0]) {
      let _headers = Object.keys(this.state.tasks[0]).map((property, index) => { return <TableHeaderColumn key={index}>{property}</TableHeaderColumn> });
      return _headers;
    }
    return null;
  }

  drowRows() {
    let mappedRows = this.state.tasks.map(
      (_task, index) => {
        let mappedRows = Object.keys(_task).map(
          (_taskProp, innerIndex) => {
            if (_taskProp.toString() === 'taskPriority') {
              return <TableRowColumn key={innerIndex}>
                <Badge style={{ top: 6 }} secondary={Number(_task[_taskProp]) > 5 ? true : false}
                  primary={Number(_task[_taskProp]) > 5 ? false : true} badgeContent={Number(_task[_taskProp])} />
              </TableRowColumn>
            }
            return <TableRowColumn key={innerIndex}>{_task[_taskProp]}</TableRowColumn>
          }
        )
        return <TableRow selectable={_task.owner === this.state.currentUser.username || this.state.currentUser.role === 'admin' ? true : false}
          key={index}>{mappedRows}
        </TableRow>
      }
    )
    return mappedRows;
  }

  renderEditForm(rowIndex) {
    this.props._initializeTaskForEditing(this.state.tasks[rowIndex]);
  }

  render() {
    return (
      <div>
        <Table selectable={true} onRowSelection={this.renderEditForm}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {this.drowHeaders()}
            </TableRow>
          </TableHeader >
          <TableBody displayRowCheckbox={false}>
            {this.drowRows()}
          </TableBody>
        </Table>
        <FlatButton style={buttonStyle} label="New Task" onClick={() => { this.props._openNewTaskDialog() }} />
        {!(Object.keys(this.state.taskForEditing).length === 0 && this.state.taskForEditing.constructor === Object) ?
          <TaskEditForm open={true}></TaskEditForm> : null}
        {this.state.shouldOpenNewTaskDialog ?
          <NewTaskForm open={true}></NewTaskForm> : null}
      </div>
    );
  }
}

TasksTable.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  taskForEditing: PropTypes.object.isRequired,
  shouldOpenNewTaskDialog: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    tasks: state.tasks,
    currentUser: state.currentUser,
    taskForEditing: state.taskForEditing,
    shouldOpenNewTaskDialog: state.newTaskDialog
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _loadTasks: bindActionCreators(loadTasks, dispatch),
    _initializeTaskForEditing: bindActionCreators(initializeTaskForEditing, dispatch),
    _openNewTaskDialog: bindActionCreators(openNewTaskDialog, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksTable);
