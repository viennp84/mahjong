import React, { Component } from "react";
import {
    FormGroup, Label, Input,
    Form
} from 'reactstrap';
import axios, { post, get } from 'axios';
import '../styles/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/*
Vien Nguyen
CST-452 Senior Project II
January 17th/2020
Upload component class is resposible for an Avatar profile,
upload file to server and update profile in the database.
*/
class UploadProfile extends Component {
    //Set the file variable to react state.
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            message:''
        }
    }
    //display the image if it is available in the database.
    render() {
        //Load image into the image tag after state has changed.
        if (this.state.imageUrl) {
            return (
                <div>
                    {
                        //Get the image form url and display
                        this.state.imageUrl ? (
                            <img className="avatar-img" src={this.state.imageUrl} alt="" />
                        ) : null
                    }
                </div>
            )
        } else {
            return (
                <div className="container">
                    <Form encType="multipart/form-data" className="form-upload">
                        <FormGroup >
                            <Label for="avatar">Select Avatar</Label>
                            <label style={{color: 'red'}}>{this.state.message}</label>
                            <Input
                                onChange={(evt) => {
                                    evt.preventDefault();
                                    this.setState({
                                        file: evt.target.files[0],
                                    })
                                }}
                                type="file" name="avatar" id="avatar"
                                placeholder="Select file" />
                        </FormGroup>
                        <button type="button"
                            className="btn btn-primary btn-upload"
                            onClick={(evt) => {
                                evt.preventDefault()
                                if (!this.state.file) {
                                    alert('You have not select an avatar.')
                                    return;
                                }
                                if (!this.state.file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                                    this.setState({message:'Please select valid image.'});
                                    return false;
                                }
                                 console.log(JSON.parse(sessionStorage.getItem('mySessionStorageData')).userId);
                                const formData = new FormData();
                                formData.append("avatar", this.state.file);
                                formData.append("userId", sessionStorage.getItem('mySessionStorageData').userId);
                                const config = {
                                    headers: {
                                        'content-type': 'multipart/form-data'
                                    }

                                }//Call API to store the uploading image.
                                post('http://localhost:3001/users/avatar', formData, config).then(res => {
                                    console.log('RES', res.data.fileNameInServer)
                                    let filePath = res.data.fileNameInServer
                                    if (filePath) {
                                        filePath = filePath.split('/')[1]
                                    }
                                    //Get the avatar image after uploaded.
                                    this.setState({
                                        imageUrl: 'http://localhost:3001/users/avatar/' + filePath
                                    })
                                })
                            }}
                        >
                            Upload
                        </button>
                    </Form>
                </div>
            );
        }
    }
}
//Export upload profile
export default UploadProfile;
