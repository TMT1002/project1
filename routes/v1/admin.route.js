const {Router} = require("express"); 
const router = Router();
const adminController = require("../../controllers/admin.controller");

//ADD new Questions
router.post("/addQuestion",adminController.addQuestion);
//ADD answer
router.post("/addAnswer",adminController.addAnswer);
//get All user
router.get("/getAllUser",adminController.getAllUser);
//delete user
router.delete("/delete/:id",adminController.deleteUserById);
//CREATE Question
router.post("/createQuestion",adminController.createQuestion);

module.exports = router;