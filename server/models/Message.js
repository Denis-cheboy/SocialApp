const mongoose=require("mongoose")

const MessageSchema= new mongoose.Schema({
    content:{
        type:String
    },
    from:{
        type:Object,
    },
    socketId:{
        type:String,
    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    to:String

})


module.exports= mongoose.model("Message",MessageSchema)