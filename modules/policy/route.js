const express = require("express")
const router = express.Router();
const {
    addPolicy,
    deletePolicy,
    UpdatePolicy,
    allPolicy
} = require("./controller")



router.post("/add", addPolicy)
router.delete("/delete", deletePolicy)
router.put("/update", UpdatePolicy)
router.get("/getAll/:id", allPolicy)


module.exports = router;