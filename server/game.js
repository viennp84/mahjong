const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const {addUser, removeUser, getUser, getUsersInRoom } = require('./users')


const app = express();
const server = http.createServer(app);
const io = socketio(server);
io.on('connection',(socket)=>{
    console.log('We have a new connection!!!');
    socket.on('join',({name, room}, callback) =>{
        //Set the user in to the user list
        const {error, user } = addUser({id: socket.id, name, room });
        console.log(name);
        console.log(room);
       socket.join(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();

    });
    socket.on('disconnect',()=>{
        console.log('User had left!!!');
        const user = removeUser(socket.id);
        if(user) {
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});
server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));