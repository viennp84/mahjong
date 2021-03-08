import axios from 'axios'; //Import the cross platform library
import React, { Component } from 'react'; //Import react component library
import {Button, Card, Row, Col, CardBody, Label } from 'reactstrap'; //Import createstrap library
import { AvForm, AvField } from 'availity-reactstrap-validation';
import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap library
import '../styles/Friend.css'; //Import custom css

/*
Vien Nguyen
CST-452 Senior Project II
Feb 1st/2021
This component is created for managing friends features
*/
class Friend extends React.Component{
    //Default constructor and declare properties
    constructor(props){
        super(props);
        this.state={
            message: '',
            email: null,
            sender: null,
            invitation: null
        };
        //Biding method to update data into the control
        this.invitationHandler = this.invitationHandler.bind(this);
        //Biding method to update data into the control
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //Update the email state with the event on the control
    invitationHandler(event){
        this.setState({email: event.target.value});
    }
    //Handling submit method to call the action on the form for data and calling API service
    handleSubmit(event, errors, values){
        this.setState({errors, values});
        if(errors.length > 0){
            return;
        }
        //Initiates a user object. 
        const invitation ={
            //Set the sender request data into the sender
            sender: sessionStorage.getItem('mySessionStorageData'),
            //Set the email
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
        })
        //Display the error message
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
                },
                //Display the error message
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
                    {items.data.result.map(item => (
                        <Row>
                        <Col sm={4}>
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