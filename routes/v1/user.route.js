const { Router } = require('express');
const router = Router();
const userController = require('../../controllers/user.controller');
const adminController = require('../../controllers/admin.controller');
const middlewareController = require('../../middleware/auth.middleware');
const authController = require('../../controllers/auth.controller');
const validate = require('../../middleware/validation.middleware');
const userValidation = require('../../validations/user.validation');

//GET all questions
router.get('/getAllQuestions',validate(userValidation.getAllQuestions),middlewareController.verifyToken, userController.getAllQuestion);

//GET all user
router.get('/admin/getAllUser', middlewareController.verifyTokenAdmin, adminController.getAllUser);

//GET all questions by admin
router.get('/admin/getAllQuestions', middlewareController.verifyTokenAdmin, adminController.getAllQuestionsByAdmin);

//GET result
router.get('/getResult',middlewareController.verifyToken,userController.getResults);

//DELETE user
router.delete('/admin/delete/:id',middlewareController.verifyTokenAdmin,adminController.deleteUserById);

//CREATE answer
router.post('/createAnswer',middlewareController.verifyToken,userController.submit);

//REQUEST refresh token
router.post('/reqToken',authController.reqRefreshToken);

//LOGOUT user
router.post('/logout',middlewareController.verifyToken,userController.logout);

//UPDATE user by id
router.patch('/update',validate(userValidation.updateUser),middlewareController.verifyToken,userController.updateUser);

module.exports = router;

