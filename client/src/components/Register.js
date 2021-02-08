import axios from 'axios';
import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import { Button, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

/*  Vien Nguyen
    CST-451 Mahjong Game Online
    12/12/2020
    Login class. 
    Register class. Handle data on the form controls. Validate input data
*/
class Register extends React.Component{
    //Constructor class
    constructor(props){
        super(props);
        //Binding data changing whenever data is changed from the controls.
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            message: '',
        };
    }
    //Following methods are the support methods used to update the state if data on the control are changed.
    //Handle email changed, update react State. 
    emailChangeHandler(event){
        this.setState({email: event.target.value});
    }
    //Handle the phone changed, update State
    phoneChangeHandler(event){
        this.setState({phone: event.target.value});
    }
    //Handle the username change
    usernameChangeHandler(event){
        this.setState({username: event.target.value});
    }
    //Handle the password change
    passwordChangeHandler(event){
        this.setState({password: event.target.value});
    }
    //Handle submit even. Validate the entry data
    handleSubmit(event, errors, values){
        this.setState({errors, values});
        if(errors.length > 0){
            return;
        }
        //Create a user object with all neccessary data
        const user ={
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password
        }
        //submit data to register API, passing user data along with the API service
        axios.post('http://localhost:3001/users/register', {user}).then(
            res=>{
                //Redirect the page after registered. 
                if(res.data.message === true){
                   this.setState({redirect: true})
                }
                //Display username is not available for register
                if(res.data.message === "duplicatedUsername"){
                    this.setState({message: "Username is not available"})
                }
                //Display error email has been used for another account
                if(res.data.message === "duplicatedEmail"){
                    this.setState({message: "Email has been used for another account"})
                }
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    
    render(){
        const {redirect} = this.state;
        //Redirect to login page after register.
        if (redirect) {
            return <Redirect to='/'/>;
        }
        //Render the register form.
        return(
            <div  class="form-group">
                
                <AvForm  onSubmit={ this.handleSubmit }>
                    <h2>Register</h2>
                        <label style={{color: 'red'}}>{this.state.message}</label>
                    <Row>
                        <Col xs="12" sm="6">
                            <AvField name="firstname" label="First Name*" value={this.state.firstName} 
                            type="text"  onChange={this.firstNameChangeHandler} 
                            validate={{
                                required: {value: true, errorMessage: 'Please enter first name'}
                            }} />
                        </Col>

                        <Col xs="12" sm="6">
                            <AvField name="lastname" label="Last Name*" value={this.state.email} 
                            type="text"  onChange={this.lastNameChangeHandler}
                            validate={{
                                required: {value: true, errorMessage: 'Pleas enter your last name'}
                            }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="6">
                            <AvField name="email" label="Email*" value={this.state.email} 
                            type="email"  onChange={this.emailChangeHandler} errorMessage="Invalid email"
                            validate={{
                                required: {value: true, errorMessage: "Please enter your email"}
                            }} />
                        </Col>
                        <Col xs="12" sm="6">
                            <AvField name="phone" label="Phone*" value={this.state.phone} onChange={this.phoneChangeHandler}  
                            type="text" errorMessage="Invalid phone number" 
                            validate={{
                                required: {value: true, errorMessage: "Please enter phone number"},
                                tel: true
                            }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="6">
                            <AvField name="username" label="Username*" value={this.state.username}  onChange={this.usernameChangeHandler}
                            type="text" 
                            validate={{
                                required: {value: true, errorMessage: "Please enter a username"},
                                pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                                minLength: {value: 3, errorMessage: 'Your name must be between 3 and 16 characters'},
                                maxLength: {value: 25, errorMessage: 'Your name must be between 3 and 16 characters'}
                            }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="6">
                            <AvField name="password" label="Password*" value={this.state.password}  onChange={this.passwordChangeHandler}
                            type="password"
                            validate={{
                                required: {value: true, errorMessage: 'Please enter your password'},
                                minLength: {value: 8, errorMessage: 'Your password must be at least 8 characters'},
                                maxLength: {value: 25}
                            }} />
                        </Col>
                        <Col xs="12" sm="6">
                            <AvField name="confirmationPassword" label="Confirm Password*" type="password" 
                            validate={{
                                required: {value: true, errorMessage: 'Please confirm your password'},
                                match:{value:'password', errorMessage: 'Your confirm password does not match'}
                                }} />
                        </Col>
                    </Row>
                    <Button color="primary" >Sign Up</Button>
                    <Link to="/">Back to Log in</Link>
                </AvForm >
                
            </div>
        );
    }
}
//Export register component
export default Register;