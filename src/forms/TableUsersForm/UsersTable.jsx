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
import TextField from 'material-ui/TextField';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loadUsers, makeUsersAdmins } from '../../redux/ActionCreators'
import { bindActionCreators } from 'redux'

import { buttonStyle } from '../../modulesCss/appCss'

class UsersTable extends Component {
  constructor(props) {
    super(props)
    let map = [];
    this.props.users.forEach(user => {
      if (user.role === 'user') {
        map[user.username] = false;
      }
    });
    this.props._loadUsers();
    this.state = Object.assign({}, props, { toGiveAdminRights: map }, {toDelete: JSON.parse(JSON.stringify(map))});

    this.drowHeaders = this.drowHeaders.bind(this);
    this.drowRows = this.drowRows.bind(this);
    this.storeAdminReferences = this.storeAdminReferences.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.usersForDeleting = this.usersForDeleting.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let newState = Object.assign({}, this.state, nextProps);
    this.setState(newState);
  }

  drowHeaders() {
    if (this.state.users[0]) {
      let _headers = Object.keys(this.state.users[0]).map((property, index) => { return <TableHeaderColumn key={index}>{property}</TableHeaderColumn> })
      _headers.push(<TableHeaderColumn key={'makeadmin'}>makeAdmin</TableHeaderColumn>);
      _headers.push(<TableHeaderColumn key={'deleteuser'}>deleteNonAdmin</TableHeaderColumn>);
      return _headers;
    }
    return null;
  }

  drowRows() {
    let mappedRows = this.state.users.map(
      (_user, outIndex) => {
        let _rowValues = Object.values(_user).map(
          (_userProp, index) => { return <TableRowColumn key={index}>{_userProp}</TableRowColumn> })
        if (_user.role === 'user') {
          _rowValues.push(
            <TableRowColumn key={outIndex + _user.username}>
              <Checkbox value={_user.username} checked={this.state.toGiveAdminRights[_user.username]} onCheck={this.storeAdminReferences} style={{ margin: "1em", left: "1.5em" }} />
            </TableRowColumn>)
        } else {
          _rowValues.push(<TableRowColumn key={outIndex}><Checkbox disabled={true} style={{ margin: "1em", left: "1.5em" }} /></TableRowColumn>)
        }
        if (_user.role === 'user') {
          _rowValues.push(
            <TableRowColumn key={outIndex}>
              <Checkbox value={_user.username} checked={this.state.toDelete[_user.username]} onCheck={this.usersForDeleting} style={{ margin: "1em", left: "1.5em" }} />
            </TableRowColumn>)
        } else {
          _rowValues.push(<TableRowColumn key={outIndex}><Checkbox disabled={true} style={{ margin: "1em", left: "1.5em" }} /></TableRowColumn>)
        }
        return <TableRow key={_user.username}> {_rowValues} </TableRow>
      });

      return mappedRows;
  }

  usersForDeleting(ev){
    this.state;
    let newState = Object.assign({}, this.state);
    newState.toDelete[ev.target.value] = !newState.toDelete[ev.target.value];
    this.setState(newState);
  }

  storeAdminReferences(ev) {
    let newState = Object.assign({}, this.state);
    newState.toGiveAdminRights[ev.target.value] = !newState.toGiveAdminRights[ev.target.value];
    this.setState(newState);
  }

  saveChanges() {
    let resArr = [];
    for (let key in this.state.toGiveAdminRights) {
      if (this.state.toGiveAdminRights[key]) {
        resArr.push(key);
      }
    }
    this.props._makeUsersAdmins(resArr);
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
          onClick={this.saveChanges} />
      </div>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _loadUsers: bindActionCreators(loadUsers, dispatch),
    _makeUsersAdmins: bindActionCreators(makeUsersAdmins, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);