const User=require("../models/User")
const {hash}=require("../utils/passwordHashing")

const getAllUsers=async(req,res,next)=>{
    try{
        const users= await User.find()
        res.status(200).json(users)
    }
    catch(err){
        next(err)
    }
}
const getUser=async(req,res,next)=>{
    try{
        const user= await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}
const deleteUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted successful")
    }
    catch(err){
        next(err)
    }
}
const updateUser=async(req,res,next)=>{
    let {password,userId}=req.body
    try{
        if(userId === req.params.id || req.body.isAdmin){
            if(password){
                password=hash(password)
            }
            const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedUser)

      }
      else{
        return res.status(404).json("you can only update your account")
    }

    }
    catch(err){
        next(err)
    }
}


// follow a user
const following= async(req,res,next)=>{
    try{
        if(req.body.userId !== req.params.id){
            try{
                const user= await User.findById(req.params.id)
                const currentUser= await User.findById(req.body.userId)
                if(!user.followers.includes(currentUser._id)){
                    await user.updateOne({$push:{followers:req.body.userId}})
                    await currentUser.updateOne({$push:{followings:req.params.id}})
                    res.status(200).json({
                        following:`${currentUser.username} is following ${user.username}`
                    })
                    
                }
                else{
                    return res.status(403).json("You are already following the user")
                }
            }
            catch(err){
                next(err)
            }
            
        }
        else{
            return res.status(400).json("you cannot follow yourself")
            
        } 
    }
    catch(err){
        next(err)

    }
}
// unfollow a user

const unfollow=async(req,res,next)=>{
    try{
        if(req.body.userId !== req.params.id){
            const user= await User.findById(req.params.id)
            const currentUser= await User.findById(req.body.userId)
            if(currentUser.followings.includes(user._id)){
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                await user.updateOne({$pull:{followers:req.body.userId}})
                return res.status(200).json({
                    unfollowing:`${currentUser.username} unfollowed ${user.username}`
                })
            }
            else{
                return res.status(403).json("You cannot unfollow someone you dont folow")
            }
        }
        else{
            return res.status(403).json("You cannot unfollow yourself")
        }
    }
    catch(err){
        next(err)
    }
}



module.exports={
    getAllUsers,getUser,deleteUser,updateUser,following,unfollow
}