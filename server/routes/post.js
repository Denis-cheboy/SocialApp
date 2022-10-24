const {Router}=require("express")
const { createPost, getPosts, deletePost, likePost,updatePost, timelinePost, getPost, getPostByUser,countLikes } = require("../controllers/post")

const router=Router()


router.post("/:id",createPost)
router.get("/",getPosts)
router.delete("/:postId/:userId",deletePost)
router.put("/:id/like",likePost)
router.put("/:id",updatePost)
router.get("/:id",getPost)
router.get("/timeline/all",timelinePost)
router.get("/:id/user/posts/all",getPostByUser)
router.get("/user/posts/:id/count/countLikes",countLikes)

module.exports=router