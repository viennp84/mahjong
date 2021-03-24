import React, { useRef, useState, useEffect } from 'react'; //Import react component
import { fabric } from 'fabric'; //Import fabricjs library
import Tile from './Tile'; //Import Tile class
import Board from './Board'; //Import board class
import Dice from "../images/dice.png";
import socketClient from 'socket.io-client'; //Import socket client library
import io from 'socket.io-client';
/*
Vien Nguyen
CST-452 Senior Project II
January 19th/2021
This is the game component where to manage the game feautes and business
*/
//Initiate the game business and Game interface
const Game = () => {
  //Declare the tile
  var tile = new Tile();
  //Declare the board game
  var board = new Board();
  //Declare the componant variable
  const [canvas, setCanvas] = useState('');
  const [diceValue, setDiceValue] = useState(10);
  const ENDPOINT = 'localhost:5000';
  //Initiate the board game interface
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(()=>{
    //Get the name and room from the url passing to the constructor 
    socket = io(ENDPOINT);
    socket.emit('join',()=>{
    });
    },[]);
  //Initiate the game interface method
  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 600,
      width: 800,
      backgroundColor: 'lightgreen'
    })
  )
  //Load the dice and display them into the canvas mahjong board
  //Calling the dice API service 
  const loadDiceSet = canvi =>{
    fetch("http://localhost:3001/game/getThreeDice")
    .then(res => res.json())
    .then(
        (result) => {
          var leftPosition = 650; //Set the left positon for the dice
          var topPosition = 550; //Set the right position for the dice
          result.data.result.map( //Loop all the tiles to display
            x => fabric.Image.fromURL(Dice, function(myImg) {
              //i create an extra var for to change some image properties
              var img1 = myImg.set({ left: leftPosition, top: topPosition ,width:504,height:486});
              canvi.add(img1); //Add the dice into the board game
              img1.scaleToWidth(40); //Scale down the dice size
              leftPosition+=40; //Update the dice position
            })
          );
        },
    )
  }
  //Load the mahong set and display the tiles into the game board
  //Calling the getAllMahjongTile from API service
  const loadMahjongSet = canvi => {
    fetch("http://localhost:3001/game/getAllMahjongTiles")
            .then(res => res.json())
            .then(
                (result) => {
                  var leftPosition = 80; //Set the left possition for the tile
                  var topPosition = 20; //Set the right possition for the tile
                  canvi.renderAll(); //Update the canvas
                  result.data.result.map( //Loop through all the tiles 
                    x => fabric.Image.fromURL(x.tileImage, function(myImg) {
                      //i create an extra var for to change tile properties
                      var img1 = myImg.set({ left: leftPosition, top: 0 ,width:100,height:100});
                      canvi.add(img1); //Add tile to the board game
                      img1.scaleToWidth(50); //Scale down the tile size
                    console.log(leftPosition+=40)
                    canvi.renderAll();
                    img1.animate('top', x.top + topPosition,{
                      onChange: canvi.renderAll.bind(canvi),
                      duration:4000
                    })
                    if(leftPosition == 720){
                      leftPosition = 80;
                      topPosition +=60
                    }
                    })
                  );
                },
            )
  }
  //Socket IO server address
  const SERVER = "http://127.0.0.1:3001";
  //Render the home page from the home component
  var socket = socketClient(SERVER);
  //Rolling the dice (testing feature)
  const rollDice = () =>(
    setDiceValue(80),
    socket.emit('channel-join')
    
  )
  //Render the game interface
  return(
    <div>
      <h1>Mahjong Table</h1>
      <canvas id="canvas" />
      <button onClick={()=> loadMahjongSet(canvas)}>
        Load Mahjong Set
      </button>
      <button onClick={()=> loadDiceSet(canvas)}>
        Load Dice Set
      </button>
      <button onClick={()=> rollDice()}>
        Roll Dice
      </button>
    </div>
  );
}
export default Game;