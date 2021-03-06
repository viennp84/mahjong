import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { ButtonToggle } from 'reactstrap';
import { Button, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

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
            keyWord: ''
        };
        
    }
    // componentDidMount() {
    //     //Get data from back end API
    //     fetch("http://localhost:3001/admin/viewUsers")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     //assigns result data to items variable of react state.
    //                     items: result
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    // }
    getAllUsers = e => {
          e.preventDefault();
         // do something here
        fetch("http://localhost:3001/admin/getAllUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
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
                        isLoaded: true,
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
                        isLoaded: true,
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
                        isLoaded: true,
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
                        isLoaded: true,
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
                        isLoaded: true,
                        error
                    });
                }
            )
    }   
    keyWordChangeHandler(event){
        this.setState({keyWord: event.target.value});
    }
    renderTableHeader() {
        let header = Object.keys(this.state.items[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    
    renderUserDataTable(items) {
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
              </tr>
           )
        })
     }    

    //Render the Admin component.
    render(){
        const { error, isLoaded, items, hasData } = this.state;
        //console.log(items);
        return(
            //Include the menu component into the home page
           <div className="Home">
               <ButtonToggle color="info" onClick={this.getAllUsers} >View all users</ButtonToggle>{' '}
               <ButtonToggle color="info" onClick={this.getActivatedUsers}>View active users</ButtonToggle>{' '}
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
                        <h1 id='title'>The table of all users</h1>
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
                    <h2>There is no user data</h2>
                )
                }
           </div>
        );
    }
}
export default AdminReport;

