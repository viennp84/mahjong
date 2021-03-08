import React, {Component} from 'react'; //Import component React library
import "bootstrap/dist/css/bootstrap.min.css" //Import css file for the component
import { ButtonToggle } from 'reactstrap'; //Import Reactstrap javascript library
/*
Vien Nguyen
CST-452 Senior Project II
Feb 1st/2021
This component will generate the report for admin.
The admin can will the active users. View the users that have not activate the account.
View all users.
*/
//Create the Admin report page component
class AdminReport extends React.Component{
    //Create the class constructor
    constructor(props){
        //Initiating the class properties and data
        super(props);
        //Binding the keyword text box with data change event.
        this.keyWordChangeHandler = this.keyWordChangeHandler.bind(this);
        //Create the initial state
        this.state={
            message: '',
            actionViewUsers: false,
            items: '',
            hasData: false,
            keyWord: '',
            isUnactivatedUser: false
        };
    }
    /*The method will call the getAllUsers API service
    get the respond data to fetch the display on a table via result variable*/
    getAllUsers = e => {
          e.preventDefault();
         // Call API service
        fetch("http://localhost:3001/admin/getAllUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result
                    });
                    //Checking if result has data
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                //Display error if cannot call the API service
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    /*The method will call getActivatedUsers from an API server
    to get all user that is activated*/
    getActivatedUsers = e => {
          e.preventDefault();
         // calling the API
        fetch("http://localhost:3001/admin/getActivatedUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result
                    });
                    //Checking the result for data existance from the result
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                //Display the error if cannot get the data from API service
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    /*The method will call logical Remove User from an API server
    to remove a user*/
    logicalRemoveUser = e => {
        const userId = 118; //HArd code for testing only
        //const userId = '';
        e.preventDefault();
        //Calling the deactivateAccount Service
        fetch("http://localhost:3001/admin/deactivateAccount/" + userId).then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                //Redirect the page after registered. 
                if(result.message.result === true){
                    //set notification message
                    this.setState({message: "Removed user successfully"})
                }else{
                     //set notification message
                    this.setState({message: "Could not remove user"})
                }
        })
        //Display the error
        .catch((err)=>{
            console.log(err)
        });
    }
    /*The method to get the uncativated user*/
    getUnActivatedUsers = e => {
          e.preventDefault();
         // Calling the get unactivated users from API Service
        fetch("http://localhost:3001/admin/getUnActivateddUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result,
                        isUnactivatedUser: true
                    });
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                //Set the error value
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    /*The method for searching the user on the user database*/
    searchForUser= e => {
       e.preventDefault();
       //Calling the search service from the API service
        fetch("http://localhost:3001/admin/searchForUser/" + this.state.keyWord)
            .then(res => res.json())
            .then(
                (result) => {
                    //Set the stage 
                    this.setState({
                        //assigns result data to items variable of react state.
                        items: result
                    });
                    //Check for the rusult has data
                    if(result){
                        this.setState({hasData: true})
                    }
                },
                //Display the error message
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    } 
    /*Method to bind the key search change*/  
    keyWordChangeHandler(event){
        //Set the state data
        this.setState({keyWord: event.target.value});
    }
    /*Method to render the report table*/
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

