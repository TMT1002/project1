const {Router} = require("express"); 
const router = Router();
const adminController = require("../../controllers/admin.controller");

//get All user
router.get("/getAllUser",adminController.getAllUser);
//delete user
router.delete("/delete/:id",adminController.deleteUserById);

module.exports = router;