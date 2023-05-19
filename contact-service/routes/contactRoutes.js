const {addContact, deleteContact, getContactList} = require("../controllers/contactControllers");

const router = require("express").Router();

router.post("/api/contact/:user", addContact);
router.delete("/api/contact/:user", deleteContact);
router.get("/api/contact/:user", getContactList);

module.exports = router;