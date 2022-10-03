
const {Router} = require("express"); 
const router = Router();
const userController = require("../controllers/userController");
const middlewareController = require("../middleware/middleware")

//GET ALL USERS
router.get("/",middlewareController.verifyTokenAdmin,userController.getAllUser);
//GET users by account
router.get("/:account",middlewareController.verifyToken,userController.getUserByAccount);
//DELETE User
router.delete("/delete/:id",middlewareController.verifyTokenAdmin,userController.deleteUser);

module.exports = router;