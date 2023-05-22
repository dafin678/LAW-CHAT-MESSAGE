const Contact = require("../models/contactModel");

module.exports.addContact = async (req, res, next) => {
    try {
        // #swagger.tags = ['Contact']
        // #swagger.description = 'Endpoint for adding contact to user'
        // #swagger.parameters['user'] = { description: 'Field that represents user (id, username, etc)' }

        /* #swagger.parameters['contact'] = {
           in: 'body',
               description: 'Field that represents contact (id, username, etc)',
               type: 'string'
        } */
        const user = req.params.user;
        const user_id = req.body.user_id;
        const contact = req.body.contact;
        const contact_id = req.body.contact_id;
        const contactCheck = await Contact.findOne({
            user: user,
            contact: contact,
            contact_id: contact_id
        })
        /* #swagger.responses[409] = {
               schema: { $ref: "#/definitions/Message" },
               description: 'Contact already exists' 
        } */
        if (contactCheck) {
            return res.status(409).json({ message: "Contact already exists"});
        }
        const usercontact = await Contact.create({
            user: user,
            contact: contact,
            contact_id: contact_id
        })
        /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/Contact" },
               description: 'Contact created' 
        } */
        const usercontact2 = await Contact.create({
            user: contact,
            contact: user,
            contact_id: user_id
        })
        return res.status(200).json(usercontact);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteContact = async (req, res, next) => {
    // #swagger.tags = ['Contact']
        // #swagger.description = 'Endpoint for deleting contact of user'
        // #swagger.parameters['user'] = { description: 'Field that represents user (id, username, etc)' }

    /* #swagger.parameters['contact'] = {
       in: 'body',
           description: 'Field that represents contact (id, username, etc)',
           type: 'string'
    } */
    try {
        const user = req.params.user;
        const contact = req.body.contact;
        const contactCheck = await Contact.findOneAndDelete({
            user: user,
            contact: contact
        })
        /* #swagger.responses[404] = {
               schema: { $ref: "#/definitions/Message" },
               description: 'Contact doesnt exist' 
        } */
        if (!contactCheck) {
            return res.status(404).json({ message: "Contact doesnt exist" });
        }
        /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/Contact" },
               description: 'Contact deleted' 
        } */
        return res.status(200).json(contactCheck);
    } catch (error) {
        next(error)
    }
}

module.exports.getContactList = async (req, res, next) => {
    // #swagger.tags = ['Contact']
        // #swagger.description = 'Endpoint for getting contact list of user'
        // #swagger.parameters['user'] = { description: 'Field that represents user (id, username, etc)' }
    try {
        const user = req.params.user;
        const contactList = await Contact.find({
            user: user,
        }, { _id: 0, __v:0 });
        /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/ContactList" },
               description: 'Contact deleted' 
        } */
        return res.status(200).json(contactList);
    } catch (error) {
        next(error)
    }
}

