const express = require("express");
const router = express.Router();

const volunteer = require("../controllers/volunteerController");

//DONATION ROUTES
router.post("/volunteer" , volunteer.addVolunteer);
router.get('/volunteer' , volunteer.getAllVolunteer);
router.get('/volunteer/:id' , volunteer.getVolunteerById);


module.exports  = router;