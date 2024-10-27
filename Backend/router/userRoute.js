const {signupValidation,loginValidation}=require('./../middleWare/authValidation')
const {signup, login , profile , allRecord}=require('./../controller/authController')
const {jwtmiddleware,generateToken}=require('./../jwt')

const express = require("express");
const route = express.Router();

//signup route
route.post("/signup",signupValidation,signup);

//login route
route.post("/login",loginValidation,login)

//profile route
route.get('/profile',jwtmiddleware,profile);

//get all member
route.get('/',allRecord)




module.exports=route;