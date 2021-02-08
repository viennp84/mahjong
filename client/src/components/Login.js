import axios from 'axios';
import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import { Button, Card } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
/*  Vien Nguyen
    CST-451 Mahjong Game Online
    12/12/2020
    Login class. 
    Handle data on the form controls. Validate input data
*/
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message: ''
        };
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //Update username from the control when state is changed.
    usernameChangeHandler(event){
        this.setState({username: event.target.value});
    }
    //Update password from the control when state is changed.
    passwordChangeHandler(event){
        this.setState({password: event.target.value});
    }
    //Handle submit event to login. Get username and password and call
    //login API
    handleSubmit(event, errors, values){
        this.setState({errors, values});
        if(errors.length > 0){
            return;
        }
        //Initiates a user object. 
        const user ={
            username: this.state.username,
            password: this.state.password
        }
        //Using axios to send authenticaon to API login
        axios.post('http://localhost:3001/users/login', {user})
        .then(
            //Validate return message after authentication.
            res=>{
                //Display the error to the user, user does not exist
                if(res.data.message.msg === "notExist"){
                    this.setState({message: "Username does not exist"})
                }
                //Display the error incorrect password
                if(res.data.message.msg === "incorrectPassword"){
                    this.setState({message: "Incorrect password"})
                }
                //Set the redirect condition after logging in.
                if(res.data.message.msg === "loggedin"){
                   this.setState({redirect: true})
                }
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    //Render the login form
    render(){
        const {redirect} = this.state;
        //If user has logged in, redirect to home page.
        if (redirect) {
            return <Redirect to='/home/'/>;
        }
        //Generating the login form and validation on React-form
        return(
                <div className="form-group">
                    <AvForm className="form-signin"  onSubmit={ this.handleSubmit }>
                        <h2 className="form-signin-heading">Welcome</h2>
                        <label style={{color: 'red'}}>{this.state.message}</label>

                        <AvField name="username" label="Username*" value={this.state.username}   onChange={this.usernameChangeHandler}
                        type="text" 
                        validate={{
                            required: {value: true, errorMessage: 'Please enter a username'},
                            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                            minLength: {value: 3, errorMessage: 'Your name must be between 3 and 16 characters'},
                            maxLength: {value: 25, errorMessage: 'Your name must be between 3 and 16 characters'}
                        }} />

                        <AvField name="password" label="Password*" value={this.state.password}  onChange={this.passwordChangeHandler}
                        type="password"
                        validate={{
                            required: {value: true, errorMessage: 'Please enter your password'},
                            minLength: {value: 8, errorMessage: 'Your password must be at least 8 characters'},
                            maxLength: {value: 25}
                        }} />
                        <Button color="primary">Sign in</Button> 
                        <p>
                            Don't have an account? <Link to="/register/">Sign up</Link>
                        </p>
                    </AvForm>
                </div>
        );
    }
}
//Export the login component.
export default Login;