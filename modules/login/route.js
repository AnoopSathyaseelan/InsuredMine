const express = require("express")
const router = express.Router();
const {login}=require("./controller")
//all the routes and middleware defined here
router.post("/login", login)

module.exports = router;