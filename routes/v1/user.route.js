const { Router } = require('express');
const router = Router();
const userController = require('../../controllers/user.controller');
const adminController = require('../../controllers/admin.controller');
const middlewareController = require('../../middleware/auth.middleware');
const authController = require('../../controllers/auth.controller');

//GET all questions
router.get('/getAllQuestions', middlewareController.verifyToken, userController.getAllQuestion);
//GET all user
router.get('/admin/getAllUser', middlewareController.verifyTokenAdmin, adminController.getAllUser);
//GET result
router.get('/getResult',middlewareController.verifyToken,userController.getResults);

//DELETE user
router.delete(
  '/admin/delete/:id',
  middlewareController.verifyTokenAdmin,
  adminController.deleteUserById,
);
//CREATE answer
router.post('/createAnswer',middlewareController.verifyToken,userController.submit);
//Request refresh token
router.post('/reqToken',authController.reqRefreshToken);
//LOGOUT user
router.post('/logout',middlewareController.verifyToken,userController.logout);

module.exports = router;

