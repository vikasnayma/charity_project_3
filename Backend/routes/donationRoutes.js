const express = require("express");
const router = express.Router();

const donation = require("../controllers/donationController");

//DONATION ROUTES
router.post("/donation" , donation.makeDonation);
router.get('/donation' , donation.getAllDonation);
router.get('/donation/:id' , donation.getDonationById);


module.exports  = router;