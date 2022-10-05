const {Router} = require("express"); 
const router = Router();
const authController = require("../../controllers/auth.controller");

//register user
router.post("/register",authController.registerUser);
//login user
router.post("/login",authController.loginUser);

module.exports = router;
