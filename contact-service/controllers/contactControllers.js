const Contact = require("../models/contactModel");

module.exports.addContact = async (req, res, next) => {
    try {
        const username = req.params.username;
        const contactUsername = req.body.contact_username;
        const contactEmail = req.body.contact_email;
        const contactAvatar = req.body.contact_avatar;
        const contactCheck = await Contact.findOne({
            user_username: username,
            contact_username: contactUsername
        })
        if (contactCheck) {
            return res.json({ msg: "Contact already exists", status: false });
        }
        const contact = await Contact.create({
            user_username: username,
            contact_username: contactUsername,
            contact_email: contactEmail,
            contact_avatar: contactAvatar
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
        const contactList = await Contact.find({
            user_username: username
        }).select([
            "contact_username",
            "contact_email",
            "contact_avatar"
        ]);
        return res.json({ status: true, contactList });
    } catch (error) {
        next(error)
    }
}

