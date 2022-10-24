const User=require("../models/User")
const Post=require("../models/Post")
const Notification=require("../models/Notification")
const postNotification=async(req,res,next)=>{
    try{
        const user= await User.findById(req.params.userId)
        const post= await Post.findById(req.params.postId)

        const notification= new Notification(req.body)
        const savedNotification= await notification.save()

        if(req.body.userId !== req.params.userId){

                const notifyFollowers= await Promise.all(user.followers.map(follower=>{
                    const user= User.findById({_id:follower})
                    if(!user.notifications.includes(savedNotification._id)){
                        user.updateOne({$push:{notifications:savedNotification._id}},{new:true})
                        return user
                    }
                }))
                const allUsers= await Promise.all(notifyFollowers.map(follower=>{
                    return follower.username
                }))

               
                return res.status(200).json(`${allUsers} got notified by ${user.username} about their post ${post.desc}`)

        }
        else{
            await user.updateOne({$push:{notifications:savedNotification._id}})
            
            const notifyFollowers= await Promise.all(user.followers.map(follower=>{
                const user=  User.findById(follower)
                !user.notifications.includes(savedNotification._id) && user.updateOne({$push:{notifications:savedNotification._id}},{new:true})
                return user
            }))
            const allUsers= await Promise.all(notifyFollowers.map(follower=>{
                return follower.username
            }))

            return res.status(200).json(`${user.username} notiifed about their own post and ${allUsers} notified about  ${user.username} post`)
        }
        // return res.status(200).json(savedNotification)

    }
    catch(err){
        next(err)
    }
}

const userNotifications=async(req,res,next)=>{
    try{
        const notification= new  Notification(req.body)
        const savedNotification= await notification.save()
        const currentUser= await User.findById(req.body.userId)
        if(req.body.userId !== req.params.userId){
            if(currentUser.followers.includes(req.params.id)){
                await User.findByIdAndUpdate(req.params.id,{$push:{notifications:savedNotification._id}},{new:true})
                return res.status(200).json(savedNotification.message)
            }
            else{
                return res.status(200).json("You can only be notified if you follow this person")
            }

        }

    }
    catch(err){
        next(err)
    }
}

const commentNotifications=async(req,res,next)=>{
    try{
        const notification= new  Notification(req.body)
        const savedNotification= await notification.save()
        const currentUser= await User.findById(req.body.userId)
        const post= await Post.findById(req.params.postId)
        if(req.params.userId !== req.body.userId){
            await User.findByIdAndUpdate(req.params.userId,{$push:{notifications:savedNotification._id}})
            return res.status(200).json(`${currentUser.username} commented on post ${post.desc}`)
        }
        else{

        }

    }
    catch(err){
        next(err)
    }
}

module.exports={
    postNotification,userNotifications,commentNotifications
}