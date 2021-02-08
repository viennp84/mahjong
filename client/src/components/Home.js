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
    //Render the Introduction component.
    render(){
        return(
            //Include the menu component into the home page
           <div className="Home">
               {/* Render the Inroduction component */}
                <Introduction/>
           </div>
        );
    }
}
export default Home;