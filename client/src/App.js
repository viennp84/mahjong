import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Login.css';
import './styles/Register.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import TopMenu from './components/TopMenu';

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




function App() {
  //Render the home page from the home component
  
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
        </div>
      </Switch>
    </Router>
  );
}
export default App;
