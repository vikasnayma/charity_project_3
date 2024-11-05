const express = require("express");
const router = express.Router();
const manager = require('../controllers/allController');



//DONATION ROUTES
router.post("/donation" , manager.makeDonation);
router.get('/donation' , manager.getAllDonation);
router.get('/donation/:id' , manager.getDonationById);

//DONOR ROUTES
router.post("/donor" , manager.addDonor);
router.get('/donor' , manager.getAllDonor);
router.get('/donor/:id' , manager.getDonorById);

//volunteer ROUTES
router.post("/volunteer" , manager.addVolunteer);
router.get('/volunteer' , manager.getAllVolunteer);
router.get('/volunteer/:id' ,manager.getVolunteerById);


module.exports  = router;