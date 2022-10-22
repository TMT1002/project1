const { Router } = require('express');
const router = Router();
const authController = require('../../controllers/auth.controller');
const validate = require('../../middleware/validation.middleware');
const authValidation = require('../../validations/auth.validation');


//register user
router.post('/register',validate(authValidation.register), authController.registerUser);

//login user
router.post('/login',validate(authValidation.login), authController.loginUser);

module.exports = router;
