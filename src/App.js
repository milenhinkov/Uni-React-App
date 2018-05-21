import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
import { logoutUser } from './redux/ActionCreators'
import { bindActionCreators } from 'redux'

//---- external css -----------------
import { buttonStyle } from './modulesCss/appCss'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props, { isLogged: false, isAdmin: false, });
    this.initStorage();
    this.logOutUser = this.logOutUser.bind(this);
  }

  initStorage() {
    let usersArr = localStorage.getItem('users');
    if (!usersArr) {
      localStorage.setItem('users', JSON.stringify([{
        username: "Steve",
        password: "SecurePass",
        email: "",
        role: "admin"
      }]));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.setState((prevState) => {
        prevState.currentUser = nextProps.currentUser;
        prevState.isLogged = typeof (nextProps.currentUser.username) !== 'undefined';
        prevState.isAdmin = nextProps.currentUser.role === 'admin';
      });
    }
  }

  logOutUser() {
    this.props.logout();
    this.props.history.push('/logout');
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar>
          </AppBar>
          {!this.state.isLogged ? <FlatButton
            label="Register"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/register') }} /> : null}
          {!this.state.isLogged ? <FlatButton
            label="Login"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/login') }} /> : null}
          {this.state.isLogged ? <FlatButton
            label="Tasks"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/tasks') }} /> : null}
          {this.state.isAdmin ? <FlatButton
            label="Users"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/users') }} /> : null}
          {this.state.isLogged ? <FlatButton
            label="AddTask"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/addtask') }} /> : null}
          {this.state.isAdmin ? <FlatButton
            label="AddUser"
            style={buttonStyle}
            onClick={() => { this.props.history.push('/adduser') }} /> : null}
          {this.state.isLogged ? <FlatButton
            label="Logout"
            style={Object.assign({}, buttonStyle, { float: 'right' })}
            onClick={this.logOutUser} /> : null}
          <Switch>
            {!this.state.isLogged ? <Route path="/register" component={Register} /> : null}
            {!this.state.isLogged ? <Route path="/login" component={Login} /> : null}
            {this.state.isLogged ? <Route path="/tasks" component={() => { return <TasksTable info={testProps} /> }} /> : null}
            {this.state.isAdmin ? <Route path="/users" component={() => {return <UsersTable users={JSON.parse(localStorage.getItem('users'))} />}} /> : null}
            {this.state.isLogged ? <Route path="/addtask" component={() => { return <TaskEditForm open={true} /> }} /> : null}
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  logout: PropTypes.func.isRequired
}


function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logoutUser, dispatch)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
