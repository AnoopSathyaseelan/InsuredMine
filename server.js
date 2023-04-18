let http = require("http");
const express= require("express")
const app=express()
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs= require("fs")
const path= require("path")
const moment=require("moment")
const config=require("./config/config.json")
const rateLimit = require('express-rate-limit')
const helmet = require("helmet");

//Config Setups
const PORT=process.env.PORT||config.PORT;
const Environment=process.env.NODE_ENV||config.ENVIROMENT

//Route Imports
const test=require('./modules/main/route')
const login=require('./modules/login/route');
const { request } = require("https");
const { response } = require("express");

//logger
app.use(bodyParser.json())

if(fs.existsSync(path.join(__dirname,`/logs`))){
    console.log(`Log are Created at ${path.join(__dirname,`/logs`)}`);
}else{
    fs.mkdir(path.join(__dirname,`/logs`),(err)=>{
        if(err){
            console.log(err);
        }
        console.log("Logs Directory Created");
    })
}

const log = fs.createWriteStream(
    path.join(__dirname, "logs", `logs_${moment(Date.now()).format("DD_MM_YYYY")}.log`), { flags: "a" }
  );
  
  morganBody(app, {
    // .. other settings
    noColors: true,
    stream: log,
    logAllReqHeader:true,
    logIP:true,
  });

//Rate limiter
const limiter = rateLimit({
	windowMs: 60* 60 * 1000, // 15 minutes
	max: 1500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: true, // Disable the `X-RateLimit-*` headers
    keyGenerator:(request,response)=>request.ip,
    handler:(request,response,next,options)=>{
        response.status(429).send({
            Return_status:-1000,
            Return_message:"To many Requests from this ip, please try again in a hour"
        })
    }
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(helmet());
app.use(express.urlencoded({extended:true}));

//Routes for all the different modules 
app.use("/test",test);
app.use("/User",login);

//server Port
app.listen(PORT,()=>{
    console.log("Current Enviroment "+Environment);
    console.log("Now listening to port "+PORT);
})