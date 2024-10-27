const express = require("express");
const app = express();
require('dotenv').config();
const cors=require("cors");

//import port from env
const PORT=process.env.PORT || 3000

//import db connection
const db = require("./db");

//body parser store in req.body---this is most important parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//we know that react run on 3000 port but here node run on 8000 port so this are manage cors npm package
app.use(cors());


//default route
app.get("/",function (req, res) {
    res.send("welcome to our Home page");
});


//import router file
const userRoute = require("./router/userRoute");


//use the router
app.use("/auth",userRoute);



//listening port
app.listen(PORT, () => {
    console.log("Server Connected");
});