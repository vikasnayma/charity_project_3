const pool = require('../config/dbConnection');

const Manager = {
    //1
    getAllDonor: async () => {
        const query = `SELECT * FROM donor`;
        const result = await pool.query(query);
        return result.rows;
    },

    //2
    getDonorById: async (email) => {
        const query = `SELECT * FROM donor WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    //12
    addDonor: async (donorData) => {
        const { name, city, phone, email, password } = donorData;
        const query = `INSERT INTO donor ( name, city, phone, email, password)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [ name, city, phone, email, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    //3
    getAllVolunteer: async () => {
        const query = `SELECT * FROM volunteer`;
        const result = await pool.query(query);
        return result.rows;
    },

    getVolunteerById: async (email) => {
        const query = `SELECT * FROM volunteer WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    //13 
    addVolunteer: async (volunteerData) => {
        const {  name, city, phone, email, password } = volunteerData;
        const query = `INSERT INTO volunteer ( name, city, phone, email, password)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [ name, city, phone, email, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },


    //4 ADD DONATION
    addDonation: async (donationData) => {
        const {transaction_Id, email , date, time, amount, project_Id, payment_type } = donationData;
        const query = `INSERT INTO donation (transaction_Id, email , date, time, amount, project_Id, payment_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [transaction_Id, email , date, time, amount, project_Id, payment_type];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    //5 GET ALL DONATION
    getDonation: async () => {
        const query = `SELECT * FROM donation`;
        const result = await pool.query(query);
        return result.rows;
    },

    //6 GET DONATION BY ID
    getDonationById: async (transaction_Id) => {
        const query = `SELECT * FROM donation WHERE transaction_id = $1`;
        const result = await pool.query(query, [transaction_Id]);
        return result.rows[0];
    },

    //7 GET DETAILS OF ALL THE DONOR DONATED WITHIN A SPECIFIC PROJECT
    getAllDonorDonatedWithinAProject: async (project_Id) => {
        const query = `SELECT DISTINCT d.email , d.name , d.city , d.phone
        FROM donation dn
        JOIN donor d ON dn.email = d.email
        WHERE dn.project_id = $1`;
        const result = await pool.query(query, [project_Id]);
        return result.rows[0];
    },

    //8 GET ALL VOLUNTEER ASSIGNED IN a SPECIFIC PROJECT
    getAllVolunteerAssignedWithinAProject: async (project_Id) => {
        const query = `SELECT v_email , project_Id , email , date_of_assign
        FROM volunteerassignment
        WHERE project_id = $1`;
        const result = await pool.query(query, [project_Id]);
        return result.rows[0];
    },

    //9 GET ALL THE DONATION DONE BY A DONOR
    getAllDonationDoneByADonor: async (email) => {
        const query = `SELECT transaction_Id  , email , project_Id , payment_type , date , time
        FROM donation
        WHERE email = $1
        ORDER BY date DESC, time DESC`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    //10 ADD OR CREATE A NEW PROJECT 
    addProject: async (projectData) => {
        const { project_name, project_Id, email } = projectData;
        const values = [project_name, project_Id, email];
        const query = `INSERT into project
        (project_name , project_Id , email)
        VALUES ( $1 , $2 , $3) RETURNING *`;
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    //11 TOTAL AMOUNT DONATED BY A DONOR WITHIN 2 SPECIFIC DATES
    getTotalAmountDonatedInAnInterval: async (email, start_date, end_date) => {
        const query = `SELECT email , SUM(amount) AS total_amount
        FROM donation
        WHERE email = $1
        AND date BETWEEN $2 AND $3
        GROUP BY email`;
        const result = await pool.query(query, [email, start_date, end_date]);
        return result.rows[0];
    },

    //14 TOTAL AMOUNT DONATED FOR A SPECIFIC PROJECT
    getTotalAmountDonatedForAProject: async (project_Id) => {
        const query = `SELECT project_Id , SUM(amount) AS total_amount
        FROM donation
        WHERE project_Id = $1
        GROUP BY project_Id`;
        const result = await pool.query(query, project_Id);
        return result.rows[0];
    },

    //15 -- Get Volunteer Assignment Data for Each Project
    getAssignVolunteersForAProject: async (project_Id) => {
        const query = `SELECT project.project_name, volunteer.name, volunteerassignment.date_of_assign
        FROM volunteerassignment
        JOIN project ON volunteerassignment.project_Id = project.project_Id 
        JOIN volunteer ON volunteerassignment.v_email = volunteer.email
        WHERE volunteerassignment.project_Id = $1`;
        const result = await pool.query(query , [project_Id]);
        return result.rows;
    },

    //16 -- Get Total Number of Donations for Each Project
    getTotalNoOfDonationForAProject: async(project_Id) => {
        const query = `SELECT project.project_name, COUNT(donation.transaction_Id) AS Total_Donations
        FROM donation
        JOIN project ON donation.project_Id = project.project_Id
        WHERE donation.project_Id = $1
        GROUP BY project.project_name`;
        const result = await pool.query(query , [project_Id]);
        return result.rows;
    },

    //17 -- Get Total Funds Invested by Each Manager
    getTotalFundInvestedByAManager: async(email) => {
        const query = `SELECT manager.name, SUM(fundinvestment.retrieval_amount) AS Total_Invested
        FROM fundinvestment
        JOIN manager ON fundinvestment.email = manager.email
        WHERE fundinvestment.email = $1
        GROUP BY manager.name`;
        const result = await pool.query(query , [email]);
        return result.rows;
    },

    //18 --updating a donation with given id
    updateDonationByID: async(transaction_Id , new_amount) => {
       const query = `UPDATE donations
       SET amount = $2,                    
       WHERE transaction_Id = $1 `;
       const result = await pool.query(query , [transaction_Id , new_amount] );
       return result.rows;
    },

    getAllProject: async () => {
        const query = `SELECT * FROM project`;
        const result = await pool.query(query);
        return result.rows;
    },

    
    getProjectById: async (project_Id) => {
        const query = `SELECT * FROM project WHERE project_Id = $1`;
        const result = await pool.query(query, [project_Id]);
        return result.rows[0];
    },

    //12
    addProject: async (projectData) => {
        const { project_Id, project_name , email , goal , date_of_start ,status } = projectData;
        const query = `INSERT INTO donor (  project_Id, project_name , email , goal , date_of_start ,status)
            VALUES ($1, $2, $3 , $4 , $5 , $6) RETURNING *`;
        const values = [  project_Id, project_name , email , goal , date_of_start ,status];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getProjectByVolunteer: async(email) => {
        const query = `SELECT  p.project_ID,p.project_name,va.date_of_assign,va.date_of_completion
            FROM 
            volunteerassignment va
            JOIN 
            project p ON va.project_ID = p.project_ID
            WHERE 
            va.email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows;
    
    },

    // Method to get the total donations
getTotalDonations: async () => {
    const query = `SELECT SUM(amount) AS total FROM donation`;
    const result = await pool.query(query);
    return result.rows[0]?.total || 0; // Return total donations
  },
  
  getTotalDonationUsed: async () => {
      const query = `
        SELECT SUM(retrieval_amount) AS total_spent
        FROM fundinvestment
      `;
      const result = await pool.query(query);
      return result.rows[0]?.total_spent || 0; // Return total money used/spent in projects
    },
  
  // Method to get top donors
  getTopDonors: async () => {
    const query = `
      SELECT d.name, SUM(dn.amount) AS total_donated
      FROM donor d
      JOIN donation dn ON d.email = dn.email
      GROUP BY d.name
      ORDER BY total_donated DESC
      LIMIT 5
    `;
    const result = await pool.query(query);
    return result.rows; // Return top 5 donors
  },
  
  // Method to get top volunteers based on completed assignments
  getTopVolunteers: async () => {
    const query = `
      SELECT v.name, COUNT(va.project_ID) AS total_projects
      FROM volunteer v
      JOIN volunteerassignment va ON v.email = va.v_email
      WHERE va.date_of_completion IS NOT NULL
      GROUP BY v.name
      ORDER BY total_projects DESC
      LIMIT 5
    `;
    const result = await pool.query(query);
    return result.rows; // Return top 5 volunteers
  },
  
  // Method to get donation sources by project
  getDonationSources: async () => {
    const query = `
      SELECT p.project_name AS name, SUM(d.amount) AS total_donated
      FROM project p
      JOIN donation d ON p.project_ID = d.project_ID
      GROUP BY p.project_name
      ORDER BY total_donated DESC
    `;
    const result = await pool.query(query);
    return result.rows; // Return donation sources by project
  },
  
  // Additional method to get project by ID, as requested
  getProjectById: async (project_Id) => {
    const query = `SELECT * FROM project WHERE project_ID = $1`;
    const result = await pool.query(query, [project_Id]);
    return result.rows[0]; // Return project by ID
  },

  // Get volunteers who are not currently assigned to any project
 getUnassignedVolunteers : async () => {
    const query = `
        SELECT v.name, v.city, v.phone, v.email
        FROM volunteer v
        LEFT JOIN volunteerassignment va ON v.email = va.v_email
        WHERE va.project_ID IS NULL OR va.date_of_completion IS NOT NULL;
    `;
    const result = await pool.query(query);
    return result.rows; // Returns the unassigned volunteers
},
// Get all volunteers assigned to a specific project
 getAssignedVolunteersForProject : async (projectId) => {
    const query = `
        SELECT v.name, v.city, v.phone, v.email
        FROM volunteer v
        JOIN volunteerassignment va ON v.email = va.v_email
        WHERE va.project_ID = $1 AND va.date_of_completion IS NULL;
    `;
    const result = await pool.query(query, [projectId]);
    return result.rows; // This will return the list of volunteers working on the project
},
// Get projects with less than 10 volunteers
 getProjectsWithLessThan10Volunteers : async () => {
    const query = `
        SELECT p.project_name, p.project_ID, COUNT(va.v_email) AS volunteer_count
        FROM project p
        LEFT JOIN volunteerassignment va ON p.project_ID = va.project_ID
        GROUP BY p.project_ID
        HAVING COUNT(va.v_email) < 10;
    `;
    const result = await pool.query(query);
    return result.rows; // This will return the projects that have fewer than 10 volunteers
},
}

module.exports = Manager;