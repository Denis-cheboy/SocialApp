const jwt=require("jsonwebtoken")
require("dotenv").config()

const verifyToken=(req,res,next)=>{
    try{
        const token= req.cookies("auth-token")
        if(!token) res.status(401).json("Not Authorised No Access")
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,token)=>{
            if(err) res.status(403).json("Invalid Token")
            req.user=token.userId
            next()
        })
    }
    catch(err){
        next(err)
    }

}

module.exports=verifyToken