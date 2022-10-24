const { getRooms } = require("../controllers/ChatRoom")

const {Router}=require(express)

const router=Router()

router.get("/rooms",getRooms)


module.exports=router