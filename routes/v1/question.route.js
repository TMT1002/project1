const {Router} = require("express"); 
const router = Router();
const adminController = require("../../controllers/admin.controller");
const middlewareController = require("../../middleware/auth.middleware");

//CREATE Question
router.post("/admin/createQuestion",middlewareController.verifyTokenAdmin,adminController.createQuestion);
//ADD answer
router.post("/admin/addAnswer",middlewareController.verifyTokenAdmin,adminController.addAnswer);
//ADD new Questions
router.post("/admin/addQuestion",middlewareController.verifyTokenAdmin,adminController.addQuestion);

module.exports = router;