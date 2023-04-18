const jwt = require('jsonwebtoken')
const{ JWT_SECRET_KEY} =require("../../config/config.json")

exports.login = async (req, res) => {
    let {username,dob}=req.body;
    let token= jwt.sign({
        data: {username,dob}
      }, JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({
        Return_Status: 1000,
        Return_message:{
            Token:token,
            expiresIn:"1 Hour"
        }
    })
}
