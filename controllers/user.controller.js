const JWT = require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config();
const User = require("../models/user.Model")
const {comparePassword,hashPassword}=require("./../middleware/auth.middleware")
//regiseter a new user
const registerUser = async (req,res)=>{
try{
const {name,email,password} = req.body;
if(!name||!email||!password){
    return res.send({meassage:"Please provide all details"})
}
//check user whether existing or not
const existingUser = await User.findOne({email})
if(existingUser){
    return res.status(200).send({success:false, message:"User already registerd, please login"});
}
//register password
const hashedPassword=await hashPassword(password);
const user = await new User({
    name,email,password:hashedPassword,
}).save();
res.status(201).send({success:true,
message:"User register Successfully"
,user
})
}catch(err){
    res.status(500).json({error:err.message})
}
}



const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        //validation 
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password",
            });
        }
        //Check user registered or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered",
            });
        }
        //compare passwords and generate token for the authenticated users
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({success:false,
            message:"Invalid Password",
        });
        }
        const token = await JWT.sign({_id:user.id}, process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).send({
            success:true,
            message:"User loggedin successfully",
            user:{
                _id:user.id,
                name:user.name,
                email:user.email,

            },
            token,
        });
    }
    catch(err){
        console.log('Error in Login', err)
        res.status(500).send({
            success:false,
            message:'Error in login',
        })
    }
}

module.exports={registerUser, loginUser}