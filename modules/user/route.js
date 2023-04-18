const express = require("express")
const router = express.Router();
const {
    addUsers,
    deleteUsers,
    UpdateUsers,
    allUsers
} = require("./controller")



router.post("/add", addUsers)
router.delete("/delete", deleteUsers)
router.put("/update", UpdateUsers)
router.get("/getAll", allUsers)


module.exports = router;