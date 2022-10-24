
const getRooms=async(req,res,next)=>{
    try{
        const rooms= await ChatRoom.find()
        res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
}


module.exports={getRooms}