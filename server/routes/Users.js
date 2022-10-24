const {Router}=require("express")
const {getAllUsers,getUser,deleteUser,updateUser, following, unfollow}=require("../controllers/Users")

const router=Router()

router.get("/",getAllUsers)
router.get("/:id",getUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)
router.put("/:id/follow",following)
router.put("/:id/unfollow",unfollow)


module.exports=router