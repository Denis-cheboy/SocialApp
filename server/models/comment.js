const mongoose=require("mongoose")

const CommentSchema= new mongoose.Schema({
    userId:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
        
    },
    text:{
        type:String,
        required:true
    },
    replies:{
        type:Array,
        default:[]
    }

},{timestamps:true})


module.exports=mongoose.model("Comment",CommentSchema)