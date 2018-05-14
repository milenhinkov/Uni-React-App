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
      },
      openEditForm: true,
      tableHeaders: ["TaskOwner", "TaskTitle", "TaskDescription", "TaskPriority", "Editable"]
    };
    this.drowRows = this.drowRows.bind(this);
    this.drowHeaders = this.drowHeaders.bind(this);
  }

  test(){
    alert('success');
  }

  drowRows(collection) {
    return collection.map((row, i) => {
      return (
        <TableInfoRow key={i} info={row} isEditable={this.state.currentUser.userName === row.Owner} onClick={this.test}/>)
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