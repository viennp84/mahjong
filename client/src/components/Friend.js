import axios from 'axios';
import '../styles/Introduction.css';
import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import { Button, Card } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Profile.css';
/*  Vien Nguyen
    CST-452 Mahjong Game Online
    Feb/18/2021
    Invitation Page. 
    Handle data on the form controls. Validate input data
*/
class Friend extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message: '',
            email: null
        };
        this.invitationHandler = this.invitationHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //Update the email state with the event on the control
    invitationHandler(event){
        this.setState({email: event.target.value});
    }
    //Submit the action, calling sending the invitation via email api.
    handleSubmit(event, errors, values){
        this.setState({errors, values});
        if(errors.length > 0){
            return;
        }
        //Initiates a user object. 
        const email ={
            email: this.state.email,
        }
        //Using axios to send authenticaon to API invitation
        axios.post('http://localhost:3001/users/invite', {email})
        .then(
            //Validate return message after authentication.
            res=>{
                //Display the error to the user, user does not exist
                if(res.data.message.msg === "notExist"){
                    this.setState({message: "User email does not exist"})
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
                <div className="container">
                    <AvForm className="form-invite"  onSubmit={ this.handleSubmit }>
                        <h2 className="form-invite-heading">Invite a friend</h2>
                        <label style={{color: 'red'}}>{this.state.message}</label>

                        <AvField name="email" label="Email*" value={this.state.email} type="email"   onChange={this.invitationHandler}
                        validate={{
                            required: {value: true, errorMessage: 'Please enter a valid email'},  
                        }} />
                        <Button color="primary">Invite</Button>        
                    </AvForm>
                </div>
        );
    }
}
//Export the friend component.
export default Friend;