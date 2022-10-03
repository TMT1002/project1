const {Router} = require("express"); 
const router = Router();
const questionsController = require("../controllers/questionController");
const middlewareController = require("../middleware/middleware")

//GET All Question
router.get("/allQuestions",middlewareController.verifyTokenAdmin,questionsController.getAllQuestions);
//GET All Answer
router.get("/allAnswer",middlewareController.verifyTokenAdmin,questionsController.getAllAnswer);
//GET Question by ID
router.get("/:id",middlewareController.verifyToken,questionsController.getQuestionById);

module.exports = router;