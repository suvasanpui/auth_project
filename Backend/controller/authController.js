const { jwtmiddleware, generateToken } = require("./../jwt");


//import person model
const User = require("../models/User");

//signup function to store in a db collection
const signup = async (req, res) => {
  
    try {
      const {name,email,contact,password} = req.body;
      const user=await User.findOne({email:email});
      if(user){
        return res.status.json({error:"user already exist"});
      }
      const newPerson = new User({name,email,contact,password});
      const response = await newPerson.save();
      console.log("Data insert successfully");
  
      //create payload for generate token
      const jwtPayload={
        id:response.id,
        email:response.email
      }
      console.log(JSON.stringify(jwtPayload))
      //parameter pass to generate token function 
      const token=generateToken(jwtPayload);
      console.log("token",token);
  
      res.status(200).json({response: response,token:token});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
};

//login function to store a db collection
const login = async (req, res) => {
  try {
    //extrct username and password fom request body
    const { email, password } = req.body;
    //check username in person database
    const user = await User.findOne({ email: email });
    if(!user){
      return res.status(403).json({message:"user not exist"})
    }
    if (!user || !(await user.comparePassword(password))) {
      //comparePassword is a function that match user with a password
      return res.status(401).json({ error: "invalid email and password" });
    }

    //generate token
    const userPayload = {
      id: user.id,
      email: user.email,
    };
    //token generate
    const token = generateToken(userPayload);
    //return response
    res.status(200).json({message:"login successfully", response:user,token:token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};


//specific profile get
const profile=async(req,res)=>{
  try{
  const userData=req.user;
  const userId=userData.id;
  const response=await User.findById(userId)
  res.json(response);
  }catch(err){
    console.error(err);
    res.status(500).json({error:"user not found"})
  }
}

//get all member
const allRecord=async(req,res)=>{
  try{
    const allRecord=await User.find();
    const response=allRecord.map((data)=>{
      return{
        name:data.name,
        email:data.email
      }
    })
    return res.status(200).json({response})
  }catch(err){
    console.log(err);
    return res.status(500).json({error:"internal server error"});
  }
}

module.exports = { signup, login ,profile,allRecord};
