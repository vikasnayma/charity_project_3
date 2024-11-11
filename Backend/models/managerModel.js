const pool = require('../config/dbConnection');

const Manager = {
    //1
    getAllDonor: async () => {
        const query = `SELECT * FROM donor`;
        const result = await pool.query(query);
        return result.rows;
    },

    //2
    getDonorById: async (d_id) => {
        const query = `SELECT * FROM donor WHERE d_id = $1`;
        const result = await pool.query(query, [d_id]);
        return result.rows[0];
    },

    //12
    addDonor: async (donorData) => {
        const { d_id, d_name, d_city, d_phone, d_email, d_password } = donorData;
        const query = `INSERT INTO donor (d_id , d_name , d_city , d_phone , d_email , d_password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [d_id, d_name, d_city, d_phone, d_email, d_password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    //3
    getAllVolunteer: async () => {
        const query = `SELECT * FROM volunteer`;
        const result = await pool.query(query);
        return result.rows;
    },

    getVolunteerById: async (v_id) => {
        const query = `SELECT * FROM volunteer WHERE v_id = $1`;
        const result = await pool.query(query, [v_id]);
        return result.rows[0];
    },

    //13 
    addVolunteer: async (volunteerData) => {
        const { v_id, v_name, v_city, v_phone, v_email, v_password } = volunteerData;
        const query = `INSERT INTO volunteer (v_id , v_name , v_city , v_phone , v_email , v_password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [v_id, v_name, v_city, v_phone, v_email, v_password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },


    //4 ADD DONATION
    addDonation: async (donationData) => {
        const { transaction_id, d_id, date, time, amount, project_id, payment_type } = donationData;
        const query = `INSERT INTO donation (transaction_id , d_id , date , time , amount , project_id , payment_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [transaction_id, d_id, date, time, amount, project_id, payment_type];
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
    getDonationById: async (transaction_id) => {
        const query = `SELECT * FROM donation WHERE transaction_id = $1`;
        const result = await pool.query(query, [transaction_id]);
        return result.rows[0];
    },

    //7 GET DETAILS OF ALL THE DONOR DONATED WITHIN A SPECIFIC PROJECT
    getAllDonorDonatedWithinAProject: async (project_id) => {
        const query = `SELECT DISTINCT d.d_id , d.d_name , d.d_city , d.d_phone , d.d_email
        FROM donation dn
        JOIN donor d ON dn.d_id = d.d_id
        WHERE dn.project_id = $1`;
        const result = await pool.query(query, [project_id]);
        return result.rows[0];
    },

    //8 GET ALL VOLUNTEER ASSIGNED IN a SPECIFIC PROJECT
    getAllVolunteerAssignedWithinAProject: async (project_id) => {
        const query = `SELECT v_id , project_id , m_id , date_of_assign
        FROM volunteerassignment
        WHERE project_id = $1`;
        const result = await pool.query(query, [project_id]);
        return result.rows[0];
    },

    //9 GET ALL THE DONATION DONE BY A DONOR
    getAllDonationDoneByADonor: async (d_id) => {
        const query = `SELECT transaction_id  , d_id , project_id , payment_type , date , time
        FROM donation
        WHERE d_id = $1
        ORDER BY date DESC, time DESC`;
        const result = await pool.query(query, [d_id]);
        return result.rows[0];
    },

    //10 ADD OR CREATE A NEW PROJECT 
    addProject: async (projectData) => {
        const { project_name, project_id, m_id } = projectData;
        const values = [project_name, project_id, m_id];
        const query = `INSERT into project
        (project_name , project_id , m_id)
        VALUES ( $1 , $2 , $3) RETURNING *`;
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    //11 TOTAL AMOUNT DONATED BY A DONOR WITHIN 2 SPECIFIC DATES
    getTotalAmountDonatedInAnInterval: async (d_id, start_date, end_date) => {
        const query = `SELECT d_id , SUM(amount) AS total_amount
        FROM donation
        WHERE d_id = $1
        AND date BETWEEN $2 AND $3
        GROUP BY d_id`;
        const result = await pool.query(query, [d_id, start_date, end_date]);
        return result.rows[0];
    },

    //14 TOTAL AMOUNT DONATED FOR A SPECIFIC PROJECT
    getTotalAmountDonatedForAProject: async (project_id) => {
        const query = `SELECT project_id , SUM(amount) AS total_amount
        FROM donation
        WHERE project_id = $1
        GROUP BY project_id`;
        const result = await pool.query(query, project_id);
        return result.rows[0];
    },

    //15 -- Get Volunteer Assignment Data for Each Project
    getAssignVolunteersForAProject: async (project_id) => {
        const query = `SELECT project.project_name, volunteer.v_name, volunteerassignment.date_of_assign
        FROM volunteerassignment
        JOIN project ON volunteerassignment.project_id = project.project_id 
        JOIN volunteer ON volunteerassignment.v_id = volunteer.v_id
        WHERE volunteerassignment.project_id = $1`;
        const result = await pool.query(query , [project_id]);
        return result.rows;
    },

    //16 -- Get Total Number of Donations for Each Project
    getTotalNoOfDonationForAProject: async(project_id) => {
        const query = `SELECT project.project_name, COUNT(donation.transaction_id) AS Total_Donations
        FROM donation
        JOIN project ON donation.project_id = project.project_id
        WHERE donation.project_id = $1
        GROUP BY project.project_name`;
        const result = await pool.query(query , [project_id]);
        return result.rows;
    },

    //17 -- Get Total Funds Invested by Each Manager
    getTotalFundInvestedByAManager: async(m_id) => {
        const query = `SELECT manager.m_name, SUM(fundinvestment.retrieval_amount) AS Total_Invested
        FROM fundinvestment
        JOIN manager ON fundinvestment.m_id = manager.m_id
        WHERE fundinvestment.m_id = $1
        GROUP BY manager.m_name`;
        const result = await pool.query(query , [m_id]);
        return result.rows;
    },

    //18 --updating a donation with given id
    updateDonationByID: async(transaction_id , new_amount) => {
       const query = `UPDATE donations
       SET amount = new_amount,                    
       WHERE donation_id = target_donation_id`;
       const result = await pool.query(query , [transaction_id , new_amount] );
       return result.rows;
    },

    getAllProject: async () => {
        const query = `SELECT * FROM project`;
        const result = await pool.query(query);
        return result.rows;
    },

    //2
    getProjectById: async (project_id) => {
        const query = `SELECT * FROM project WHERE project_id = $1`;
        const result = await pool.query(query, [project_id]);
        return result.rows[0];
    },

    //12
    addProject: async (projectData) => {
        const { project_id, project_name , m_id } = projectData;
        const query = `INSERT INTO donor ( project_id, project_name , m_id)
            VALUES ($1, $2, $3) RETURNING *`;
        const values = [ project_id, project_name , m_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getProjectByVolunteer: async (V_ID) => {
        const query = `SELECT  p.Project_ID,p.Project_name,va.Date_of_assign,va.Date_of_completion
            FROM 
            VolunteerAssignment va
            JOIN 
            Project p ON va.Project_ID = p.Project_ID
            WHERE 
            va.V_ID = $1`;
        const result = await pool.query(query, [V_ID]);
        return result.rows;
        
    }
}

module.exports = Manager;