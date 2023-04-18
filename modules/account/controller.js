const { MongoClient } = require('mongodb');
const moment = require('moment');

const {
    MONGODBURL
} = require("../../config/config.json")

//all the business logic implemented here
exports.addAccount = async (req, res) => {
    const {
        customer_id,
        address,
        dob,
        gender
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('useraccount');
    let userdata = {
        customer_id: customer_id,
        address: address,
        dob: dob,
        gender: gender,
        createAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        modifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    let result = await collection.insertOne(userdata);
    res.status(200).send({
        Return_Status: 10000,
        Return_message: "Account Details Added Successfully",
        _id: result.insertedId.toString()
    })


}

exports.deleteAccount = async (req, res) => {
    const {
        customer_id
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('useraccount');
    let userdata = {
        customer_id: customer_id
    }
    let result = await collection.deleteMany(userdata);
    if (result.deletedCount == 0) {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "User Not Found"
        })
    } else {
        res.status(200).send({
            Return_Status: 10000,
            Return_message: "User Account removed Successfully"
        })
    }
}

exports.UpdateAccount = async (req, res) => {
    const {
        customer_id,
        address,
        dob,
        gender
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('useraccount');
    let location = {
        customer_id: customer_id,
    }
    let userdata = {
        $set: {
            address: address,
            dob: dob,
            gender: gender,
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
            Return_message: "User Account Updated Successfully"
        })
    }
}

exports.allAccount = async (req, res) => {
    const { id } = req.params
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('useraccount');
    let result = await collection.find({ customer_id: +id }).toArray()
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