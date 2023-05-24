const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');



const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/message", messageRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`DB connection Succesfull`);
}).catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () =>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});


const io = socket(server, {
    cors: {
        origin: "https://cheerful-malasada-35b7b7.netlify.app",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket) =>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});
