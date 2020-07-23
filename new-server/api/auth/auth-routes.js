const express = require('express');
const router = express.Router();
const authController = require('./auth-controller');
const tokenAuth = require('../../middleware/tokenAuth');
const {validateSignUpBody, validateLogInBody, userSignUp, userLogIn} = authController

router.post('/sign-up', validateSignUpBody, userSignUp);
router.post('/log-in', validateLogInBody, userLogIn);

module.exports = router;