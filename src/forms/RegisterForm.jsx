import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'; 

import { createUser } from '../redux/ActionCreators'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            role: 'user'
        }
    }

    submitRegister(event) {
        if (!this.state.username || this.state.username.indexOf(' ') > -1) {
            this.setState((prevState) => {
                return {
                    username: 'incorrect username'
                };
            });
            return;
        }
        let usersArr = JSON.parse(localStorage.getItem('users'))
            .map(us => { return us.username }).forEach((_username) => {
                _username === this.state.username ?
                    this.setState((prevState) => {
                        return {
                            username: 'username is already occupied'
                        };
                    }) : null
            });
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if  (!regex.test(this.state.email)){
            this.setState((prevState) => {
                return {
                    email: 'incorrect email'
                };
            }) 
        }
        let emailArr = JSON.parse(localStorage.getItem('users'))
        .map(us => { return us.email }).forEach((_email) => {
            _email === this.state.email ?
                this.setState((prevState) => {
                    return {
                        email: 'email is already occupied'
                    };
                }) : null
        }); 
        this.props.createUser(this.state);
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Enter your Username"
                    floatingLabelText={this.state.username}
                    onChange={(event, newValue) => this.setState({ username: newValue })}
                />
                <br />
                <TextField
                    hintText="Enter your Email"
                    floatingLabelText={this.state.email}
                    onChange={(event, newValue) => this.setState({ email: newValue })}
                />
                <br />
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange={(event, newValue) => this.setState({ password: newValue })}
                />
                <br />
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.submitRegister(event)} />
            </div>
        );
    }
}
const style = {
    margin: 15,
};


Register.propTypes={
    usersArr: PropTypes.array.isRequired,
    createUser: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
   return{
       usersArr:state.users
   }
}

function mapDispatchToProps(dispatch) {
    return{
        createUser: bindActionCreators(createUser, dispatch)
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Register);