const Contact = require("../models/contactModel");

module.exports.addContact = async (req, res, next) => {
    try {
        const username = req.params.username;
        const contactUsername = req.body.contact_username;
        const contactCheck = await Contact.findOne({
            user_username: username,
            contact_username: contactUsername
        })
        if (contactCheck) {
            return res.json({ msg: "Contact already exists", status: false });
        }
        const contact = await Contact.create({
            user_username: username,
            contact_username: contactUsername
        })
        return res.json({ status: true, contact });
    } catch (error) {
        next(error)
    }
}

module.exports.deleteContact = async (req, res, next) => {
    try {
        const username = req.params.username;
        const contactUsername = req.body.contact_username;
        const contactCheck = await Contact.findOneAndDelete({
            user_username: username,
            contact_username: contactUsername
        })
        if (!contactCheck) {
            return res.json({ msg: "Contact doesnt exist", status: false });
        }
        return res.json({ status: true, contactCheck });
    } catch (error) {
        next(error)
    }
}

module.exports.getContactList = async (req, res, next) => {
    try {
        const username = req.params.username;
        const userCheck = await Contact.findOne({
            user_username: username,
        })
        if (!userCheck) {
            return res.json({ msg: "User not found", status: false });
        }
        const contactList = await Contact.find({
            user_username: username
        })
        return res.json({ status: true, contactList });
    } catch (error) {
        next(error)
    }
}

