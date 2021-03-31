const users = [];

const addUser = ({id, name, room, diceValue, playPosition, isDealer}) =>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return {error: 'User name is taken'};
    }

    const user = {id, name, room, diceValue, playPosition, isDealer};
    users.push(user);
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user)=>user.room === room);

const updateUsers = (id, dc)  => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1){
        users[index].diceValue = dc;
    }
}

const assignDealer = (users) => {
   // users.sort((a, b) => (a.diceValue > b.diceValue) ? 1: -1);
   if(users.length === 4 && users[0].diceValue 
                        && users[1].diceValue 
                        && users[2].diceValue 
                        && users[3].diceValue){
    users.sort((a, b) => (a.diceValue > b.diceValue) ? 1: -1);
        for(var i = 0; i < users.length; i ++){
            console.log(users[i].name);
            users[i].playPosition = i + 1;
            if(i === 3){
                users[i].isDealer = true;
            }else{
                users[i].isDealer = false;
            }
        }
    }   
};

module.exports = {addUser, removeUser, getUser, getUsersInRoom, updateUsers, assignDealer}