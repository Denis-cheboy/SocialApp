const User= require("../models/User")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const {registerValidation,loginValidation}=require("../utils/inputValidation")
const {hash,comparePasswords}=require("../utils/passwordHashing")

const register=async(req,res,next)=>{
    const {error}=registerValidation(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const {username,email,password}=req.body
    const passwordHashed=hash(password)
    try{
        const existUser= await User.findOne({username:username})
        if(existUser) return res.status(400).json("User already exists")
        const user = new User({
            username:username,
            email:email,
            password:passwordHashed
        })
        const savedUser = await user.save()
        res.status(201).json(savedUser)

    }
    catch(err){
        next(err)
    }
}

const login=async(req,res,next)=>{
    const {error}=loginValidation(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const {email,password}=req.body
    try{
        const user= await User.findOne({email:email})
        if(!user) return res.status(400).json("User does not exists")
        const passwordChecking= await comparePasswords(password,user.password)
        if(!passwordChecking) return res.status(400).json("Wrong password or Username")
        // const accessToken= jwt.sign({userId:user._id,isAdmin:user.isAdmin},process.env.ACCESS_TOKEN)
        // const refreshToken= jwt.sign({userId:user._id,isAdmin:user.isAdmin},process.env.ACCESS_TOKEN)

        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    register,login
}