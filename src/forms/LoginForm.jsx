import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PropTypes from 'prop-types'; 

import { loginUser } from '../redux/ActionCreators'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            role: 'user'
        }
        this.loginOnClock = this.loginOnClock.bind(this);
    }

    loginOnClock(){
        this.props.login(this.state);
        this.props.history.push('/tasks');
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Enter your Username"
                    floatingLabelText="Username"
                    onChange={(event, newValue) => this.setState({ username: newValue })}
                />
                <br />
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange={(event, newValue) => this.setState({ password: newValue })}
                />
                <br />
                <RaisedButton label="Submit" primary={true}  onClick={this.loginOnClock}  />
            </div>
        );
    }
}

Login.propTypes={
    currentUser: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
   return{
       currentUser:state.currentUser
   }
}

function mapDispatchToProps(dispatch) {
    return{
        login: bindActionCreators(loginUser, dispatch)
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Login);