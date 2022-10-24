const mongoose=require("mongoose")

const NotificationSchema= new mongoose.Schema({
    userId:{
        type:String,  
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports= mongoose.model("notification",NotificationSchema)