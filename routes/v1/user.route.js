const { Router } = require('express');
const router = Router();
const userController = require('../../controllers/user.controller');
const adminController = require('../../controllers/admin.controller');
const middlewareController = require('../../middleware/auth.middleware');
const authController = require('../../controllers/auth.controller');

//GET All questions
router.get('/getAllQuestions', middlewareController.verifyToken, userController.getAllQuestion);
//GET All user
router.get('/admin/getAllUser', middlewareController.verifyTokenAdmin, adminController.getAllUser);
//GET result
router.get('/getResult/:id',middlewareController.verifyToken,userController.getResult);

//DELETE user
router.delete(
  '/admin/delete/:id',
  middlewareController.verifyTokenAdmin,
  adminController.deleteUserById,
);
//CREATE answer
router.post('/createAnswer',middlewareController.verifyToken,userController.createAnswer);

//Request refresh token
router.post('/reqToken',authController.reqRefreshToken);

module.exports = router;

