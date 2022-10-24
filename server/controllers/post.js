const Post=require("../models/Post")
const User=require("../models/User")

const createPost=async(req,res,next)=>{
    const userId=req.body.userId
    const id= req.params.id
    if(userId === id ){
        try{
         const post= new Post(req.body)
         const savedPost= await post.save()
    
         try{
            await User.findByIdAndUpdate(userId,{
                $push:{posts:savedPost._id}
            })
           
         }
         catch(err){
            next(err)
         }
         res.status(201).json(savedPost)
    
        }
        catch(err){
            next(err)
        }
    }
    else{
        return res.status(403).json("You cannot post to someone else")
    }
}

const deletePost=async(req,res,next)=>{
    try{
        await Post.findByIdAndDelete(req.params.postId)
        try{
            await User.findByIdAndUpdate(req.params.userId,{$pull:{posts:req.params.postId}},{new:true})
        }
        catch(err){
            next(err)
        }
        res.status(200).json("Post deleted")

    }
    catch(err){
        next(err)
    }
}
const likePost=async(req,res,next)=>{
    try{
        const post= await Post.findById(req.params.id)
        const user = await User.findById(req.body.userId)
        if(post.userId !== req.body.userId){

            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push:{likes:req.body.userId}})
                res.status(200).json(`${user.username} liked post`)
            }
            else{
                try{
                    await post.updateOne({$pull:{likes:req.body.userId}})
                    res.status(200).json(`${user.username} disliked post`)
                }
                catch(err){
                    next(err)
                }
            }
        }
        else{
            try{
                if(!post.likes.includes(req.body.userId)){
                    await post.updateOne({$push:{likes:req.body.userId}})
                    res.status(200).json(`${user.username} liked their own post`)
                }
                else{
                    await post.updateOne({$pull:{likes:req.body.userId}})
                    res.status(200).json(`${user.username} disliked their own post`)
                }
            }
            catch(err){
                next(err)
            }
        }
    }
    catch(err){
        next(err)
    }
    
}

const countLikes=async(req,res,next)=>{
    try{
        const post= await Post.findById(req.params.id)
        const likes = post.likes.length
        res.status(200).json(`${post.desc} has ${likes} likes`)

    }catch(err){
        next(err)
    }
}

const updatePost=async(req,res,next)=>{
    const post= await Post.findById(req.params.id)
    try{
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body},{new:true})
            res.status(200).json(post)
        }
        else{
            return res.status(403).json("You can only update your post")
        }

    }
    catch(err){
        next(err)
    }
    
}

const getPosts=async(req,res,next)=>{
    try{
        const posts= await Post.find()
        res.status(200).json(posts)
    }
    catch(err){
        next(err)
    }
}
const getPost=async(req,res,next)=>{
    try{
        const post= await Post.findById(req.params.id)
        res.status(200).json(post)

    }
    catch(err){
        next(err)
    }
}
// timeline posts

const timelinePost=async(req,res,next)=>{
    try{
        const currentUser= await User.findById(req.body.userId)
        const friend= await Promise.all(currentUser.followings.map(friend=>{
            return User.findById({_id:friend})
        }))
        // const friendPosts= await Promise.all(friend.posts && friend.posts.map(post=>{
        //     return Post.findById(post)
        // }))

        const userPosts=  await Promise.all(currentUser.posts.map(postId=>{
            return Post.findById(postId)
        }))

        const friendsPosts= await Promise.all(currentUser.followings.map(friend=>{
            return Promise.all(friend.posts?.map(friendId=>{
                return Post.findById({_id:friendId})
            }))
        }))
        res.status(200).json(friendsPosts)

    }
    catch(err){
        next(err)
    }
}

const getPostByUser= async(req,res,next)=>{
    try{
        const user= await User.findById(req.params.id)
        const posts= await Promise.all(user.posts.map(post=>{
            return Post.findById({_id:post})
        }))
        res.status(200).json(posts)

    }
    catch(err){
        next(err)
    }
}

module.exports={
    createPost,getPosts,deletePost,likePost,updatePost,likePost,timelinePost,getPost,getPostByUser,countLikes
}