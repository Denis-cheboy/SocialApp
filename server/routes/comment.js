const {Router}=require("express")
const { createComment, getComments, deleteComment, getComment, commentsByPost, likeComment, countCommentsByPost} = require("../controllers/comment")

const router=Router()

router.post("/:postId/comment",createComment)
router.get("/",getComments)
router.get("/:id",getComment)
router.delete("/:commentId/:postId",deleteComment)
router.get("/:id/commentsByPost",commentsByPost)
router.put("/:id/:userId/like",likeComment)
router.get("/:id/comments/count",countCommentsByPost)
// router.put("/:id/:userId/comment/reply",replyComment)

module.exports=router