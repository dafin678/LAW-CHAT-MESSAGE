const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user: { type: String, required: true },
    contact: { type: String, required: true },
    contact_id: { type: Number, required: true }
});

module.exports = mongoose.model("Contacts", contactSchema);