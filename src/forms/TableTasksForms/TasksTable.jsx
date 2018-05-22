import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';



export default class TasksTable extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.drowRows = this.drowRows.bind(this);
    this.drowHeaders = this.drowHeaders.bind(this);
  }


  drowRows() {
    return null;
  }

  drowHeaders() {
    return null;
  }



  render() {
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {/* this.drowHeaders */}
            </TableRow>
          </TableHeader >
          <TableBody displayRowCheckbox={false}>
            {/* this.drowRows */}
          </TableBody>
        </Table>
      </div>
    );
  }
}

