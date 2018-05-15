import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import TableInfoRow from './TableInfoRow'
import TaskEditForm from './TaskEditForm'
import { connect } from 'react-redux'
import addTaskToUser from '../../redux/ActionCreators'

class TasksTable extends Component {
  constructor(props) {
    super(props)
    this.state = props.info;
    this.drowRows = this.drowRows.bind(this);
    this.drowHeaders = this.drowHeaders.bind(this);
    this.test = this.test.bind(this);
    this.test();
  }


  drowRows(collection) {
    return collection.map((row, i) => {
      return (
        <TableInfoRow key={i} info={row} isEditable={this.state.currentUser.userName === row.Owner || this.state.currentUser.role === "admin"} />)
    })
  }

  drowHeaders(headers){
    return headers.map((head) => {return <TableHeaderColumn key={head}>{head}</TableHeaderColumn>})
  }

  test(){
    let s = { user: {
      userName: "Steve",
      password: "SecurePass",
    }, task: {
      owner: "Bob",
      taskTitle: "Important task",
      taskDescription: "The Task Is Really Important",
      taskPriority: "High"
    }};
    this.props.dispatch(addTaskToUser(s));

  }

  render() {
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {this.drowHeaders(this.state.tableHeaders)}
            </TableRow>
          </TableHeader >
          <TableBody displayRowCheckbox={false}>
            {this.drowRows(this.state.tasks)}
          </TableBody>
        </Table>
        <TaskEditForm open={this.state.openEditForm} />       
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return{
    addTaskToUser : state.addTaskToUser
  }
}

export default connect(mapStateToProps)(TasksTable);