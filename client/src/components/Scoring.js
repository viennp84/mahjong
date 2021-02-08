import React, { Component } from 'react';
import {Img} from 'react-image';
import '../styles/Introduction.css';
//Import the mahong images for the Bamboo set
import OneBam from "../images/1-bam.png";
import TwoBam from "../images/2-bam.png";
import ThreeBam from "../images/3-bam.png";
import FourBam from "../images/4-bam.png";
import FiveBam from "../images/5-bam.png";
import SixBam from "../images/6-bam.png";
import SevenBam from "../images/7-bam.png";
import EightBam from "../images/8-bam.png";
import NineBam from "../images/9-bam.png";
//Import the mahjong images for the Dot set
import OneDot from "../images/1-dot.png";
import TwoDot from "../images/2-dot.png";
import ThreeDot from "../images/3-dot.png";
import FourDot from "../images/4-dot.png";
import FiveDot from "../images/5-dot.png";
import SixDot from "../images/6-dot.png";
import SevenDot from "../images/7-dot.png";
import EightDot from "../images/8-dot.png";
import NineDot from "../images/9-dot.png";
//Import the mahjong images for the Chrac set.
import OneChrac from "../images/1-chrac.png";
import TwoChrac from "../images/2-chrac.png";
import ThreeChrac from "../images/3-chrac.png";
import FourChrac from "../images/4-chrac.png";
import FiveChrac from "../images/5-chrac.png";
import SixChrac from "../images/6-chrac.png";
import SevenChrac from "../images/7-chrac.png";
import EightChrac from "../images/8-chrac.png";
import NineChrac from "../images/9-chrac.png";
//Import the Dragon set and Wind set
import RedDragon from "../images/redDragon.png";
import GreenDragon from "../images/greenDragon.png";
import WhiteDragon from "../images/whiteDragon.png";
import WestWind from "../images/westWind.png";
import EastWind from "../images/eastWind.png";
import SouthWind from "../images/southWind.png";
import NorthWind from "../images/northWind.png";
//Import the flower set.
import Spring from "../images/spring.png";
import Summer from "../images/summer.png";
import Autumn from "../images/autumn.png";
import Winter from "../images/winter.png";
import Plum from "../images/plum.png";
import Orchid from "../images/orchid.png";
import Bamboo from "../images/bamboo.png";
import Chrysanthemum from "../images/chrysanthemum.png";
/*  Vien Nguyen
    CST-452 Mahjong Game Online
    01/01/2020
    Scoring class. Display the rules how to score the game and images for demonstration.
*/
class Scoring extends React.Component {
    constructor(props) {
        super(props);
        //Import the image collection into the state.
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            images:[
            OneBam,TwoBam,ThreeBam,FourBam,FiveBam,SixBam,SevenBam,EightBam,NineBam,
            OneChrac,TwoChrac,ThreeChrac,FourChrac,FiveChrac,SixChrac,SevenChrac,EightChrac,NineChrac,
            OneDot,TwoDot,ThreeDot,FourDot,FiveDot,SixDot,SevenDot,EightDot,NineDot,
            RedDragon,WhiteDragon,GreenDragon,
            EastWind,SouthWind,WestWind,NorthWind,
            Spring,Summer,Autumn,Winter,
            Plum,Orchid,Bamboo,Chrysanthemum
        ]

        };
    }
    //Get the scoring data from the scoring API.
    componentDidMount() {
        fetch("http://localhost:3001/users/scoring")
            .then(res => res.json())
            .then(
                //Assign the result of calling scoring API to items variable 
                (result) => {
                    this.setState({
                        isLoaded: true,
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
    //Reder the score description and the images with each rule.
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error:{error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>   
                    {items.data.result.map(item => (
                        <p key={item.id}>
                           <h3> {item.name}  <p class="p.blocktext">Score:{item.score}</p></h3> 
                            <p class="blocktext">{item.description} </p>
                            <div class="tile">
                                {Array.from(item.tiles.split(',')).map((im)=><Img src={im}/>)}
                            </div>
                        </p>
                    ))}
                </div>
            );
        }
    }
}
//Export the Scoring component.
export default Scoring;