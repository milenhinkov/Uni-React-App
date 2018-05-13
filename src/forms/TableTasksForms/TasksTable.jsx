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
      rowsData: {
        firstUser: {
          userName: "Steve",
          password: "SecurePass",
          tasks: [{
            TaskTitle: "Important task",
            TaskDescription: "The Task Is Really Important",
            TaskPriority: "High"
          }, {
            TaskTitle: "Second Important task",
            TaskDescription: "The Task Is Really Important",
            TaskPriority: "High"
          }
          ]
        }, secondUser: {
          userName: "Bob",
          password: "NotSecurePass",
          tasks: [{
            TaskTitle: "Unimportant task",
            TaskDescription: "The Task Is not really Important",
            TaskPriority: "Low"
          }]
        }
      },
      currentUser: {
        userName: "Steve",
        password: "SecurePass",
        tasks: {
          TaskTitle: "Important task",
          TaskDescription: "The Task Is Really Important",
          TaskPriority: "High"
        }
      }, openEditForm: true,
    };
    this.decideShouldBeEditable = this.decideShouldBeEditable.bind(this);
  }
  decideShouldBeEditable() {
    return Object.values(this.state.rowsData)
      .map((row, i) => {
        return (
          <TableInfoRow key={i} info={row} isEditable={this.state.currentUser.userName === row.userName} />)
      })
  }

  render() {
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>TaskOwner</TableHeaderColumn>
              <TableHeaderColumn>TaskTitle</TableHeaderColumn>
              <TableHeaderColumn>TaskDescription</TableHeaderColumn>
              <TableHeaderColumn>TaskPriority</TableHeaderColumn>
              <TableHeaderColumn>Editable</TableHeaderColumn>
            </TableRow>
          </TableHeader >
          <TableBody displayRowCheckbox={false}>
            {this.decideShouldBeEditable()}
          </TableBody>
        </Table>
        <TaskEditForm open={this.state.openEditForm} />
      </div>
    );
  }
}