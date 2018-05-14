import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import TableInfoRow from '../TableTasksForms/TableInfoRow'


export default class UsersTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        {
          userName: "Steve",
          password: "SecurePass",
          role: "user",
        },
        {
          userName: "Bob",
          password: "NotSecurePass",
          role: "user",
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
        role: "user",
      },
      tableHeaders: ["UserName", "Password", "Role"]
    }
    this.drowHeaders = this.drowHeaders.bind(this);
    this.drowRows = this.drowRows.bind(this); 
  }

  drowHeaders(headers) {
    return headers.map((head) => { return <TableHeaderColumn key={head}>{head}</TableHeaderColumn> })
  }

   drowRows(collection) {
    return collection.map((row, i) => {
      return (
        <TableInfoRow key={i} info={row} isEditable={this.state.currentUser.userName === row.Owner} />)
    })
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
            { this.drowRows(this.state.users) }
          </TableBody>
        </Table>
        {/*  <TaskEditForm open={this.state.openEditForm} /> */}
      </div>
    );
  }
}