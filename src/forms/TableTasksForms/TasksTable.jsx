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


export default class TasksTable extends Component {
  constructor(props) {
    super(props)
    this.state = props.info;
    this.drowRows = this.drowRows.bind(this);
    this.drowHeaders = this.drowHeaders.bind(this);
  }


  drowRows(collection) {
    return collection.map((row, i) => {
      return (
        <TableInfoRow key={i} info={row} isEditable={this.state.currentUser.userName === row.Owner || this.state.currentUser.role === "admin"} />)
    })
  }

  drowHeaders(headers) {
    return headers.map((head) => { return <TableHeaderColumn key={head}>{head}</TableHeaderColumn> })
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
            {this.drowRows(this.props.info.tasks)}
          </TableBody>
        </Table>
        <TaskEditForm open={this.state.openEditForm} />
      </div>
    );
  }
}

