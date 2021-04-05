import React, { useRef, useState, useEffect } from 'react'; //Import react component
import { fabric } from 'fabric'; //Import fabricjs library
import Tile from './Tile'; //Import Tile class
import Board from './Board'; //Import board class
import Dice from "../images/dice.png";
import io from 'socket.io-client';



import UserContainer from './UserContainer/UserContainer'; //Import user container
let socket;
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
  let data = sessionStorage.getItem('mySessionStorageData');
        data = JSON.parse(data);
  const [name, setName] = useState(data.firstName);
  const [room,setRoom] = useState('nguyen');
  const [users, setUsers] = useState([]);
  const [eastPlayer, setEastPlayer] = useState('');
  const [sourthPlayer, setSourthPlayer] = useState('');
  const [westPlayer, setWestPlayer] = useState('');
  const [northPlayer, setNorthPlayer] = useState('');
  const [numberPlayers, setNumberPlayers] = useState('');
  const [loading, setLoading] = useState(false);
  const [eastPlayerDice, setEastPlayerDice] = useState('3');
  const [sourthPlayerDice, setSourthPlayerDice] = useState('');
  const [westPlayerDice, setWestPlayerDice] = useState('');
  const [northPlayerDice, setNorthPlayerDice] = useState('');

  //Initiate the game interface method
  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 600,  
      width: 800,
      backgroundColor: 'lightgreen'
    })
  );
  //Initiate the board game interface
  useEffect(() => {
    setCanvas(initCanvas());
        //Get the name and room from the url passing to the constructor 
        socket = io(ENDPOINT);
        //Get in the room game with player name and room
        socket.emit('join',{name,room},()=>{});
  }, []);

  useEffect(()=>{
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  },[ENDPOINT]);

  useEffect(() =>{
      socket.on("roomData", ({ users }) => {
          setUsers(users);
          setNumberPlayers();
          if(numberPlayers == 4){
            setNumberPlayers = 4;
          }
        });
      socket.on("showrolldice", ({users}) => {
        setUsers(users);
        // if(users[0].playPosition === 1){
        //   markEastPlayer(canvas);
        // }
        // if(users[1].playPosition === 2){
        //   markSorthPlayer(canvas);
        // }
        // if(users[2].playPosition === 3){
        //   markWestPlayer(canvas);
        // }
        // if(users[3].playPosition === 4){
        //   markNorthPlayer(canvas);
        // }

        loadDiceSet(canvas);
        // loadMahjongSet(canvas);
        // markEastPlayer(canvas);
        // markSorthPlayer(canvas);
        // markWestPlayer(canvas);
        // markNorthPlayer(canvas);
      });
      socket.on("showMahjongSet", () => {
        loadMahjongSet(canvas);
      });
      socket.on("movingtile", ({tileid, tileX, tileY, tileOnUser}) => {
        console.log(tileid);
        console.log(tileX);
        console.log(tileY);
        console.log('It is on: ' + tileOnUser);
        console.log('tile is moving');
       
      var tiles = canvas._objects;
      console.log(name);
        if(undefined !==tiles && tileOnUser !== name){
          console.log(tiles);
          tiles.forEach(element => {
            if(element.id === tileid){
              element.top = tileY;
              element.left = tileX;
            }
          });
          canvas.renderAll();
        } 
      });
  },[numberPlayers]);

  const rollDice = () =>(
    socket.emit("rolldice",()=>{
    })
  );

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
              canvi.renderAll(); //Update the canvas
              //i create an extra var for to change some image properties
              var img1 = myImg.set({ left: leftPosition, top: topPosition ,width:504,height:486});
              canvi.add(img1); //Add the dice into the board game
              img1.scaleToWidth(40); //Scale down the dice size
              leftPosition+=40; //Update the dice position
            })
          );
        },
    )
  };

  const markEastPlayer = canvi =>{
    fabric.Image.fromURL(Dice, function(myImg) {
      canvi.renderAll(); //Update the canvas
      //i create an extra var for to change some image properties
      var img1 = myImg.set({ left: 50, top: 560 ,width:504,height:486});
      canvi.add(img1); //Add the dice into the board game
      img1.scaleToWidth(40); //Scale down the dice size
       //Update the dice position
    })
  }
  const markSorthPlayer = canvi =>{
    fabric.Image.fromURL(Dice, function(myImg) {
      canvi.renderAll(); //Update the canvas
      //i create an extra var for to change some image properties
      var img1 = myImg.set({ left: 750, top: 460 ,width:504,height:486});
      canvi.add(img1); //Add the dice into the board game
      img1.scaleToWidth(40); //Scale down the dice size
       //Update the dice position
    })
  }

  const markWestPlayer = canvi =>{
    fabric.Image.fromURL(Dice, function(myImg) {
      canvi.renderAll(); //Update the canvas
      //i create an extra var for to change some image properties
      var img1 = myImg.set({ left: 700, top: 30 ,width:504,height:486});
      canvi.add(img1); //Add the dice into the board game
      img1.scaleToWidth(40); //Scale down the dice size
       //Update the dice position
    })
  }

  const markNorthPlayer = canvi =>{
    fabric.Image.fromURL(Dice, function(myImg) {
      canvi.renderAll(); //Update the canvas
      //i create an extra var for to change some image properties
      var img1 = myImg.set({ left: 20, top: 90 ,width:504,height:486});
      canvi.add(img1); //Add the dice into the board game
      img1.scaleToWidth(40); //Scale down the dice size
       //Update the dice position
    })
  }

  const showMahjongSet = () =>(
    socket.emit("loadMahjongSet",()=>{
    })
  );


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
                      console.log(x.id);
                      //i create an extra var for to change tile properties
                      var img1 = myImg.set({id: x.id, left: leftPosition, top: 0 ,width:100,height:100});
                      canvi.add(img1); //Add tile to the board game
                      console.log(img1);
                      img1.scaleToWidth(50); //Scale down the tile size
                    console.log(leftPosition+=40)
                    canvi.renderAll();
                    img1.animate('top', x.top + topPosition,{
                      onChange: canvi.renderAll.bind(canvi),
                      duration:1000
                    })
                    //Event select an object
                    img1.on('selected', function() {
                      console.log('selected a circle');
                      console.log(img1);
                      img1.scaleToWidth(100);
                      // socket.emit("rolldice",()=>{
                      // })
                    });
                    img1.on('deselected', function() {
                      console.log(' unselected ');
                      console.log(img1);
                      img1.scaleToWidth(50);
                    });
                    // canvas.on('mouse:down', function(img1) {
                    //   if (img1.target) {
                    //     console.log('an object was clicked! ', img1.target.type);
                    //   }
                    // });
                    img1.on('moving', function() {
                     var tileid = img1.id;
                     var tileX = img1.left;
                     var tileY = img1.top;
                     var tileOnUser = name;
                      //console.log(img1.top + " " + img1.left);
                      socket.emit('tilemove',{tileid, tileX, tileY, tileOnUser},()=>{});
                      console.log(tileid);
                    });

                    if(leftPosition == 720){
                      leftPosition = 80;
                      topPosition +=60
                    }
                    })
                  );
                },
            )
  }

  //Render the game interface
  return(
    <div>
      <h1>Mahjong Table</h1>
      <UserContainer users={users}/>
      {/* <label>Player: {eastPlayer} dice result: {eastPlayerDice}</label> */}
      <canvas id="canvas" />
      <button onClick={()=> showMahjongSet(canvas)}>
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