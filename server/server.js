const express=require("express")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const cors= require("cors")
const postRoute=require("./routes/post")
const notificationRoute=require("./routes/notification")
const replyCommentRoute=require("./routes/replyComment")
const commentRoute=require("./routes/comment")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth")
const userRoute=require("./routes/Users")
const Message = require("./models/Message")
const app=express()

mongoose.connect("mongodb://localhost:27017/SocialMediaApp")
.then(()=>console.log("Connected to mongoDB"))
.catch((err)=>console.log(err.message))


const PORT=process.env.PORT || 3001

const server= require("http").createServer(app)
const rooms=["Finace","Tech","Crypto","General"]
const io= require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000",
        method:["POST","GET"]
    }
})
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())
app.use((err,req,res,next)=>{
    const errStatus=err.status || 400
    const errMsg=err.message || "something went wrong"
    res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMsg,
        stack:err.stack

    })
})
app.use("/api/v4",authRoute)
app.use("/api/v4/users",userRoute)
app.use("/api/v4/posts",postRoute)
app.use("/api/v4/comments",commentRoute)
app.use("/api/v4/replies",replyCommentRoute)
app.use("/api/v4/notifications",notificationRoute)

const getLastMessagesFromRoom=async(room)=>{
    let roomMessages= await Message.aggregate([
        {$match:{to:room}},
        {$group:{_id:"$date",messagesByDate:{$push:"$ROOT"}}}
    ])
    return roomMessages

}

const sortRoomMessagesByDate=async(messages)=>{
    return messages.sort((a,b)=>{
        let date1=a._id.split("/")
        let date2=b._id.split("/")
        date1=date1[2]+date1[0]+date1[1]
        date2=date2[2]+date2[0]+date2[1]
        return date1<date2?-1:1
    })

}
// socket connection
io.on("connection",(socket)=>{

    socket.on("new-user",async()=>{
        const members= await User.find()
        io.emit("new-user",members)
    })

    socket.on("join-room",async(room)=>{
        socket.join(room)
        let roomMessages= await getLastMessagesFromRoom(room)
        roomMessages= sortRoomMessagesByDate(roomMessages)
        socket.emit("room-messages",roomMessages)
    })



})




app.listen(PORT,()=>console.log("Application running on port",PORT))

