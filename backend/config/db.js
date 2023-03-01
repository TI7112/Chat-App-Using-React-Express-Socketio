const mysqli = require('mysql2');

const connection = mysqli.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'chatapp'
})

module.exports = connection;