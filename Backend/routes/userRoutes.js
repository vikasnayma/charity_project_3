const express = require("express");
const router = express.Router();
const { signUpValidation, loginValidation } = require("../helpers/validation");
const { register , login, getUser } = require('../controllers/userController');
const { isAuthorize } = require('../middlewares/auth')


//Authentication Routes
router.post("/register" , signUpValidation , register );
router.post("/login", loginValidation , login );
router.get("/getUser" , isAuthorize , getUser);


module.exports  = router;


