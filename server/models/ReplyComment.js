const mongoose= require("mongoose")

const ReplySchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports= mongoose.model("Reply",ReplySchema)