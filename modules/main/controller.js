const {
    sendemail
} = require("../../middlewares/emailmiddleware")
const {
    EMAIL_ID
}=require("../../config/config.json")

//all the business logic implemented here
exports.test = async (req, res) => {
    res.status(200).send({
        Return_Status: 1000,
        Return_message: "all good"
    })
}

exports.testemail = async (req, res) => {
    const htmloption={
        from: EMAIL_ID,
        to: 'anoopsathyaseelan@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    }
    await sendemail(htmloption)
    res.status(200).send({
        Return_Status: 1000,
        Return_message: "all good"
    })
}