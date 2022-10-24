const jwt=require("jsonwebtoken")
const User=require("../models/User")
require("dotenv").config()

const refreshToken=(req,res,next)=>{
    const cookie=req.cookies
    if(!cookie?.auth-token) res.status(401).json("Access Denied")
    console.log(cookie.jwt)
    const refreshToken= cookie.jwt
    const foundUser= User.find(user=>user._id===refreshToken.userId)
    if(!foundUser)
}