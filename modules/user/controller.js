const { MongoClient } = require('mongodb');
const moment = require('moment');

const {
    MONGODBURL
} = require("../../config/config.json")

//all the business logic implemented here
exports.addUsers = async (req, res) => {
    const {
        customer_name,
        email,
        password,
        mobileNo
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('user');
    let userdata = {
        customer_name: customer_name,
        customer_id: Math.floor(100000 + Math.random() * 900000),
        email: email,
        password: password,
        mobileNo: mobileNo,
        createAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        modifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    let result = await collection.insertOne(userdata);
    res.status(200).send({
        Return_Status: 10000,
        Return_message: "User Added Successfully",
        _id: result.insertedId.toString()
    })


}

exports.deleteUsers = async (req, res) => {
    const {
        customer_id
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('user');
    let userdata = {
        customer_id: customer_id
    }
    let result = await collection.deleteOne(userdata);
    if (result.deletedCount == 0) {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "User Not Found"
        })
    } else {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "User Removed Successfully"
        })
    }
}

exports.UpdateUsers = async (req, res) => {
    const {
        customer_id,
        email,
        password,
        mobileNo
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('user');
    let location = {
        customer_id: customer_id,
    }
    let userdata = {
        $set: {
            email: email,
            password: password,
            mobileNo: mobileNo,
            modifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
    }
    let result = await collection.updateOne(location, userdata);
    if (result.modifiedCount == 0) {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "Enter Valid Id"
        })
    } else {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "User Updated Successfully"
        })
    }
}

exports.allUsers = async (req, res) => {
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('user');
    let result = await collection.find({}).toArray()
    if (result.length == 0) {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "Data Not Found",
        })
    }
    else {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "Success",
            Result: result
        })
    }


}