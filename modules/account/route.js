const express = require("express")
const router = express.Router();
const {
    addAccount,
    deleteAccount,
    UpdateAccount,
    allAccount
} = require("./controller")



router.post("/add", addAccount)
router.delete("/delete", deleteAccount)
router.put("/update", UpdateAccount)
router.get("/getAll/:id", allAccount)


module.exports = router;