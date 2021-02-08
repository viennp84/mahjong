//Import database package
const mysql = require('mysql');
//Configurate for database connection
const db = mysql.createConnection({
    user:'jmatgpup260fcqm7',
    host: 'phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    password:'hkll6pdswwrox591',
    database:'tehqysltlkccm9g6'
});
//Export database service
module.exports = db;