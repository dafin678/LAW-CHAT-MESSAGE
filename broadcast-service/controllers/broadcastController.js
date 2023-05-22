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

module.exports.postBroadcastMessage = async (req, res, next) => {
  try {
    const { from, message } = req.body;

    const getAllContact = async () => {
        const response = await axios.get(`http://34.28.228.30/api/contact/${from}`);
        const data = await response.data;
        console.log(data);
        return data.map(item => item.contact_id); 
      };

    const contactList = await getAllContact();
    console.log(contactList);

    contactList.forEach(contact => {
        console.log(contact);
        const handleSendMessage = async (msg,from)=>{
            await axios.post("http://localhost:8888/api/message/addmsg",{
              from: from,
              to: contact,
              message: msg,
            });
        const sendMessage = await handleSendMessage(msg,from);
        console.log(sendMessage);
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
    const data = await broadcast.create({
      message: { text: message },
      receivers: contactList,
      sender: from,
    });

    if (data) return res.json({ msg: "Broadcast successfully." });
    else return res.json({ msg: "Failed to broadcast" });
  } catch (ex) {
    next(ex);
  }
};