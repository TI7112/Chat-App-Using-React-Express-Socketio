const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const cors = require('cors');
const connection = require('./config/db');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const users = [];

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
}))



//route 

// app.get('/chatpage', (req, res) => {
//     res.json()
// })

// app.get('/chats/:userEmail', async(req, res) => {
//     const sqlQuery = `SELECT * FROM chats WHERE user2 = '${req.params.email}'`
//     const [chatResult, feild] = await connection.promise().execute(sqlQuery)
//     if (chatResult == null) {
//         res.send({ error: "Invlid Email and password " })
//     }
//     res.send(chatResult)


// })

app.post('/api/signup', (req, res) => {
    const data = [req.body.name, req.body.username, req.body.email, req.body.pass]
    const sqlQuery = "INSERT INTO user (name , username , email , password) VALUE (?)"
    connection.query(sqlQuery, [data], (err) => {
        if (err) {
            // res.send({ error: err.code });
            if (err.code === "ER_DUP_ENTRY") {
                res.send({ error: `An account already exist with ${req.body.email} email. Please do Login`})
            }
        }
        else {
            res.send({ error: `Your Account has been register sucessfully Mr. ${req.body.name}` });
            
        }
    })
})

app.post('/api/login', async (req, res) => {
    const data = [req.body.email, req.body.pass]
    const sqlQuery = `SELECT * FROM user WHERE email = '${req.body.email}' and password = '${req.body.pass}' `

    const [[userResult], feild] = await connection.promise().execute(sqlQuery)
    if (userResult == null) {
        res.send({ error: "Invalid Email and password " })
    }
    req.session.user = userResult
    res.send(userResult)
})



io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`)
    })

    socket.emit('welcome', { user: 'Admin', msg: 'welcome to the chat' })

    socket.on('send_message', (message) => {
        console.log(message)
        const data = [message.chatID, message.sender, message.msg]
        const sqlQuery = "INSERT INTO msg (chatID , sender , msg) VALUE (?)"
        connection.query(sqlQuery, [data], (err) => {
            if (err) throw err;

        })
    })

    socket.on('fetch_user_chat', async ({ chatID }) => {
        const sqlQuery = `SELECT * FROM msg WHERE chatID = '${chatID}'`
        const [chatResult, feild] = await connection.promise().execute(sqlQuery)
        socket.emit('get_user_chat', chatResult)
    })

})


http.listen(5000, console.log("Express server connected"));