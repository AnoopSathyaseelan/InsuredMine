const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const {
    MONGODBURL
} = require("../../config/config.json")

//all the business logic implemented here
exports.saveFilesINtoMongoDB = async (req, res) => {
    if (req.file == undefined) {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "Uplaod Valid file"
        })
    } else {
        const client = new MongoClient(MONGODBURL);
        const dbName = 'test';
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('userdata');

        // Read CSV file and save data to MongoDB
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', async (data) => {
                await collection.insertOne(data);
            })
            .on('end', () => {
                fs.unlinkSync(req.file.path);
                res.status(200).send({
                    Return_Status: 10000,
                    Return_message: "Data Saved Successfully"
                })
            })
            .on('err', () => {
                res.status(400).send({
                    Return_Status: 10001,
                    Return_message: "Data Read Error"
                })
            });
    }
}

