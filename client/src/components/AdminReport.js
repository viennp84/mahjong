import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { ButtonToggle } from 'reactstrap';
import { Button, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
/*
Vien Nguyen
CST-452 Senior Project II
Feb 1st/2021
This is the home component. It contains Admin component
*/
//Create the home page component
class AdminReport extends React.Component{
    constructor(props){
        
        super(props);
        this.keyWordChangeHandler = this.keyWordChangeHandler.bind(this);
        this.state={
            message: '',
            actionViewUsers: false,
            items: '',
            hasData: false,
            keyWord: '',
            isUnactivatedUser: false
        };
        
    }

    getAllUsers = e => {
          e.preventDefault();
         // do something here
        fetch("http://localhost:3001/admin/getAllUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result
                    });
                    console.log(result)
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    getActivatedUsers = e => {
          e.preventDefault();
         // do something here
        fetch("http://localhost:3001/admin/getActivatedUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result
                    });
                    console.log(result)
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    logicalRemoveUser = e => {
        const userId = 118;
        e.preventDefault();
        fetch("http://localhost:3001/admin/deactivateAccount/" + userId).then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                //Redirect the page after registered. 
                if(result.message.result === true){
                    this.setState({message: "Removed user successfully"})
                    
                }else{
                    this.setState({message: "Could not remove user"})
                }
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    getUnActivatedUsers = e => {
          e.preventDefault();
         // do something here
        fetch("http://localhost:3001/admin/getUnActivateddUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result,
                        isUnactivatedUser: true
                    });
                    //console.log(result)
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    searchForUser= e => {
       e.preventDefault();
        fetch("http://localhost:3001/admin/searchForUser/" + this.state.keyWord)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result
                    });
                    console.log(result)
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }   
    keyWordChangeHandler(event){
        this.setState({keyWord: event.target.value});
    }
    renderUserDataTable(items, isUnactivatedUser) {
        return items.data.result.map((items, index) => {
           const { email,
           firstname,
           image,
           isActivated,
           lastLogin,
           lastname,
           phone,
           role,
           userId,
           username} = items //destructuring
           return (
              <tr key={userId}>
                 <td>{userId}</td>
                 <td>{username}</td>
                 <td>{firstname}</td>
                 <td>{lastname}</td>
                 <td>{phone}</td>
                 <td>{email}</td>
                 <td>{isActivated?'Yes':'No'}</td>
                 <td>{lastLogin}</td>
                 <td>{isActivated?'':<ButtonToggle onClick={this.logicalRemoveUser}>Remove</ButtonToggle>}</td>
                
              </tr>
           )
        })
     }    

    //Render the Admin component.
    render(){
        const { error, isLoaded, items, hasData, isUnactivatedUser} = this.state;
        //console.log(items);
        return(
            //Include the menu component into the home page
           <div className="Home">
               <ButtonToggle color="info" onClick={this.getAllUsers} >View all users</ButtonToggle>{' '}
               <ButtonToggle color="info" onClick={this.getActivatedUsers}>View active users</ButtonToggle>{' '}
               <ButtonToggle color="info" onClick={this.getUnActivatedUsers}>View unactived users</ButtonToggle>{' '}
                <input name="keyword" type="text" value={this.state.keyWord} onChange={this.keyWordChangeHandler}/>{' '}
                <ButtonToggle color="info" onClick={this.searchForUser}>Search</ButtonToggle>{' '}
                {hasData?(
                    <div>
                            {/* <h2>Co data</h2> */}
                            {/* <p1>{items.data.result.map(item => (
                                <p key={item.userId}>
                                <h3> Username: {item.username} </h3> 
                                </p>
                            ))}</p1> */}
                        <h1 id='title'>List of users</h1>
                        <label style={{color: 'red'}}>{this.state.message}</label>
                        <table id='users'>
                        <tbody>
                        <tr>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Activated</th>
                                <th>Recently Loggedin</th>
                        </tr>
                            {this.renderUserDataTable(items)}
                        </tbody>
                        </table>
                    </div>
                ):(
                    <h2>Click on the controls to view user details</h2>
                )
                }
           </div>
        );
    }
}
export default AdminReport;

