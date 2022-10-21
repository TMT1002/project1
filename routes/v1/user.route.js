const { Router } = require('express');
const router = Router();
const userController = require('../../controllers/user.controller');
const adminController = require('../../controllers/admin.controller');
const emailController = require('../../controllers/email.controller');
const middlewareController = require('../../middleware/auth.middleware');
const authController = require('../../controllers/auth.controller');
const validate = require('../../middleware/validation.middleware');
const userValidation = require('../../validations/user.validation');
const uploadCloud = require('../../config/cloudinary.config');

//GET all questions
router.get('/getAllQuestions',
    validate(userValidation.getAllQuestions),
    middlewareController.verifyToken, 
    userController.getAllQuestion
);

//GET all user
router.get('/admin/getAllUser', middlewareController.verifyTokenAdmin, adminController.getAllUser);

//GET result
router.get('/getResult',middlewareController.verifyToken,userController.getResults);

//DELETE user
router.delete('/admin/deleteUser/:id',middlewareController.verifyTokenAdmin,adminController.deleteUserById);

//DELETE question by id
router.delete('/admin/deleteQuestion/:id',middlewareController.verifyTokenAdmin,adminController.deteleQuestionById);

//CREATE answer
router.post('/createAnswer',middlewareController.verifyToken,userController.submit);    // thiếu validation

//REQUEST refresh token
router.post('/reqToken',authController.reqRefreshToken);

//LOGOUT user
router.post('/logout',middlewareController.verifyToken,userController.logout);

//UPDATE user by id
router.patch('/update',validate(userValidation.updateUser),middlewareController.verifyToken,userController.updateUser);

//UPLOAD image
router.post('/uploadImage',
    middlewareController.verifyToken,
    uploadCloud.single('image'),
    userController.uploadImage
);

router.post('/verifyEmail', middlewareController.verifyToken, emailController.verifyEmail);

router.get('/confirmationEmail',emailController.confirmationEmail);

module.exports = router;

