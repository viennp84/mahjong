import React, { Component } from 'react';
import '../styles/Introduction.css';
import {Img} from 'react-image';
import Scoring from'./Scoring';
import MahjongSet from "../images/mahjongset.jpg";
/*
Vien Nguyen
CST-452 Senior Project II
January 10th/2020
This is the Introduction component. 
The component is calling the API to get the data and display on the page
*/
//Introduction class
class Introduction extends React.Component {
    constructor(props) {
        super(props);
        //Using React state
        this.state = {
            error: null,
            isLoaded: false,
            //Store retutn data from the API
            items: []
        };
    }
    //componentDidMount is automatically run when first initiates rendering the page.
    componentDidMount() {
        //Get data from back end API
        fetch("http://localhost:3001/users/introduce")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        //assigns result data to items variable of react state.
                        items: result
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
    //Rendering the html tag and condition with React Render
    render() {
        //Assigning the variable with react state.
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error:{error.message}</div>
        } else if (!isLoaded) {
            return <div></div>;
        } else {
            return (
                <div className="Introduction center">
                    <h1 className="center">Welcome to Mahjong</h1>
                    <p className="blocktext">{items.data.result.welcome}</p>
                    <h2>Players</h2>
                    <p className="blocktext">{items.data.result.players}</p>
                    <h2>Components</h2>
                    <div className="mahjongset">
                        {<Img src={MahjongSet}/>}
                    </div>
                    <p className="blocktext">{items.data.result.components}</p>
                    <h2>Goal</h2>
                    <p className="blocktext">{items.data.result.goal}</p>
                    <h2>Setup</h2>
                    <p className="blocktext">{items.data.result.setup}</p>
                    <h2>Play</h2>
                    <p className="blocktext">{items.data.result.play}</p>
                    <h2>Kong</h2>
                    <p className="blocktext">{items.data.result.kong}</p>
                    <h2>Hand End</h2>
                    <p className="blocktext">{items.data.result.handend}</p>
                    <h2>Scoring</h2>
                    <Scoring/>
                    <h2>Game End</h2>
                    <p className="blocktext">{items.data.result.gameend}</p>
                    <h1> Additional Notes:</h1>
                    <p className="blocktext">{items.data.result.additionalnote}</p>
                    <h2>CHARLESTON:</h2><p className="blocktext">{items.data.result.charleston}</p>
                </div>
            );
        }
    }
}
//Export component for reused
export default Introduction;