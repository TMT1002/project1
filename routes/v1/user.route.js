const {Router} = require("express"); 
const router = Router();
const userController = require("../../controllers/user.controller");
const adminController = require("../../controllers/admin.controller");

//GET All questions
router.get("/allQuestions",userController.getAllQuestion);
//ADD new Questions
router.post("/admin/addQuestion",adminController.addQuestion);
//ADD answer
router.post("/admin/addAnswer",adminController.addAnswer);
//GET All user
router.get("/admin/getAllUser",adminController.getAllUser);
//DELETE user
router.delete("/admin/delete/:id",adminController.deleteUserById);
//CREATE Question
router.post("/admin/createQuestion",adminController.createQuestion);

module.exports = router;