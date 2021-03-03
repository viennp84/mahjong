import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';

/*  Vien Nguyen
    CST-452 Mahjong Game Online
    12/24/2020
    Create a top menu using reactstrap.
*/
const TopMenu = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

//   getData(){
//     let data = sessionStorage.getItem('mySessionStorageData');
//     data = JSON.parse(data);
//     console.log(data.firstName);
// };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/home/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                  <Link to="/friend">Friend</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <Link to="/gameroom">Room</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <Link to="/game">Game</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                  <Link to="/profile/">Profile</Link>
              </NavLink>
            </NavItem>
           
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
//Export Menu component
export default TopMenu;

