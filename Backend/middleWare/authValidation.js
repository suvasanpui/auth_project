
const joi=require('joi');

//signup validation using joi npm package
const signupValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        contact:joi.string().required(),
        password:joi.string().min(5).max(20).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

//login validation
const loginValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(5).max(20).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}


module.exports={signupValidation,loginValidation};