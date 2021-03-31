import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { stopReportingRuntimeErrors } from "react-error-overlay";




import Login from './components/Login';
import Register from './components/Register';

if (process.env.NODE_ENV === "development") {
  stopReportingRuntimeErrors(); // disables error overlays
}
// //Import register component
// const RegisterForm = () => 
// <div className="Register">
//   <Register/>
// </div>;
// //Import login component
// const LoginForm = () => 
// <div className="Login">
//   <Login/>
// </div>;

ReactDOM.render(
  <React.StrictMode>
    {/* <Router>
      <div className="login">
        <div className="Login">
        <Route path="/" exact component={LoginForm} />
        </div>

        <div className="register">
        <Route path="/register/" component={RegisterForm} />
        </div> 
       
        <Route path="/home/" component={App} />
      </div>
    </Router> */}
    <div><App></App></div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
