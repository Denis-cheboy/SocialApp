const Comment=require("../models/comment")
const User= require("../models/User")
const Post=require("../models/Post")

const createComment=async(req,res,next)=>{
    const postId= req.params.postId
    try{
        const comment= new Comment(req.body)
        const savedComment= await comment.save()
        try{
            await Post.findByIdAndUpdate({_id:postId},{$push:{comments:savedComment._id}},{new:true})
        }
        catch(err){
            next(err)
        }
        res.json(savedComment)
        
    }
    catch(err){
        next(err)
    }
  
}
const getComments= async(req,res,next)=>{
    try{
        const comments= await Comment.find()
        res.status(200).json(comments)

    }
    catch(err){
        next(err)
    }
}
const getComment=async(req,res,next)=>{
    try{
        const comment= await Comment.findById(req.params.id)
        res.status(200).json(comment)

    }
    catch(err){
        next(err)
    }
}

const deleteComment= async(req,res,next)=>{
    try{

        await Comment.findByIdAndDelete(req.params.commentId)
        try{
            await Post.findByIdAndUpdate({_id:req.params.postId},{$pull:{ comments:req.params.commentId}},{new:true})

        }
        catch(err){
            next(err)
        }
        res.status(200).json("Comment deleted successful")

    }
    catch(err){
        next(err)
    }
}

const commentsByPost=async(req,res,next)=>{
    try{
        const post =await Post.findById(req.params.id)
        const commentsPost= await Promise.all(post.comments.map(comment=>{
            return Comment.findById({_id:comment})
        }))
        res.status(200).json(commentsPost)
    }
    catch(err){
        next(err)
    }
}


const countCommentsByPost=async(req,res,next)=>{
    try{
        const post = await Post.findById(req.params.id)
        const comments= post.comments.length
        res.status(200).json({
            totalCounts:`this post has ${comments} comments`
        })
    }
    catch(err){
        next(err)
    }
}

// const replyComment=async(req,res,next)=>{
//     try{
//         const user= await User.findById(req.params.userId)
//         const comment= await Comment.findById(req.params.id)
//         if(req.body.userId !== req.params.userId){
//             await comment.updateOne({$push:{replies:req.params.userId}})
//             return res.status(200).json(`${user.username} has replied to your comment`)
//         }
//         else{
//             return res.status("You replied your own comment")
//         }
//     }
//     catch(err){
//         next(err)
//     }
// }

const likeComment=async(req,res,next)=>{
    try{
        const comment= await Comment.findById(req.params.id)
        const userLiking = await User.findById(req.params.userId)
        if(req.params.userId !== req.body.userId){
            if(!comment.likes.includes(req.params.userId)){
                await comment.updateOne({$push:{likes:req.params.userId}})
                res.status(200).json(`${userLiking.username} liked your comment`)
            }
            else{
                try{
                    await comment.updateOne({$pull:{likes:req.params.userId}})
                    res.status(200).json(`${userLiking.username} disliked your comment`)
                }
                catch(err){
                    next(err)
                }
            }

        }
        else{
            try{
                if(!comment.likes.includes(req.params.userId)){
                    await comment.updateOne({$push:{likes:req.params.userId}})
                    res.status(200).json("You liked your own comment")
                }
                else{
                    await comment.updateOne({$pull:{likes:req.params.userId}})
                    res.status(200).json("You disliked your comment")
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

module.exports={
    createComment,getComments,deleteComment,getComment,commentsByPost,likeComment,countCommentsByPost,
}