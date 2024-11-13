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

exports.addProject = async(req , res) => {
    try {
        const newProject = await Manager.addProject(req.body);
        return res.status(201).json(newProject);
    } catch (error) {
        return res.status(500).json({error: "Could not add project"});
    }
 }
 exports.getAllProject = async(req , res) => {
    try {
        const allProject = await Manager.getAllProject(req.body);
        return res.status(200).json(allProject);
    } catch (error) {
        return res.status(500).json({error: "Could not get all projects"});
    }
 }

 exports.getProjectById = async(req , res) => {
    try {
        const projectbyid  = await Manager.getProjectById(req.params.id);
        if(!projectbyid){
            return res.status(404).json({msg: "project unavailable with given id"});
        }
        return res.status(200).json(projectbyid);
    } catch (error) {
        return res.status(500).json({error: "Could not get project with given id"});
    }
 }


 // Controller function to get all donations by donor
exports.getAllDonationDoneByADonor = async (req, res) => {
    try {
        const donorId = req.params.id;
        const donations = await Manager.getAllDonationDoneByADonor(donorId);
        if (!donations) {
            return res.status(404).json({ msg: "No donations found for this donor." });
        }
        return res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Could not retrieve donations for the given donor." });
    }
}

exports.getProjectByVolunteer = async (req, res) => {
        try {
            const volunteerId = req.params.id;
            const projects = await Manager.getProjectByVolunteer(volunteerId);
            if (!projects) {
                return res.status(404).json({ msg: "No projects found for this volunteer." });
            }   
            return res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Could not retrieve projects for the given volunteer." });
        };
}

exports.getTotalDonations = async (req, res) => {
    try {
      const totalDonations = await Manager.getTotalDonations();
      return res.status(200).json({ total: totalDonations });
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch total donations' });
    }
  };
  
  // Controller for donation revenue
  exports.getDonationRevenue = async (req, res) => {
    try {
      const donationRevenue = await Manager.getDonationRevenue();
      return res.status(200).json({ revenue: donationRevenue });
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch donation revenue' });
    }
  };
  
  // Controller for top donors
  exports.getTopDonors = async (req, res) => {
    try {
      const topDonors = await Manager.getTopDonors();
      return res.status(200).json(topDonors);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch top donors' });
    }
  };
  
  // Controller for top volunteers
  exports.getTopVolunteers = async (req, res) => {
    try {
      const topVolunteers = await Manager.getTopVolunteers();
      return res.status(200).json(topVolunteers);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch top volunteers' });
    }
  };
  
  // Controller for donation sources
  exports.getDonationSources = async (req, res) => {
    try {
      const donationSources = await Manager.getDonationSources();
      return res.status(200).json(donationSources);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch donation sources' });
    }
}

//Volunteer assignment page 
exports.getUnassignedVolunteers = async (req, res) => {
    try {
        const unassignedVolunteers = await Manager.getUnassignedVolunteers();
        
        if (unassignedVolunteers.length === 0) {
            return res.status(404).json({ msg: "No unassigned volunteers found" });
        }
        return res.status(200).json(unassignedVolunteers); // Return unassigned volunteers list
    } catch (error) {
        console.error("Error fetching unassigned volunteers:", error);
        return res.status(500).json({ error: "Could not fetch unassigned volunteers" });
    }
};

exports.getProjectsWithLessThan10Volunteers = async (req, res) => {
    try {
        const projects = await Manager.getProjectsWithLessThan10Volunteers();
        
        if (projects.length === 0) {
            return res.status(404).json({ msg: "No projects with less than 10 volunteers found" });
        }
        return res.status(200).json(projects); // Return projects list
    } catch (error) {
        console.error("Error fetching projects with less than 10 volunteers:", error);
        return res.status(500).json({ error: "Could not fetch projects with less than 10 volunteers" });
    }
};

exports.getAssignedVolunteersForProject = async (req, res) => {
    const projectId = req.params.id; // Get project ID from URL params
    try {
        const allVolunteers = await Manager.getAssignedVolunteersForProject(projectId);
        
        if (allVolunteers.length === 0) {
            return res.status(404).json({ msg: "No volunteers assigned to this project" });
        }
        return res.status(200).json(allVolunteers); // Return assigned volunteers for project
    } catch (error) {
        console.error("Error fetching volunteers for project:", error);
        return res.status(500).json({ error: "Could not fetch volunteers for the project" });
    }
};
exports.getAllDonors = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM donor');
      res.status(200).json(result.rows); // Adjusted for PostgreSQL
    } catch (err) {
      console.error('Error fetching donors:', err);
      res.status(500).json({ message: 'Error fetching donors' });
    }
  };

// Controller for fetching all volunteers
exports.getAllVolunteers = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM volunteer');
      res.status(200).json(result.rows); // Adjusted for PostgreSQL
    } catch (err) {
      console.error('Error fetching volunteers:', err);
      res.status(500).json({ message: 'Error fetching volunteers' });
    }
  };

// Controller for fetching all admins (managers)
exports.getAllAdmins = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM manager');
      res.status(200).json(result.rows); // Adjusted for PostgreSQL
    } catch (err) {
      console.error('Error fetching admins:', err);
      res.status(500).json({ message: 'Error fetching admins' });
    }
  };

// Controller for filtering donors based on search term
exports.filterDonors = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    try {
      const result = await pool.query(
        `SELECT * FROM donor WHERE name LIKE $1 OR email LIKE $2 OR city LIKE $3,
        [%${searchTerm}%, %${searchTerm}%, %${searchTerm}%]`
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error filtering donors:', err);
      res.status(500).json({ message: 'Error filtering donors' });
    }
  };

// Controller for filtering volunteers based on search term
exports.filterVolunteers = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    try {
      const result = await pool.query(
        `SELECT * FROM volunteer WHERE name LIKE $1 OR email LIKE $2 OR city LIKE $3,
        [%${searchTerm}%, %${searchTerm}%, %${searchTerm}%]`
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error filtering volunteers:', err);
      res.status(500).json({ message: 'Error filtering volunteers' });
    }
  };

// Controller for filtering admins based on search term
exports.filterAdmins = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    try {
      const result = await pool.query(
        `SELECT * FROM manager WHERE name LIKE $1 OR email LIKE $2 OR city LIKE $3,
        [%${searchTerm}%, %${searchTerm}%, %${searchTerm}%]`
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error filtering admins:', err);
      res.status(500).json({ message: 'Error filtering admins' });
    }
  };
//Projects
// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.findAll();
      if (projects.length === 0) {
        return res.status(404).json({ msg: "No projects found" });
      }
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ error: "Could not fetch projects" });
    }
  },
  
  // Add a new project
  exports.addProject = async (req, res) => {
    const { project_name, email, date_of_start, status, goal } = req.body;
  
    try {
      const newProject = await Project.create({
        project_name,
        email,
        date_of_start,
        status,
        goal,
      });
      return res.status(201).json(newProject);
    } catch (error) {
      console.error("Error adding project:", error);
      return res.status(500).json({ error: "Could not add project" });
    }
  },
  
  // Remove a project
  exports.removeProject = async (req, res) => {
    const { projectId } = req.params;
  
    try {
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ msg: "Project not found" });
      }
  
      await project.destroy();
      return res.status(200).json({ msg: "Project removed successfully" });
    } catch (error) {
      console.error("Error removing project:", error);
      return res.status(500).json({ error: "Could not remove project" });
    }
  },
  
  // Get all donations
  exports.getAllDonations = async (req, res) => {
    try {
      const donations = await Donation.findAll();
      if (!donations || donations.length === 0) {
        return res.status(404).json({ msg: "No donations found" });
      }
      return res.status(200).json(donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      return res.status(500).json({ error: "Could not fetch donations" });
    }
},
//donation
exports.getAllDonations= async (req, res) => {
    try {
      const donations = await Manager.getAllDonations();
      if (!donations || donations.length === 0) {
        return res.status(404).json({ msg: "No donations found" });
      }
      return res.status(200).json(donations); // Return all donations
    } catch (error) {
      console.error("Error fetching donations:", error);
      return res.status(500).json({ error: "Could not fetch donations" });
    }
  },


//home
exports.getTotalDonations = async (req, res) => {
    try {
      const totalDonations = await Manager.getTotalDonations();
      return res.status(200).json({ total: totalDonations });
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch total donations' });
    }
  };
  
  // Controller for donation revenue
  exports.getDonationRevenue = async (req, res) => {
    try {
      const donationRevenue = await Manager.getDonationRevenue();
      return res.status(200).json({ revenue: donationRevenue });
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch donation revenue' });
    }
  };
  
  // Controller for top donors
  exports.getTopDonors = async (req, res) => {
    try {
      const topDonors = await Manager.getTopDonors();
      return res.status(200).json(topDonors);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch top donors' });
    }
  };
  
  // Controller for top volunteers
  exports.getTopVolunteers = async (req, res) => {
    try {
      const topVolunteers = await Manager.getTopVolunteers();
      return res.status(200).json(topVolunteers);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch top volunteers' });
    }
  };
  
  // Controller for donation sources
  exports.getDonationSources = async (req, res) => {
    try {
      const donationSources = await Manager.getDonationSources();
      return res.status(200).json(donationSources);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch donation sources' });
    }
}

//Volunteer assignment page 
exports.getUnassignedVolunteers = async (req, res) => {
    try {
        const unassignedVolunteers = await Manager.getUnassignedVolunteers();
        
        if (unassignedVolunteers.length === 0) {
            return res.status(404).json({ msg: "No unassigned volunteers found" });
        }
        return res.status(200).json(unassignedVolunteers); // Return unassigned volunteers list
    } catch (error) {
        console.error("Error fetching unassigned volunteers:", error);
        return res.status(500).json({ error: "Could not fetch unassigned volunteers" });
    }
};

exports.getProjectsWithLessThan10Volunteers = async (req, res) => {
    try {
        const projects = await Manager.getProjectsWithLessThan10Volunteers();
        
        if (projects.length === 0) {
            return res.status(404).json({ msg: "No projects with less than 10 volunteers found" });
        }
        return res.status(200).json(projects); // Return projects list
    } catch (error) {
        console.error("Error fetching projects with less than 10 volunteers:", error);
        return res.status(500).json({ error: "Could not fetch projects with less than 10 volunteers" });
    }
};

exports.getAssignedVolunteersForProject = async (req, res) => {
    const projectId = req.params.id; // Get project ID from URL params
    try {
        const allVolunteers = await Manager.getAssignedVolunteersForProject(projectId);
        
        if (allVolunteers.length === 0) {
            return res.status(404).json({ msg: "No volunteers assigned to this project" });
        }
        return res.status(200).json(allVolunteers); // Return assigned volunteers for project
    } catch (error) {
        console.error("Error fetching volunteers for project:", error);
        return res.status(500).json({ error: "Could not fetch volunteers for the project" });
    }
};

exports.getTotalDonations = async (req, res) => {
    try {
      const totalDonations = await Manager.getTotalDonations();
      return res.status(200).json({ total: totalDonations });
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch total donations' });
    }
  };
  
  // Controller for donation revenue
  exports.getDonationRevenue = async (req, res) => {
    try {
      const donationRevenue = await Manager.getDonationRevenue();
      return res.status(200).json({ revenue: donationRevenue });
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch donation revenue' });
    }
  };
  
  // Controller for top donors
  exports.getTopDonors = async (req, res) => {
    try {
      const topDonors = await Manager.getTopDonors();
      return res.status(200).json(topDonors);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch top donors' });
    }
  };
  
  // Controller for top volunteers
  exports.getTopVolunteers = async (req, res) => {
    try {
      const topVolunteers = await Manager.getTopVolunteers();
      return res.status(200).json(topVolunteers);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch top volunteers' });
    }
  };
  
  // Controller for donation sources
  exports.getDonationSources = async (req, res) => {
    try {
      const donationSources = await Manager.getDonationSources();
      return res.status(200).json(donationSources);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch donation sources' });
    }
}