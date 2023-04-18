const jwt=require("jsonwebtoken")
const config=require("../config/config.json")

exports.authenticateToken =(req, res, next) => {
    const authHeader = req.headers.authorization||req.headers.authorization?.startsWith('Bearer')
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token,config.JWT_SECRET_KEY , (err, user) => {
      if (err) {return res.status(403).send({
        Message:"Error in Validation"
      })
      }
      next();
    })
  }
