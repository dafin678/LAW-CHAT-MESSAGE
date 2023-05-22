const { getBroadcastMessage} = require("../controllers/broadcastController");
const router = require("express").Router();

router.post("/get/", getBroadcastMessage);

module.exports = router;