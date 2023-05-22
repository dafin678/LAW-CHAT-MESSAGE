const broadcast = require("../models/broadcastModel");
const axios = require('axios');

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getBroadcastMessage = async (req, res, next) => {
  try {

    const getAllContact = async () => {
        const response = await axios.get('http://34.28.228.30/api/contact/aku1');
        const data = await response.data;
        console.log(data);
        return data.map(item => item.contact); 
      };

    const contactList = await getAllContact();
    console.log(contactList);

    contactList.forEach(contact => {
        console.log(contact);

        const handleSendMessage = async (msg,from)=>{
            
            // const { from, message } = req.body;
            // const data = await broadcast.create({
            //     message: { text: message },
            //     users: [from, to],
            //     sender: from,
            // });

            await axios.post("http://localhost:8888/api/message/addmsg",{
              from: currentUser.userid,
              to: currentChat.userid,
              message: msg,
            });
            // socket.current.emit("send-msg",{
            //   from: currentUser.userid,
            //   to: currentChat.userid,
            //   message: msg,
            // });
            // const msgs = [...messages];
            // msgs.push({fromSelf:true,message:msg});
            // setMessages(msgs);
        };
    });


    const { from, to, message } = req.body;
    const data = await broadcast.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};