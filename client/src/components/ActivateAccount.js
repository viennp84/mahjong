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
class Activation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message: '',
            code: null,
            userId: null,
            activate: null,
            isActivated: false
        };
        this.codeChangHandler = this.codeChangHandler.bind(this);
        this.userIdChangeHandler = this.userIdChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //Update the code state with the event on the control
    codeChangHandler(event){
        this.setState({code: event.target.value});
    }
    //Update the userId state with the event on the control
    userIdChangeHandler(event){
        this.setState({userId: event.target.value});
    }
    //Submit the action, calling sending the activate api.
    handleSubmit(event, errors, values){
        this.setState({errors, values});
        if(errors.length > 0){
            return;
        }
        //Initiates a user object. 
        const activate ={
            userId: this.state.userId,
            code: this.state.code,
        }
        //Using axios to send authenticaon to API invitation
        axios.post('http://localhost:3001/users/activate', {activate})
        .then(
            //Validate return message after authentication.
            res=>{
                //Display the error to the user, user does not exist
                if(res.data.status === true){
                    this.setState({isActivated:true});
                    this.setState({message: res.data.message});
                } else{
                    this.setState({message: res.data.message})
                }        
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    //Render the login form
    render(){
        const {redirect} = this.state.isActivated;

        console.log(this.state.isActivated);
        //If user has logged in, redirect to home page.
        if (this.state.isActivated) {
                return(
                    <div className="container">
                        
                        <label style={{color: 'red'}}>{this.state.message}</label><br/>
                        <Link to="/">Back to login</Link>
                    </div>
            );
        }else{
        //Generating the activation form and validation on React-form
        return(
                <div className="container">
                    <AvForm className="form-activate"  onSubmit={ this.handleSubmit }>
                        <h2 className="form-activate-heading">Activate your account</h2>
                        <label style={{color: 'red'}}>{this.state.message}</label>
                        <AvField name="userId" label="UserID*" value={this.state.userId} type="text"   onChange={this.userIdChangeHandler}
                        validate={{
                            required: {value: true, errorMessage: 'Please enter your user ID'},  
                        }} />
                        <AvField name="Code" label="Code*" value={this.state.code} type="text"   onChange={this.codeChangHandler}
                        validate={{
                            required: {value: true, errorMessage: 'Please enter activate code'},  
                        }} />
                        <Button color="primary">Activate</Button>        
                    </AvForm>
                </div>
        );
                    }
    }
}
//Export the friend component.
export default Activation;