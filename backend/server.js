require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
http = require('http')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500
const { Server } = require('socket.io'); // Add this


const server = http.createServer(app);


connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use(express.static(path.join(__dirname,'./public')))


app.use('/register', require('./routes/registerRoutes'));

app.use('/login', require('./routes/authRoutes'));

app.use('/user', require('./routes/userRoutes'));

app.use('/mySubGreddiiit', require('./routes/mySubGreddiiitRoutes'));

app.use('/allSubGreddiiit', require('./routes/allSubGreddiiitRoutes'));

app.use('/follo', require('./routes/folloRoutes'));

app.use('/chat', require('./routes/chatRoutes'));


app.use('/SubGreddiiitPage', require('./routes/SubGreddiiitPageRoutes'));



app.use(express.urlencoded({extended:false}));



const io = new Server(server, {
    cors: {
      origin: '*'
    },
  });
let users = [];

const addUser = (userName, socketId) => {
  (userName !== '' && !users.some((user) => user.userName === userName)) &&
    users.push({ userName, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userName) => {
  return users.find((user) => user.userName === userName);
};
  
  // Add this
  // Listen for when the client connects via socket.io-client
  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // We can write our socket event listeners in here...
    socket.on("addUser", (userName) => {
        addUser(userName, socket.id);
        io.emit("getUsers", users);
    });
    
    //send and get message
    socket.on("sendMessage", ({ senderName, receiverName, text, creation_time }) => {
    const user = getUser(receiverName);
    if(user){
        io.to(user.socketId).emit("getMessage", {
            senderName,
            text,
            creation_time
        });
    }
    });

    //when disconnect
    socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
    });
  });

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

// mongoose.connection.on('error', err => {
//     console.log(err)
//     logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
// })