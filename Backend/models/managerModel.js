const pool = require('../config/dbConnection');

const Manager = {
    //1
    getAllDonor: async() => {
        const query = `SELECT * FROM donor`;
        const  result = await pool.query(query);
        return result.rows;
    },

    //2
    getDonorById: async(d_id) => {
        const query = `SELECT * FROM donor WHERE d_id = $1`;
        const result = await pool.query(query , [d_id]);
        return result.rows[0];
    },

    //12
    addDonor: async(donorData)=> {
        const { d_id , d_name , d_city , d_phone , d_email , d_password  } = donorData;
        const query = `INSERT INTO donor (d_id , d_name , d_city , d_phone , d_email , d_password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [ d_id , d_name , d_city , d_phone , d_email , d_password ];
        const result = await pool.query(query , values);
        return result.rows[0];
    },

    //3
    getAllVolunteer: async() => {
        const query = `SELECT * FROM volunteer`;
        const  result = await pool.query(query);
        return result.rows;
    },

    getVolunteerById: async(v_id) => {
        const query = `SELECT * FROM volunteer WHERE v_id = $1`;
        const result = await pool.query(query , [v_id]);
        return result.rows[0];
    },

    //13 
    addVolunteer: async(volunteerData) => {
        const { v_id , v_name , v_city , v_phone , v_email , v_password  } = volunteerData;
        const query = `INSERT INTO volunteer (v_id , v_name , v_city , v_phone , v_email , v_password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [ v_id , v_name , v_city , v_phone , v_email , v_password ];
        const result = await pool.query(query , values);
        return result.rows[0];
    },
    

     //4 ADD DONATION
    addDonation: async(donationData) => {
        const { transaction_id , d_id , date , time , amount , project_id , payment_type } = donationData;
        const query =  `INSERT INTO donation (transaction_id , d_id , date , time , amount , project_id , payment_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [ transaction_id , d_id , date , time , amount , project_id , payment_type ];
        const result = await pool.query(query , values);
        return result.rows[0];
    },
    //5 GET ALL DONATION
    getDonation: async() => {
        const query = `SELECT * FROM donation`;
        const result = await pool.query(query);
        return result.rows;
    },

    //6 GET DONATION BY ID
    getDonationById: async(transaction_id) => {
        const query = `SELECT * FROM donation WHERE transaction_id = $1`;
        const result = await pool.query(query , [transaction_id]);
        return result.rows[0];
    },

    //7 GET DETAILS OF ALL THE DONOR DONATED WITHIN A SPECIFIC PROJECT
    getAllDonorDonatedWithinAProject: async(project_id) => {
        const query = `SELECT DISTINCT d.d_id , d.d_name , d.d_city , d.d_phone , d.d_email
        FROM donation dn
        JOIN donor d ON dn.d_id = d.d_id
        WHERE dn.project_id = $1`;
        const result = await pool.query(query , [project_id]);
        return result.rows[0];
    },

    //8 GET ALL VOLUNTEER ASSIGNED IN a SPECIFIC PROJECT
    getAllVolunteerAssignedWithinAProject: async(project_id) => {
        const query = `SELECT v_id , project_id , m_id , date_of_assign
        FROM volunteerassignment
        WHERE project_id = $1`;
        const result = await pool.query(query , [project_id]);
        return result.rows[0];
    },

    //9 GET ALL THE DONATION DONE BY A DONOR
    getAllDonationDoneByADonor: async(d_id) => {
        const query = `SELECT transaction_id  , d_id , project_id , payment_type , date , time
        FROM donation
        WHERE d_id = $1`;
        const result = await pool.query(query , [d_id]);
        return result.rows[0];
    },

    //10 ADD OR CREATE A NEW PROJECT 
    addProject: async(projectData) => {
        const { project_name , project_id , m_id } = projectData;
        const values = [project_name , project_id , m_id];
        const query = `INSERT into project
        (project_name , project_id , m_id)
        VALUES ( $1 , $2 , $3) RETURNING *`;
        const result = await pool.query(query , values );
        return result.rows[0];
    },

    //11 TOTAL AMOUNT DONATED BY A DONOR WITHIN 2 SPECIFIC DATES
    getTotalAmountDonatedInAnInterval: async(d_id , start_date , end_date) => {
        const query = `SELECT d_id , SUM(amount) AS total_amount
        FROM donation
        WHERE d_id = $1
        AND date BETWEEN $2 AND $3
        GROUP BY d_id`;
        const result = await pool.query(query , [d_id , start_date , end_date]);
        return result.rows[0];
    },

    //12 TOTAL AMOUNT DONATED FOR A SPECIFIC PROJECT
    getTotalAmountDonatedForAProject: async(project_id) => {
        const query = `SELECT project_id , SUM(amount) AS total_amount
        FROM donation
        WHERE project_id = $1
        GROUP BY project_id`;
        const result = await pool.query(query ,project_id );
        return result.rows[0];
    }
}

module.exports = Manager;