/*
Vien Nguyen
CST-452 Senior Project II
January 7th/2020
Room class. 
*/
class Room{
    constructor(id, userId, roomName, roomCode){
        this.id = id;
        this.userId = userId;
        this.roomName = roomName;
        this.roomCode = roomCode;
    }
}
module.exports = Room;