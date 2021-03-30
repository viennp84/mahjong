import React from 'react';

import onlineIcon from './onlineIcon.png';

import './UserContainer.css';

const UserContainer = ({ users }) => (
  <div className="txtContainer">

    {
      users
        ? (
          <div>
            <h1>Current Players</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default UserContainer;