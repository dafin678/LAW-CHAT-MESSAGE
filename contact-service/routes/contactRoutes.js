const {addContact, deleteContact, getContactList} = require("../controllers/contactControllers");

const router = require("express").Router();

router.post("/:username", addContact);
router.delete("/:username", deleteContact);
router.get("/:username", getContactList);

module.exports = router;