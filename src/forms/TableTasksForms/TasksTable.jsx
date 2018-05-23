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
import { loadTasks } from '../../redux/ActionCreators'
import { bindActionCreators } from 'redux'
import  TaskEditForm  from './TaskEditForm'

class TasksTable extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.props, {openEditForm:false, taskForEditing:{}});
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
        return <TableRow selectable={_task.owner === this.state.currentUser.username || this.state.currentUser.role ==='admin' ? true : false} 
        key={index}>{mappedRows}
        </TableRow>
      }
    )
    return mappedRows;
  }

  renderEditForm(rowIndex){
    console.log(rowIndex);
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
        <TaskEditForm open={this.state.openEditForm}></TaskEditForm>
      </div>
    );
  }
}


TasksTable.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    tasks: state.tasks,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _loadTasks: bindActionCreators(loadTasks, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksTable);
