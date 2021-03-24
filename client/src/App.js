import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Login.css';
import './styles/Register.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import TopMenu from './components/TopMenu';
import Friend  from './components/Friend';
import Activate  from './components/ActivateAccount';
import AdminReport from './components/AdminReport';
import UpdatePassword from './components/UpdatePassword';
import Game from "./components/Game";

//Import register component
const RegisterForm = () => 
<div className="Register">
  <Register/>
</div>;
//Import login component
const LoginForm = () => 
<div className="Login">
  <Login/>
</div>;

const HomePage = () => 
<div className="Home">
  <Home/>
</div>;

const ProfilePage = () => 
<div className="Profile">
  <Profile/>
</div>;

const FriendPage = () => 
<div className="Friend">
  <Friend/>
</div>;

const ActivatePage = () => 
<div className="Activate">
  <Activate/>
</div>;

const AdminReportPage = () => 
<div className="AdminReport">
  <AdminReport/>
</div>;

const UpdatePasswordPage = () => 
<div className="UpdatePassword">
  <UpdatePassword/>
</div>;

const GamePage = () =>
<div className="Game">
  <Game/>
</div>
// const SERVER = "http://127.0.0.1:3001";
function App() {
  //Render the home page from the home component
  // var socket = socketClient(SERVER);
  // socket.on('connection', () => {
  //     console.log(`I'm connected with the back-end`);
  // });
   return (
   
      <Router> 
                
          <div>
            <TopMenu/>
          </div> 
        <Switch>
          <div>
            <div>
              <Route path="/" exact component={LoginForm} />
            </div>

            <div>
              <Route path="/register/" component={RegisterForm} />
            </div> 
          
             <Route path="/home/" component={HomePage} />

            <div>
              <Route path="/profile/" component={ProfilePage} />
            </div>

            <div>
              <Route path="/friend/" component={FriendPage} />
            </div>

            <div>
              <Route path="/game/" component={GamePage} />
            </div>

            <div>
              <Route path="/activateAccount/" component={ActivatePage} />
            </div>

             <div>
              <Route path="/adminReport/" component={AdminReportPage} />
            </div>

            <div>
              <Route path="/updatePassword/" component={UpdatePasswordPage} />
            </div>
            
          </div>
        </Switch>
      </Router>
   
  );
}
export default App;
