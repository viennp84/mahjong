import React, { Children, Component } from 'react';
import '../styles/Introduction.css';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import {Card, Button, Row, Col, CardHeader, CardBody, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import UploadProfile from "./UploadProfile";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Profile.css';
/*
Vien Nguyen
CST-452 Senior Project II
Feb 1st/2020
Profile component. It contains user personal information as first name,
last nane, phone, email, profile image
*/
class Profile extends React.Component {
    //Declare react constructor and state.
    constructor(props) {
        super(props);
       //Binding betwwen state and controls
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.updateOnClick = this.updateOnClick.bind(this);
        this.cancelUpdateOnClick = this.cancelUpdateOnClick.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.state = {
            error: null,
            userProfile: null,
            update: false,
        };
    }

    getData(){
        let data = sessionStorage.getItem('mySessionStorageData');
        data = JSON.parse(data);
        console.log(data.name);
    }
    //Update firstname, lastname, email, phone when stage on controls are changed.
    //Update firstname
    firstNameChangeHandler(event) {
        this.setState({ firstname: event.target.value });
    }
    //update lastname
    lastNameChangeHandler(event) {
        this.setState({ lastname: event.target.value });
    }
    //update email
    emailChangeHandler(event) {
        this.setState({ email: event.target.value });
    }
    //update phone
    phoneChangeHandler(event) {
        this.setState({ phone: event.target.value });
    }
    //Event update on click will set update value and show update form.
    updateOnClick(value) {
        this.setState({ update: value });
    }
    //Event cancel will set update to false and return to profile page
    cancelUpdateOnClick() {
        this.setState({ update: false });
    }
    //Handle update event, take the data from control, create user object and call updateProfile
    //service from API.
    handleUpdateSubmit(event, errors, values) {
        this.setState({ errors, values });
        if (errors.length > 0) {
            return;
        }
        //Initiate a user object
        const user = {
            //userId: event.target.elements.userId.value,
            userId: 115,
            firstname: event.target.elements.firstname.value,
            lastname: event.target.elements.lastname.value,
            email: event.target.elements.email.value,
            phone: event.target.elements.phone.value
        }
        /*--------------------------------------------------*/
        /*The update take userId as the preference for updating.*/
        /*Currently, hard code the userId*/
        //Send user object to update profile controller
        axios.post('http://localhost:3001/users/updateProfile', { user }).then(
            res => {
                if (res.data.message.msg === true) {
                    console.log(res.data.message.msg);
                    this.setState({
                        isLoaded: true
                    });
                    //Get back the data updated in the database from calling API so that it indicates the latest data.
                    fetch("http://localhost:3001/users/profile/"+JSON.parse(sessionStorage.getItem('mySessionStorageData')).userId)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                this.setState({
                                    isLoaded: true,
                                    userProfile: result,
                                    update: false
                                });
                            },
                            (error) => {
                                this.setState({
                                    isLoaded: true,
                                    error
                                });
                            }
                        )
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }
    //Initatial data on the profile page.
    componentDidMount() {
        fetch("http://localhost:3001/users/profile/"+JSON.parse(sessionStorage.getItem('mySessionStorageData')).userId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        userProfile: result,
                        update: false
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    //Render page with condition. if update state is true, display the update form. Otherwise, showing the profile information.
    render() {
        //Declare and assign the variables for redering data on the form.
        const { error, isLoaded, userProfile, update } = this.state;
        if (error) {
            return <div>Error:{error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading profile....</div>;
        } else if (update) {
            return (
                <div className="container" style={{ paddingTop: 30 }}>
                    <Row>
                        <Col sm={12}>
                            <Card>
                                <CardHeader>
                                    Update personal profile
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col sm={12} style={{ paddingTop: 30 }}>
                                            {userProfile.data.result.map(user => (

                                                <AvForm onSubmit={this.handleUpdateSubmit} className="form-update">
                                                    <h2>Update Profile</h2>
                                                    <label style={{ color: 'red' }}>{this.state.message}</label>
                                                    <Row>
                                                        <AvField name="userId" hidden="true" value={user.userId} />
                                                        <Col xs="8">
                                                            <AvField name="firstname" label="First Name*" value={user.firstname}
                                                                type="text" onChange={this.firstNameChangeHandler}
                                                                validate={{
                                                                    required: { value: true, errorMessage: 'Please enter first name' }
                                                                }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="8">
                                                            <AvField name="lastname" label="Last Name*" value={user.lastname}
                                                                type="text" onChange={this.lastNameChangeHandler}
                                                                validate={{
                                                                    required: { value: true, errorMessage: 'Pleas enter your last name' }
                                                                }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="8">
                                                            <AvField name="email" label="Email*" value={user.email}
                                                                type="email" onChange={this.emailChangeHandler} errorMessage="Invalid email"
                                                                validate={{
                                                                    required: { value: true, errorMessage: "Please enter your email" }
                                                                }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="8">
                                                            <AvField name="phone" label="Phone*" value={user.phone} onChange={this.phoneChangeHandler}
                                                                type="text" errorMessage="Invalid phone number"
                                                                validate={{
                                                                    required: { value: true, errorMessage: "Please enter phone number" },
                                                                    tel: true
                                                                }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <UploadProfile /></Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Button color="primary btn-update" >Update</Button>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Button color="primary btn-cancel" onClick={this.cancelUpdateOnClick}>Cancel</Button>
                                                        </Col>
                                                        
                                                    </Row>
                                                </AvForm >
                                            )
                                            )}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            //Render the personal profile page
            return (
                <div className="container" style={{ paddingTop: 30 }}>
                     <button onClick={()=>this.getData()}></button>
                    <Row>
                        <Col sm={12}>
                            <Card>
                                <CardHeader>
                                    Personal profile
                                </CardHeader>
                                <CardBody>
                                    {/* <Row><UploadProfile /></Row> */}
                                    <Row>
                                        <Col sm={12} style={{ paddingTop: 30 }}>
                                            {userProfile.data.result.map(user => (

                                                <div key={user.userId}>
                                                    <Row>
                                                        <img className="avatar-img" src={'http://localhost:3001/users/avatar/' + user.image.split('/')[1]} alt="" />
                                                    </Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Label for="won-games" className="lb-text">Total games won</Label>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Label for="won-game">{user.wonGames}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Label for="total-games" className="lb-text">Total games played</Label>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Label for="total-game">{user.totalGames}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Label for="won-games" className="lb-text">Your balance </Label>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Label for="total-game">{user.score}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Label for="firstname" className="lb-text">First Name</Label>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Label for="firstname">{user.firstname}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Label for="lastname" className="lb-text">Last Name</Label>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Label for="lastname" >{user.lastname}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Label for="email" className="lb-text">Email</Label>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Label for="email" >{user.email}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="4">
                                                            <Label for="phone" className="lb-text">Phone Number</Label>
                                                        </Col>
                                                        <Col xs="4">
                                                            <Label for="phone">{user.phone}</Label>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs="4">
                                                        </Col>
                                                        <Col xs="4">
                                                            <Button color="info" onClick={this.updateOnClick}>Update</Button>

                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}

                                        </Col>
                                    </Row>
                                    <Row>

                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </div>
            );
        }
    }
}
//Export Profile component
export default Profile;