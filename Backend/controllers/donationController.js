const Donation = require('../models/donationModel');

 exports.makeDonation = async(req , res) => {
    try {
        const newDonation = await Donation.addDonation(req.body);
        return res.status(201).json(newDonation);
    } catch (error) {
        return res.status(500).json({error: "Could not make donation"});
    }
 }
 exports.getAllDonation = async(req , res) => {
    try {
        const allDonation = await Donation.getDonation(req.body);
        return res.status(200).json(allDonation);
    } catch (error) {
        return res.status(500).json({error: "Could not all donation"});
    }
 }

 exports.getDonationById = async(req , res) => {
    try {
        const donationwithid  = await Donation.getDonationById(req.params.id);
        if(!donationwithid){
            return res.status(404).json({msg: "donation unavailable with given id"});
        }
        return res.status(200).json(donationwithid);
    } catch (error) {
        return res.status(500).json({error: "Could not get donation with given id"});
    }
 }