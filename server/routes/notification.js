const {Router}=require("express")
const { postNotification, userNotifications } = require("../controllers/Notifcation")

const router=Router()

router.post("/:userId/:postId/notification",postNotification)
router.post("/:id/users/user/notifications",userNotifications)

module.exports=router