const ReplyComment= require("../models/ReplyComment")
const User = require("../models/User")
const Comment= require("../models/comment")

const getReplies= async(req,res,next)=>{
    try{
        const replies= await ReplyComment.find()
        res.status(200).json(replies)
    }
    catch(err){
        next(err)
    }
}
const createReply= async(req,res,next)=>{
    try{
        const newReply= new ReplyComment(req.body)
        const savedReply= await newReply.save()
        const userReply= await User.findById(req.params.userId)
        if(req.body.userId !== req.params.userId){

            try{
                await Comment.findByIdAndUpdate(req.params.id,{$push:{replies:savedReply._id}},{new:true})
                return res.status(201).json(`${userReply.username} replied to your comment`)
            }
            catch(err){
                next(err)
            }
            res.status(201).json(savedReply)
        }
        else{
            try{
                await Comment.findByIdAndUpdate(req.params.id,{$push:{replies:savedReply._id}})
                return res.status(200).json("You replied to your own comment")
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
const countRepliesByComment=async(req,res,next)=>{
    try{
        const comment= await Comment.findById(req.params.id)
        const replies= comment.replies.length

        res.status(200).json({
            count:`${comment.text} has ${replies} replies`
        })

    }
    catch(err){
        next(err)
    }
}

const repliesByComment=async(req,res,next)=>{
    try{
        const comment= await Comment.findById(req.params.id)
        const replies= await Promise.all(comment.replies.map(reply=>{
            return ReplyComment.findById({_id:reply})
        }))
        res.status(200).json(replies)

    }
    catch(err){
        next(err)
    }
}

const deleteReply= async(req,res,next)=>{
    try{
        await ReplyComment.findByIdAndDelete(req.params.replyId)
        try{
            await Comment.findByIdAndUpdate(req.params.commentId,{$pull:{replies:req.params.replyId}},{new:true})

        }
        catch(err){
            next(err)
        }
        res.status(200).json("Succesfully deleted the reply")

    }
    catch(err){
        next(err)
    }
}

const getReply= async(req,res,next)=>{
    try{
        const reply = await ReplyComment.findById(req.params.id)
        res.status(200).json(reply)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    getReplies,getReply,deleteReply,createReply,repliesByComment,countRepliesByComment
}