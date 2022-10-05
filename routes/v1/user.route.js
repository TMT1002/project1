const {Router} = require("express"); 
const router = Router();
const userController = require("../../controllers/user.controller");
const adminController = require("../../controllers/admin.controller");
const middlewareController = require("../../middleware/auth.middleware");

//GET All questions
router.get("/getAllQuestions",middlewareController.verifyToken,userController.getAllQuestion);
//GET All user
router.get("/admin/getAllUser",middlewareController.verifyTokenAdmin,adminController.getAllUser);
//DELETE user
router.delete("/admin/delete/:id",middlewareController.verifyTokenAdmin,adminController.deleteUserById);

module.exports = router;