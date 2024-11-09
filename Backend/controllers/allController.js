const Manager = require('../models/managerModel');

 exports.makeDonation = async(req , res) => {
    try {
        const newDonation = await Manager.addDonation(req.body);
        return res.status(201).json(newDonation);
    } catch (error) {
        return res.status(500).json({error: "Could not make donation"});
    }
 }
 exports.getAllDonation = async(req , res) => {
    try {
        const allDonation = await Manager.getDonation(req.body);
        return res.status(200).json(allDonation);
    } catch (error) {
        return res.status(500).json({error: "Could not all donation"});
    }
 }

 exports.getDonationById = async(req , res) => {
    try {
        const donationwithid  = await Manager.getDonationById(req.params.id);
        if(!donationwithid){
            return res.status(404).json({msg: "donation unavailable with given id"});
        }
        return res.status(200).json(donationwithid);
    } catch (error) {
        return res.status(500).json({error: "Could not get donation with given id"});
    }
 }


exports.addDonor = async(req , res) => {
    try {
        const newDonor = await Manager.addDonor(req.body);
        return res.status(201).json(newDonor);
    } catch (error) {
        return res.status(500).json({error: "Could not Add Donor"});
    }
}

exports.getAllDonor = async(req,res) => {
    try {
        const allDonor = await Manager.getAllDonor(req.body);
        return res.status(200).json(allDonor);
    } catch (error) {
        return res.status(500).json({error: "Could not all donor"});
    }
}

exports.getDonorById = async(req ,res) => {
    try {
        const donor = await Manager.getDonorById(req.params.id);
        if(!donor)
        {
            return res.status(404).json({msg: "Donor with given id does not exist"});
        }
        return res.status(200).json(donor);
    } catch (error) {
        return res.status(500).json({error: "Could not get donor with given id"});
    }
}



exports.addVolunteer = async(req , res) => {
    try {
        const newVolunteer = await Manager.addVolunteer(req.body);
        return res.status(201).json(newVolunteer);
    } catch (error) {
        return res.status(500).json({error: "Could not Add Volunteer"});
    }
}

exports.getAllVolunteer = async(req,res) => {
    try {
        const allVolunteer = await Manager.getAllVolunteer(req.body);
        return res.status(200).json(allVolunteer);
    } catch (error) {
        return res.status(500).json({error: "Could not all volunteer"});
    }
}

exports.getVolunteerById = async(req ,res) => {
    try {
        const volunteer = await Manager.getVolunteerById(req.params.id);
        if(!volunteer)
        {
            return res.status(404).json({msg: "Volunteer with given id does not exist"});
        }
        return res.status(200).json(volunteer);
    } catch (error) {
        return res.status(500).json({error: "Could not get volunteer with given id"});
    }
}
exports.getAllVolunteerWithinAProject = async(req , res) => {
    try {
        const allvolunteers = await Manager.getAssignVolunteersForAProject(req.params.id);
        // console.log(allvolunteers);
       if(!allvolunteers)
            {
                return res.status(404).json({msg: "Volunteer within given project id does not exist"});
            } 
            return res.status(200).json(allvolunteers);
    } catch (error) {
        return res.status(500).json({error: "Could not get volunteers within given project"});
    }
}

exports.getTotalNoDonationForAProject = async(req , res) => {
    try {
        const totaldonations = await Manager.getTotalNoOfDonationForAProject(req.params.id);
        // console.log(totaldonations);
        
        if(!totaldonations)
            {
                return res.status(404).json({msg: "no donations"});
            } 
        return res.status(200).json(totaldonations);
    } catch (error) {
        return res.status(500).json({error: "internal server error"});
    }
}

exports.getTotalFundInvestedByAManager = async(req ,res) => {
    try {
        const totalinvestment = await Manager.getTotalFundInvestedByAManager(req.params.id);
        if(!totalinvestment)
            {
                return res.status(404).json({msg: "no investments"});
            } 
        return res.status(200).json(totalinvestment);
    } catch (error) {
        return res.status(500).json({error: "internal server error"});
    }
}

exports.updateDonationById = async (req , res) => {
    try {
        const updatedDonation = await Manager.updateDonationByID(req.params.id , req.body.new_amount);
        if(!updatedDonation)
            {
                return res.status(404).json({msg: "couldnt find donation with given id"});
            } 
        return res.status(200).json(updatedDonation);
    } catch (error) {
        return res.status(500).json({error: "internal server error"});
    }
}
