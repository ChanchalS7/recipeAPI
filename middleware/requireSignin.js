const JWT = require("jsonwebtoken")
//protect routes
const requireSignIn = async (req,res,next)=>{
    try{
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user=decode;
        next();

    }
    catch(err){
        console.log(err)
    }
}
module.exports=requireSignIn;