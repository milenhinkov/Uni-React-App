import React, { Component } from 'react';

// --- custom components-------------
import Register from './forms/RegisterForm'
import Login from './forms/LoginForm'
import TasksTable from './forms/TableTasksForms/TasksTable'
import UsersTable from './forms/TableUsersForm/UsersTable'
import TaskEditForm from './forms/TableTasksForms/TaskEditForm'

// --- fansy components--------------
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


// --- router componnets-------------
import { Route, Switch, withRouter } from 'react-router-dom';

//---- redux components ------------- 
import { connect } from 'react-redux'

//---- external css -----------------
import { buttonStyle } from './jsCss/appCss'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props, { isLogged: false, isAdmin: false, })

  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar>
          </AppBar>
          <FlatButton
            label="Register"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/register') }} />
          <FlatButton
            label="Login"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/login') }} />
          <FlatButton
            label="Tasks"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/tasks') }} />
          <FlatButton
            label="Users"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/users') }} />
          <FlatButton
            label="AddTask"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/addtask') }} />
          <FlatButton
            label="AddUser"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/adduser') }} />
          <FlatButton
            label="Logout"
            style={Object.assign({}, buttonStyle, { float: 'right' })}
            onClick={() => { this.props.history.push('/logout') }} />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/tasks" component={() => { return <TasksTable info={testProps} /> }} />
            <Route path="/users" component={UsersTable} />
            <Route path="/addtask" component={() => { return <TaskEditForm open={true} /> }} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.users
  }
}

const testProps = {
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

export default withRouter(connect(mapStateToProps)(App));

/* const style={
  color: "#FFFFFF",
  backgroundColor: "#FF4081"
} */