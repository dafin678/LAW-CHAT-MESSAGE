const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user_username: String,
    contact_username: String,
});

module.exports = mongoose.model("Contacts", contactSchema);