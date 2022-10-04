const {Router} = require("express"); 
const router = Router();
const userController = require("../../controllers/user.controller");

//GET All questions
router.get("/allQuestions",userController.getAllQuestion);

module.exports = router;