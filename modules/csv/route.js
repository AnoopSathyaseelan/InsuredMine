const express = require("express")
const router = express.Router();
const { saveFilesINtoMongoDB } = require("./controller")
const { upload } = require("../../middlewares/multermiddleware")


router.post("/readCSV", upload.single('csvFile'), saveFilesINtoMongoDB)

module.exports = router;