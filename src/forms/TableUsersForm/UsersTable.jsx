import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import TableInfoRow from '../TableTasksForms/TableInfoRow'
/*import TaskEditForm from './TaskEditForm' */


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
        Owner: "Bob",
        TaskTitle: "Important task",
        TaskDescription: "The Task Is Really Important",
        TaskPriority: "High"
      }, {
        Owner: "Bob",
        TaskTitle: "Second Important task",
        TaskDescription: "The Task Is Really Important",
        TaskPriority: "High"
      },
      {
        Owner: "Steve",
        TaskTitle: "Unimportant task",
        TaskDescription: "The Task Is not really Important",
        TaskPriority: "Low"
      }],
      currentUser: {
        userName: "Steve",
        password: "SecurePass",
        role: "user",
      },
      tableHeaders: ["UserName", "Password", "Role"]
    }
    this.drowHeaders = this.drowHeaders.bind(this);

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
            {this.drowRows(this.state.users)}
          </TableBody>
        </Table>
        {/*  <TaskEditForm open={this.state.openEditForm} /> */}
      </div>
    );
  }
}