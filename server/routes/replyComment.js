const {Router}=require("express")
const {getReplies,getReply,deleteReply,createReply,countRepliesByComment,repliesByComment}=require("../controllers/replyComment")

const router= Router()

router.post("/:id/:userId/reply",createReply)
router.get("/",getReplies)
router.get("/:id/replies/repliesByComment",repliesByComment)
router.get("/:id/count/replies/repliesByComment",countRepliesByComment)
router.delete("/:replyId/:commentId",deleteReply)
router.get("/:id",getReply)

module.exports=router