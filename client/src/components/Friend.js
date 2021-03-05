import axios from 'axios';
import '../styles/Introduction.css';
import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import { Button, Card } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Friend.css';
import {  Row, Col, CardHeader, CardBody, Label } from 'reactstrap';
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
            email: null,
            sender: null,
            invitation: null
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
        const invitation ={
            sender: sessionStorage.getItem('mySessionStorageData'),
            email: this.state.email,
        }
        //Using axios to send inviate to API invitation
        axios.post('http://localhost:3001/users/invite', {invitation})
        .then(
            //Validate return message after authentication.
            res=>{
                //Display the message to the user if the invitation was sent
                if(res.data.status === false){
                    this.setState({message: res.data.message})
                }
                if(res.data.status === false){
                    this.setState({message: res.data.message})
                }
                if(res.data.status !== false){
                    this.setState({message: res.data.message})
                }             
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    //componentDidMount is automatically run when first initiates rendering the page.
    componentDidMount() {
        const userId = 117;
        //Get data from back end API
        fetch("http://localhost:3001/users/getFriendList/" + JSON.parse(sessionStorage.getItem('mySessionStorageData')).userId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        //assigns result data to items variable of react state.
                        items: result
                        
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    //Render the login form
    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error:{error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return ( 
                <div>   
                    {/* Generating the login form and validation on React-form */}
                    
                    {/* <div className="container">
                        <AvForm className="form-invite"  onSubmit={ this.handleSubmit }>
                            <h2 className="form-invite-heading">Invite a friend</h2>
                            <label style={{color: 'red'}}>{this.state.message}</label>

                            <AvField name="email" label="Email*" value={this.state.email} type="email"   onChange={this.invitationHandler}
                            validate={{
                                required: {value: true, errorMessage: 'Please enter a valid email'},  
                            }} />
                            <Button color="primary">Invite</Button>        
                        </AvForm>
                    </div> */}
                    {items.data.result.map(item => (
                        // <p key={item.userId}>
                        //    <li>
                        //        <img className="avatar-img" src={'http://localhost:3001/users/avatar/' + item.image.split('/')[1]} alt="" />
                        //        {item.firstname + " " +item.lastname}
                        //    </li>  
                            
                        // </p>
                        <Row>
                        <Col sm={2}>
                            <Card>
                                <CardBody>
                                    <Row>
                                    <li>
                                        <img className="avatar-img-list" src={'http://localhost:3001/users/avatar/' + item.image.split('/')[1]} alt="" />
                                        <Label for="won-games" className="lb-text">{item.firstname + " " + item.lastname}</Label>
                                    </li> 
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                    )
                    )}
                </div>
            );
        }
        
        
    }
}
//Export the friend component.
export default Friend;