const {Router} = require("express"); 
const router = Router();
const questionsController = require("../controllers/questionController");
const middlewareController = require("../controllers/middlewareController")

//GET All Question
router.get("/allQuestions",middlewareController.verifyTokenAdmin,questionsController.getAllQuestions);
//GET Question by ID
router.get("/:id",middlewareController.verifyToken,questionsController.getQuestionById);


module.exports = router;