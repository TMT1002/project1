
const authController = require("../controllers/authController");

const {Router} = require("express"); 
const router = Router();


router.post("/register",authController.register);
router.post("/login",authController.loginUsers);

module.exports = router;