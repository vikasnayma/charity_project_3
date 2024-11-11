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
        const { transaction_id, email , date, time, amount, project_id, payment_type } = donationData;
        const query = `INSERT INTO donation (transaction_id , email , date , time , amount , project_id , payment_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [transaction_id, email , date, time, amount, project_id, payment_type];
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
        WHERE email = $1`;
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

    //2
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
}

module.exports = Manager;