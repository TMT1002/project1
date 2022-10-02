const {Router} = require("express"); 
const router = Router();
const questionsController = require("../controllers/questionController");

//GET All Question
router.get("/allQuestions",questionsController.getAllQuestions);
//GET Question by ID
router.get("/:id",questionsController.getQuestionById);


module.exports = router;