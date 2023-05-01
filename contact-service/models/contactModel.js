const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user_username: String,
    contact_username: String,
    contact_email: String,
    contact_avatar: String
});

module.exports = mongoose.model("Contacts", contactSchema);