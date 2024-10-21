const express = require("express");
const router = express.Router();
const { signUpValidation, loginValidation } = require("../helpers/validation");
const { register , login, getUser } = require('../controllers/userController');


router.post("/register" , signUpValidation , register );
router.post("/login", loginValidation , login );
router.get("/getUser" , getUser);

module.exports  = router;