import axios from 'axios'; //Cross platform service library
//import '../styles/Introduction.css'; //Include  css style
import React, { Component } from 'react'; //Import React component
import {Link} from "react-router-dom"; //Import navigation library
import { Button } from 'reactstrap'; //Import react bootstrap library
import { AvForm, AvField } from 'availity-reactstrap-validation'; //Import validation
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../styles/Profile.css';
/*  Vien Nguyen
    CST-452 Mahjong Game Online
    Feb/18/2021
    Activation account service
    This Class will handle the activate account request. Generating user interface and calling 
    activation service from the API server.
*/
class Activation extends React.Component{
    //Constructor method, initiate the class properties.
    constructor(props){
        super(props);
        this.state={
            message: '',
            code: null,
            userId: null,
            activate: null,
            isActivated: false
        };
        //Binding event for the method codeChangeHandler. Update the code variable when data on the textbox is changed.
        this.codeChangHandler = this.codeChangHandler.bind(this);
        //Update the userId to the userId variable.
        this.userIdChangeHandler = this.userIdChangeHandler.bind(this);
        //Handle the submit service.
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //Update the code state with the event on the control
    codeChangHandler(event){
        //Set the code value via a state changed.
        this.setState({code: event.target.value});
    }
    //Update the userId state with the event on the control
    userIdChangeHandler(event){
        //Set the userId value via a state change
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
        //Using axios to send activate code to activation API
        axios.post('http://localhost:3001/users/activate', {activate})
        .then(
            //Validate return message after calling activation service.
            res=>{
                //Display the error to the user, user does not exist
                if(res.data.status === true){
                    this.setState({isActivated:true});
                    this.setState({message: res.data.message});
                } else{
                    this.setState({message: res.data.message})
                }        
        })
        //Showing message if error
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