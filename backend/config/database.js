const mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user :  'root',
    password: '123456',
    database: 'garment_store',
    port:'3307'
})





