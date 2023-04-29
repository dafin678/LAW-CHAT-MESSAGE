
const {
    login,
    register,
    setAvatar,
  } = require("../controllers/usersController");
  
  const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.post("/setAvatar/:id", setAvatar)
  
  module.exports = router;