import React, { Component } from 'react';
import './App.css';

// --- custom components-------------
import Register from './forms/RegisterForm'
import Login from './forms/LoginForm'
import TasksTable from './forms/TableTasksForms/TasksTable'
import UsersTable from './forms/TableUsersForm/UsersTable'
import HomePage from './forms/PrimeComponents/HomeComponent'

// --- fansy components--------------
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

// --- router componnets-------------
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogged: true,
      isAdmin: true,
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar>
          </AppBar>
          <RaisedButton label="Register" secondary={true} href={'/register'} />
          <RaisedButton label="Login" secondary={true} href={'/login'} />
          <RaisedButton label="Tasks" secondary={true} href={'/tasks'} />
          <RaisedButton label="Users" secondary={true} href={'/users'} />
          { this.state.isLogged ? <RaisedButton label="AddTask" secondary={true} /> : null }
          { this.state.isAdmin ? <RaisedButton label="AddUser" secondary={true} /> : null }
          <RaisedButton label="Logout" secondary={true} style={{ float: 'right' }} />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/tasks" component={() =>{return <TasksTable info={testProps}/>}} />
            <Route path="/users" component={UsersTable} />
            <Route path="/home" component={HomePage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const testProps =  {
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
    role: "admin",
  },
  openEditForm: true,
  tableHeaders: ["TaskOwner", "TaskTitle", "TaskDescription", "TaskPriority", "Editable"]
};

export default withRouter(App);