const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const {addUser, removeUser, getUser, getUsersInRoom, updateUsers, assignDealer} = require('./users');
const { random } = require('@supercharge/strings/dist');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
io.on('connection',(socket)=>{
    console.log('We have a new connection!!!');
    socket.on('join',({name, room}, callback) =>{
        //Set the user in to the user list
        const {error, user } = addUser({id: socket.id, name, room });
        //socket.join(user.room);
        socket.join('nguyen');
        //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        io.to('nguyen').emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();

    });

    socket.on('rolldice',({name, room})=>{
        console.log('Roll dice');
        const diceRolledValue = Math.floor(Math.random() * 16) + 3;
        updateUsers(socket.id, diceRolledValue);
        const user = getUser(socket.id);
        console.log(socket.id);
        // console.log(user);
       // if(getUsersInRoom(user.room).lenght === 4){
            assignDealer(getUsersInRoom(user.room));
        console.log(getUsersInRoom(user.room));
       // }
        io.to('nguyen').emit("showrolldice", {room: user.room, users: getUsersInRoom(user.room)});

    });

    socket.on('loadMahjongSet',()=>{
        io.to('nguyen').emit("showMahjongSet");
    });
    socket.on('tilemove',({tileid, tileX, tileY, tileOnUser})=>{
        console.log(tileid);
        io.to('nguyen').emit("movingtile",{tileid, tileX, tileY, tileOnUser});
    });

    // socket.on('assignDealer',({users})=>{
    //     console.log('assignDealer');
    // });

    socket.on('disconnect',()=>{
        console.log('User had left!!!');
        const user = removeUser(socket.id);
        if(user) {
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })

    
});
server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));