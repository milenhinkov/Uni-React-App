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


export default class TableExampleControlled extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        {
          userName: "Steve",
          password: "SecurePass",
        },
        {
          userName: "Bob",
          password: "NotSecurePass",
        }],
      tasks: [{
        owner: "Bob",
        taskTitle: "Important task",
        taskDescription: "The Task Is Really Important",
        taskPriority: "High"
      }, {
        owner: "Bob",
        taskTitle: "Second Important task",
        taskDescription: "The Task Is Really Important",
        taskPriority: "High"
      },
      {
        owner: "Steve",
        taskTitle: "Unimportant task",
        taskDescription: "The Task Is not really Important",
        taskPriority: "Low"
      }],
      currentUser: {
        userName: "Steve",
        password: "SecurePass",
      },
      openEditForm: true,
      tableHeaders: ["TaskOwner", "TaskTitle", "TaskDescription", "TaskPriority", "Editable"]
    };
    this.drowRows = this.drowRows.bind(this);
    this.drowHeaders = this.drowHeaders.bind(this);
  }


  drowRows(collection) {
    return collection.map((row, i) => {
      return (
        <TableInfoRow key={i} info={row} isEditable={this.state.currentUser.userName === row.Owner} />)
    })
  }

  drowHeaders(headers){
    return headers.map((head) => {return <TableHeaderColumn key={head}>{head}</TableHeaderColumn>})
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