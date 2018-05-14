import React, { Component } from 'react';
import './App.css';

// --- custom components-------------
import Register from './forms/RegisterForm'
import Login from './forms/LoginForm'
import TableExampleControlled from './forms/TableTasksForms/TasksTable'
import UsersTable from './forms/TableUsersForm/UsersTable'

// --- fansy components--------------
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

// --- router componnets-------------
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
     
        <MuiThemeProvider>
          <div>
            <AppBar>
            </AppBar>
            <RaisedButton label="Register" secondary={true} />
            <RaisedButton label="Login" secondary={true} />
            <RaisedButton label="Logout" secondary={true} />
            <RaisedButton label="AddTask" secondary={true} />
            <RaisedButton label="AddUser" secondary={true} />
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/tasks" component={TableExampleControlled} />
              <Route path="/users" component={UsersTable} />
            </Switch>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default withRouter(App);