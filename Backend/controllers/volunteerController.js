const Volunteer = require('../models/volunteerModel');

exports.addVolunteer = async(req , res) => {
    try {
        const newVolunteer = await Volunteer.addVolunteer(req.body);
        return res.status(201).json(newVolunteer);
    } catch (error) {
        return res.status(500).json({error: "Could not Add Volunteer"});
    }
}

exports.getAllVolunteer = async(req,res) => {
    try {
        const allVolunteer = await Volunteer.getAllVolunteer(req.body);
        return res.status(200).json(allVolunteer);
    } catch (error) {
        return res.status(500).json({error: "Could not all volunteer"});
    }
}

exports.getVolunteerById = async(req ,res) => {
    try {
        const volunteer = await Volunteer.getVolunteerById(req.params.id);
        if(!volunteer)
        {
            return res.status(404).json({msg: "Volunteer with given id does not exist"});
        }
        return res.status(200).json(volunteer);
    } catch (error) {
        return res.status(500).json({error: "Could not get volunteer with given id"});
    }
}