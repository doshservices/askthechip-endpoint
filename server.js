// core dependencies
const express = require('express')
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const morgan = require('morgan');

// Custom Dependencies
const { logger } = require('./src/utils/logger');
const { PORT } = require('./src/core/config');

//  app init
const app = express()
const server = http.createServer(app);
const io = new Server(server);

// milddleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(morgan('tiny'));


// middlewares
const user = require('./src/router/userRouter')
const post = require('./src/router/postRoute')
const comment = require('./src/router/commentRoute');
const { flutterResponse } = require('./src/integrations/flutterwave');
const mentorshipModel = require('./src/models/mentorshipModel');
const { BOOKING_STATUS } = require('./src/utils/constants');

app.use('/api/', user)
app.use('/api/', comment)
app.get('/flutterResponse', flutterResponse)
app.get("/api/mentor/comfirm", async (req,res) => {
    const {uniqueId} = req.query
    const mentorShip = await mentorshipModel.findOne({uniqueId})
    if (mentorShip) {
        await mentorshipModel.updateOne({uniqueId}, {status: BOOKING_STATUS.CONFIRMED})
        res.send({status: "Successful", msg: "Request Comfirmed"})
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


  let users = []


//   add user function
  const addUser = (userId, socketId)=> {
    !users.some(user => user.userId === userId) && users.push({userId, socketId})
  }

//   remove user function
const removeUser = ( socketId)=> {
    users.filter(user => user.socketId !== socketId) 
  }

  //   get user function
const getUser = ( userId)=> {
    users.find(user => user.userId === userId) 
  }

 io.on("connection", socket => {
    console.log('a user connected');

    // on message
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });

    //   adduser
    socket.on("addUser", userId => {
        addUser(userId,socket.id)
        // get online users
        socket.emit("getOnlineUsers", users)
    })

    // send and get messages
    socket.on("sendMessage", ({senderId, recieverId, text}) => {
        const user = getUser(recieverId)
        //   private messaging
    io.to(user.socketId).emit("getMessage", {
        senderId,
        text
    });
    })

    // on disconnect
    socket.on('disconnect', () => {
      console.log('user disconnected');
      removeUser(socket.id)
      socket.emit("getOnlineUsers", users)
    });
 })

require('./src/db/mongoose').db().then(()=> server.listen(PORT, () =>
logger.info(`Booking Backend Service Started on port ${PORT}`)
));