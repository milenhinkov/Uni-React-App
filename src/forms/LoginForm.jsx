import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
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
        let user = localStorage.getItem(this.state.username, JSON.stringify(this.state));
        console.log(user);
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
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.submitRegister(event)} />
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Login;