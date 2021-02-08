/*
Vien Nguyen
CST-452 Senior Project II
January 7th/2020
Activation class. 
*/
class Activation{
    constructor(id, userId, activationCode, email){
        this.id = id;
        this.userId = userId;
        this.activationCode = activationCode;
        this.email = email;
    }
}
module.exports = Activation;