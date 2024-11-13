const express = require("express");
const router = express.Router();
const manager = require('../controllers/allController');



//DONATION ROUTES
router.post("/donation" , manager.makeDonation);
router.get('/donation' , manager.getAllDonation);
router.get('/donation/:id' , manager.getDonationById);

//PROJECT ROUTES
router.post("/project" , manager.addProject);
router.get("/project" , manager.getAllProject);
router.get("/project/:id" , manager.getProjectById);

//DONOR ROUTES
router.post("/donor" , manager.addDonor);
router.get('/donor' , manager.getAllDonor);
router.get('/donor/:id' , manager.getDonorById);
router.get("/donordonation/:id", manager.getAllDonationDoneByADonor);

//volunteer ROUTES
router.post("/volunteer" , manager.addVolunteer);
router.get('/volunteer' , manager.getAllVolunteer);
router.get('/volunteer/:id' ,manager.getVolunteerById);

//15
router.get("/volunteerassignment/:id" , manager.getAllVolunteerWithinAProject);
router.get("/projectbyvolunteer/:id", manager.getProjectByVolunteer );

//16
router.get("/totaldonation/:id" , manager.getTotalNoDonationForAProject);

//17
router.get("/fundinvestment/:id" , manager.getTotalFundInvestedByAManager);

//18
router.get("/donation/:id" , manager.updateDonationById);

router.get('/total-donations', manager.getTotalDonations);
router.get('/donation-revenue', manager.getDonationRevenue);
router.get('/top-donors', manager.getTopDonors);
router.get('/top-volunteers',manager.getTopVolunteers);
router.get('/donation-sources', manager.getDonationSources);

module.exports  = router;