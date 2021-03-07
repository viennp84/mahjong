import React, { useRef, useState, useEffect } from 'react';
import canvas from './Canvas'
import { fabric } from 'fabric';
const Game = () => {

  const myCanvas = useRef()
  const [canvasObj, setCanvasObj] = useState()

  
  useEffect( () => {
    setCanvasObj( new canvas(myCanvas.current) )
  } ,[myCanvas])
  return (
    <div>
      <canvas width={600} height={600} ref={myCanvas} ></canvas>
      <button onClick={()=> canvasObj.createCircle() }>
        Create circle
      </button>
      <button onClick={()=> canvasObj.createTile() }>
        Create tile
      </button>
    </div>
  );



  // const [canvas, setCanvas] = useState('');
  // useEffect(() => {
  //   setCanvas(initCanvas());
  // }, []);

  // const initCanvas = () => (
  //   new fabric.Canvas('canvas', {
  //     height: 600,
  //     width: 800,
  //     backgroundColor: 'pink'
  //   })
  // )

  // return(
  //   <div>
  //     <h1>Fabric.js on React - fabric.Canvas('...')</h1>
  //     <canvas id="canvas" />
  //     <button onClick={()=> canvas.createCircle() }>
  //       Create circle
  //     </button>

  //   </div>
  // );
}
export default Game;