const express = require("express")
const router = express.Router();
const {
    test,
    testemail
} = require("./controller")
const {
    authenticateToken
} = require("../../middlewares/authmiddleware")

//all the routes and middleware defined here
router.get("/test", authenticateToken, test)
router.get("/testemail",authenticateToken,testemail)

module.exports = router;