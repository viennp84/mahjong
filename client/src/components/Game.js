import React, { useRef, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import Tile from './Tile';
import Board from './Board';
import OneBam from "../images/1-bam.png";
const Game = () => {
  var tile = new Tile();
  var board = new Board();

  const [canvas, setCanvas] = useState('');
  useEffect(() => {
   
    setCanvas(initCanvas());
  }, []);

  // function onChange(options) {
  //   options.target.setCoords();
  //   canvas.forEachObject(function(obj) {
  //     if (obj === options.target) return;
  //     obj.set('opacity' ,options.target.intersectsWithObject(obj) ? 0.5 : 1);
  //   });
  // }

  // canvas.on({
  //   'object:moving': onChange,
  //   'object:scaling': onChange,
  //   'object:rotating': onChange,
  // });

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 600,
      width: 800,
      backgroundColor: 'lightgreen'
    })
  )
  const addRect = canvi => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: 'yellow'
    });
    canvi.add(rect);
    canvi.renderAll();
  }
  const addTile = canvi => {
    fabric.Image.fromURL(OneBam, function(myImg) {
    //i create an extra var for to change some image properties
    var img1 = myImg.set({ left: 0, top: 0 ,width:100,height:100});
    canvi.add(img1); 
    });
    // canvi.on('mouse:down',function(event){
    //   if(canvas.getActiveObject()){
    //     alert(event.target);
    //   }
    
    // })
    tile.tileImage = OneBam;
    console.log(tile);
    console.log(board);
  }

  const addTileToCanvas = canvi => {
    fabric.Image.fromURL(OneBam, function(myImg) {
    //i create an extra var for to change some image properties
    var img1 = myImg.set({ left: 0, top: 0 ,width:100,height:100});
    canvi.add(img1); 
    });
    // canvi.on('mouse:down',function(event){
    //   if(canvas.getActiveObject()){
    //     alert(event.target);
    //   }
    
    // })
    tile.tileImage = OneBam;
    console.log(tile);
    console.log(board);
  }
  const loadDiceSet = canvi =>{
    
  }
  const loadMahjongSet = canvi => {
    console.log("loading...");
    fetch("http://localhost:3001/game/getAllMahjongTiles")
            .then(res => res.json())
            .then(
                (result) => {
                  // result.data.result.map(x => console.log(x.tileImage)

                  // );
                  var leftPosition = 80;
                  var topPosition = 20;
                  canvi.renderAll();
                  result.data.result.map(
                    x => fabric.Image.fromURL(x.tileImage, function(myImg) {
                      //i create an extra var for to change some image properties
                      var img1 = myImg.set({ left: leftPosition, top: x.top +topPosition ,width:100,height:100});
                      canvi.add(img1); 
                      img1.scaleToWidth(50);
                    console.log(leftPosition+=40)
                    if(leftPosition == 720){
                      leftPosition = 80;
                      topPosition +=60
                    }
                    })
                  );
                },
            )
  }
// fabric.Image.fromURL(result.data.result[0].tileImage, function(myImg) {
                  //   //i create an extra var for to change some image properties
                  //   var img1 = myImg.set({ left: 0, top: 0 ,width:100,height:100});
                  //   canvi.add(img1); 
                  //   });
                  //   // canvi.on('mouse:down',function(event){
                  //   //   if(canvas.getActiveObject()){
                  //   //     alert(event.target);
                  //   //   }
                    
                  //   // })

  return(
    <div>
      <h1>Mahjong Table</h1>
      <canvas id="canvas" />
      <button onClick={()=> addRect(canvas)}>
        Create circle
      </button>
      <button onClick={()=> addTile(canvas)}>
        Create Tile
      </button>
      <button onClick={()=> loadMahjongSet(canvas)}>
        Load Mahjong Set
      </button>
      <button onClick={()=> loadDiceSet(canvas)}>
        Load Dice Set
      </button>
      {/* <img src="http://fabricjs.com/assets/pug_small.jpg" id="my-image" width="500px" height="500px"/> */}

    </div>
  );
}
export default Game;