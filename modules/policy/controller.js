const { MongoClient } = require('mongodb');
const moment = require('moment');

const {
    MONGODBURL
} = require("../../config/config.json")

//all the business logic implemented here
exports.addPolicy = async (req, res) => {
    const {
        customer_id,
        policy_name,
        nominee
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('policy');
    let userdata = {
        customer_id: customer_id,
        policy_name: policy_name,
        dateOfIssue: moment().format('MMMM Do YYYY, h:mm:ss a'),
        nominee: nominee,
        createAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        modifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    let result = await collection.insertOne(userdata);
    res.status(200).send({
        Return_Status: 10000,
        Return_message: "Policy Details Added Successfully",
        _id: result.insertedId.toString()
    })


}

exports.deletePolicy = async (req, res) => {
    const {
        customer_id
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('policy');
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
            Return_message: "User Policy removed Successfully"
        })
    }
}

exports.UpdatePolicy = async (req, res) => {
    const {
        customer_id,
        policy_name,
        nominee
    } = req.body;
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('policy');
    let location = {
        customer_id: customer_id,
    }
    let userdata = {
        $set: {
            customer_id: customer_id,
            policy_name: policy_name,
            nominee: nominee,
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
            Return_message: "User Policy Updated Successfully"
        })
    }
}

exports.allPolicy = async (req, res) => {
    const { id } = req.params
    const client = new MongoClient(MONGODBURL);
    const dbName = 'test';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('policy');
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