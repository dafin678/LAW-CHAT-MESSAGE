const broadcast = require("../models/broadcastModel");
const axios = require('axios');

module.exports.getBroadcastMessage = async (req, res, next) => {
  try {
    const { from, message } = req.body;

    const getAllContact = async () => {
        const response = await axios.get(`http://34.28.228.30/api/contact/fauzan123`);
        const data = await response.data;
        console.log(data);
        return data.map(item => item.contact_id); 
      };

    const contactList = await getAllContact();
    console.log(contactList);

    contactList.forEach(contact => {
        console.log(contact);
        console.log(from);
        const handleSendMessage = async ()=>{
          const sendMessage = async () => {
            const response = await axios.post(`http://localhost:8888/api/message/addmsg`,{
            from: from,
            to: contact,
            message: message,
            });
            const data = await response.data;
          };

        const send = await sendMessage();
        };
      const msg = handleSendMessage();
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