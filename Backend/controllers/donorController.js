const Donor = require('../models/donorModel');

exports.addDonor = async(req , res) => {
    try {
        const newDonor = await Donor.addDonor(req.body);
        return res.status(201).json(newDonor);
    } catch (error) {
        return res.status(500).json({error: "Could not Add Donor"});
    }
}

exports.getAllDonor = async(req,res) => {
    try {
        const allDonor = await Donor.getAllDonor(req.body);
        return res.status(200).json(allDonor);
    } catch (error) {
        return res.status(500).json({error: "Could not all donor"});
    }
}

exports.getDonorById = async(req ,res) => {
    try {
        const donor = await Donor.getDonorById(req.params.id);
        if(!donor)
        {
            return res.status(404).json({msg: "Donor with given id does not exist"});
        }
        return res.status(200).json(donor);
    } catch (error) {
        return res.status(500).json({error: "Could not get donor with given id"});
    }
}