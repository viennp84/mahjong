import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Introduction from './Introduction';
/*
Vien Nguyen
CST-452 Senior Project II
January 10th/2020
This is the home component. It contains Introduction component in which shows 
the game general information
*/
//Create the home page component
class Home extends React.Component{
    constructor(props){
        
        super(props);
        this.state={
            message: '',
            user: null
        };
    }
    getData(){
        let data = sessionStorage.getItem('mySessionStorageData');
        data = JSON.parse(data);
        console.log(data.firstName);
    }
    //Render the Introduction component.
    render(){
        return(
            
            //Include the menu component into the home page
           <div className="Home">
                <button onClick={()=>this.getData()}></button>
               {/* Render the Inroduction component */}
                <Introduction/>
                
           </div>
        );
    }
}
export default Home;