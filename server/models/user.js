/*
Vien Nguyen
CST-452 Senior Project II
January 7th/2020
User class. 
*/
class User{
    //Declare a constructor with properties userId, firstname, lastname, userName, role, lastLogin, isActivated, email, phone
    constructor(userId, firstName, lastName, userName, role, lastLogin, isActivated, email, phone){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.role = role;
        this.lastLogin = lastLogin;
        this.isActivated = isActivated;
        this.email = email;
        this.phone = phone;
    }
}
module.exports = User;