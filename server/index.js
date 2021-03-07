const express = require('express');
var session = require('client-sessions');
//Require for crossplatform
const cors = require("cors"); 
const bodyParser = require('body-parser');
//Declare the userRout to process the request from the user
var userRoutes = require('./routes/user.route');
var adminRoutes = require('./routes/admin.route');
var gameRoutes = require('./routes/game.route');
const app = express();
// Allow REACTApp  from this specific address to access
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
//Declare the host address
const hostname = '127.0.0.1';
//Declare the running port
const port = 3001;
//Using json and cross platform service
app.use(express.json());
app.use(cors(corsOptions));
app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
      extended: true,
  })
]);
app.use(session({
  cookieName: 'session',
  secret: 'viennguyen1212MahjongGame',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));
//Testing the service server
app.get('/', function(request, response){
  response.send('Welcome to Mahjong Game');
});
//Add the users route to handle the request from the user
app.use('/users', userRoutes);
//Add the adminroute to handle the request from the admin
app.use('/admin', adminRoutes);
//Add the gameroute to handle the request from the game
app.use('/game', gameRoutes);
//Running the app
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});