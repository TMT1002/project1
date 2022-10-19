const { Router } = require('express');
const router = Router();
const adminController = require('../../controllers/admin.controller');
const middlewareController = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validation.middleware');
const userValidation = require('../../validations/user.validation');
const uploadCloud = require('../../config/cloudinary.config');

//CREATE Question
router.post('/admin/createQuestion',
// uploadCloud.array('image', 2),
validate(userValidation.addQuestions),
middlewareController.verifyTokenAdmin,
adminController.createQuestion);

//ADD answer
router.post('/admin/addAnswer',validate(userValidation.addAns),middlewareController.verifyTokenAdmin, adminController.addAnswer);

//ADD new Questions
router.post('/admin/addQuestion',middlewareController.verifyTokenAdmin,adminController.addQuestion);


module.exports = router;
