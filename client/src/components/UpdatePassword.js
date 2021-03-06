import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { ButtonToggle } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";
import { Button, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
/*
Vien Nguyen
CST-452 Senior Project II
Feb 2st/2021
This is the update password component. user will get the form to enter current password and enter new password
*/
//Create the home page component
class UpdatePassword extends React.Component{
    constructor(props){
        super(props);
        this.currentPasswordChangeHandler = this.currentPasswordChangeHandler.bind(this);
        this.newPasswordChangeHandler = this.newPasswordChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            message: ''
        };
    }

    //Handle the current password change
    currentPasswordChangeHandler(event){
        this.setState({currentPassword: event.target.value});
    }

    //Handle confirm the current password change
    newPasswordChangeHandler(event){
        this.setState({newPassword: event.target.value});
    }

    //Handle submit even. Validate the entry data
    handleSubmit(event, errors, values){
        this.setState({errors, values});
        if(errors.length > 0){
            return;
        }
        //Create a user object with all neccessary data
        const passwordForm ={
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
            userId: JSON.parse(sessionStorage.getItem('mySessionStorageData')).userId
        }
        //submit data to register API, passing user data along with the API service
        axios.post('http://localhost:3001/admin/updatePassword', {passwordForm}).then(
            res=>{
                //Redirect the page after registered. 
                if(res.data.message.result === true){
                    this.setState({message: "Password channged successfully"})
                }else{
                    this.setState({message: "Password was not changed"})
                }
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    //Render the Admin component.
    render(){
       
        return(
            //Include the menu component into the home page
        //    <div className="UpdatePassword">
        //        <label>Current Password</label>
        //         <input name="currentPassword" type="password" value="" />{' '}<br/>
        //         <label>New Password</label>
        //         <input name="newPassword" type="password" value="" />{' '}<br/>
        //         <label>Confirm Password</label>
        //         <input name="confirmPassword" type="password" value="" />{' '}<br/>
        //         <ButtonToggle color="info" >Update</ButtonToggle>{' '}
        //    </div>
        <div  class="form-group">
                
        <AvForm  onSubmit={ this.handleSubmit }>
            <h2>Update password</h2>
            <label style={{color: 'red'}}>{this.state.message}</label>
            <Row>
                <Col xs="12" >
                    <AvField name="currentPassword" label="Current Password*" value={this.state.currentPassword}  onChange={this.currentPasswordChangeHandler}
                    type="password" 
                    validate={{
                        required: {value: true, errorMessage: "Please enter your current password"},
                        //pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                        required: {value: true, errorMessage: 'Please enter your password'},
                        minLength: {value: 8, errorMessage: 'Your password must be at least 8 characters'},
                        maxLength: {value: 25}
                    }} />
                </Col>
                <Col xs="12" >
                    <AvField name="newpassword" label="New Password*" value={this.state.newPassword}  onChange={this.newPasswordChangeHandler}
                    type="password"
                    validate={{
                        required: {value: true, errorMessage: 'Please enter your new password'},
                        //pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                        minLength: {value: 8, errorMessage: 'Your password must be at least 8 characters'},
                        maxLength: {value: 25}
                    }} />
                </Col>
                <Col xs="12" >
                    <AvField name="confirmationPassword" label="Confirm Password*" type="password" 
                    validate={{
                        required: {value: true, errorMessage: 'Please confirm your new password'},
                        match:{value:'newpassword', errorMessage: 'Your confirm password does not match'}
                        }} />
                </Col>
            </Row>
            <Button color="primary" >Update</Button>
        </AvForm >
        
    </div>
        );
    }
}
export default UpdatePassword;

