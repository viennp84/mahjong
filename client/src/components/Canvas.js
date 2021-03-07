export default class Canvas {
    constructor(canvasElement){
      this.canvasElement = canvasElement
      this.ctx = canvasElement.getContext('2d')
      this.ctx.fillStyle = "lightgreen";
      this.ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }
    createCircle(){
      const x = Math.floor(Math.random() * 450)
      const y = Math.floor(Math.random() * 450)
      
      this.ctx.beginPath()
      this.ctx.arc(x, y, 50, 0, 2 * Math.PI)
      this.ctx.stroke()
      
    }

    createTile(){
        var imgData = this.ctx.createImageData(100, 100);
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+0] = 255;
        imgData.data[i+1] = 0;
        imgData.data[i+2] = 0;
        imgData.data[i+3] = 255;
        }
        this.ctx.putImageData(imgData, 100, 100);
      }

  }