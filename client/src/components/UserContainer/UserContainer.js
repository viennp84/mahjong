import React from 'react';

import onlineIcon from './onlineIcon.png';

import './UserContainer.css';
const UserContainer = ({ users }) => (
  <div>
      <div className="txtContainer">
        {
          users
            ? (
              <div>
                <div className="activeContainer">
                  <h2>
                    {users.map(item => (
                      <div key={item.id} className="activeItem">
                        <img alt="Online Icon" src={onlineIcon}/>
                        {item.name}
                        {item.diceValue ? '   Your rolled dice result is ' + item.diceValue:''}
                        {item.isDealer ? ' => Dealer':''}
                      </div>
                    ))}

                  </h2>
                </div>
              </div>
            )
            : null
        }
      </div>
     
  </div>
);

export default UserContainer;