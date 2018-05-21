import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

import { buttonStyle } from '../../modulesCss/appCss'

export default class UsersTable extends Component {
  constructor(props) {
    super(props)
    let map = [];
    this.props.users.forEach(user => {
      if (user.role === 'user') {
        map[user.username] = false;
      }
    });
    this.state = Object.assign({}, props, { toGiveAdminRights: map });
    this.drowHeaders = this.drowHeaders.bind(this);
    this.drowRows = this.drowRows.bind(this);
    this.storeAdminReferences = this.storeAdminReferences.bind(this);
  }

  drowHeaders() {
    let _headers = Object.keys(this.state.users[0]).map((property, index) => { return <TableHeaderColumn key={index}>{property}</TableHeaderColumn> })
    _headers.push(<TableHeaderColumn key={'makeadmin'}>MakeAdmin</TableHeaderColumn>);
    return _headers;
  }

  drowRows() {
    return this.state.users.map(
      (_user, outIndex) => {
        let _rowValues = Object.values(_user).map(
          (_userProp, index) => { return <TableRowColumn key={index + _user.username}>{_userProp}</TableRowColumn> })
        if (_user.role === 'user') {
          _rowValues.push(
            <TableRowColumn key={outIndex + _user.username}>
              <Checkbox value={_user.username} onCheck={this.storeAdminReferences} style={{ margin: "1em", left: "1.5em" }} />
            </TableRowColumn>)
        } else {
          _rowValues.push(<TableRowColumn key={outIndex + _user.username}><Checkbox disabled={true} style={{ margin: "1em", left: "1.5em" }} /></TableRowColumn>)
        }
        return <TableRow key={_user.username}> {_rowValues} </TableRow>
      });
  }

  storeAdminReferences(ev) {
    /* this.setState((prevState) => { return toGiveAdminRights[ev.target.value]: !toGiveAdminRights[ev.target.value] });
    this.setState((prevState) => {
      return { counter: prevState.counter + props.step };
    }); */
    /* this.setState(prevState => { })
    ev.target.value */
  }

  render() {
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {this.drowHeaders()}
            </TableRow>
          </TableHeader >
          <TableBody displayRowCheckbox={false}>
            {this.drowRows()}
          </TableBody>
        </Table>
        <FlatButton
          label="SaveChanges"
          style={buttonStyle}
          onClick={() => { console.log('clicked') }} />
      </div>
    );
  }
}