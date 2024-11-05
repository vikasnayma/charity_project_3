const express = require("express");
const router = express.Router();

const donor = require("../controllers/donorController");

//DONATION ROUTES
router.post("/donor" , donor.addDonor);
router.get('/donor' , donor.getAllDonor);
router.get('/donor/:id' , donor.getDonorById);


module.exports = router;