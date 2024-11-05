const pool = require('../config/dbConnection');

const Volunteer = {
    addVolunteer: async(volunteerData) => {
        const { v_id , v_name , v_city , v_phone , v_email , v_password  } = volunteerData;
        const query = `INSERT INTO volunteer (v_id , v_name , v_city , v_phone , v_email , v_password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [ v_id , v_name , v_city , v_phone , v_email , v_password ];
        const result = await pool.query(query , values);
        return result.rows[0];
    },
    
    getAllVolunteer: async() => {
        const query = `SELECT * FROM volunteer`;
        const  result = await pool.query(query);
        return result.rows;
    },

    getVolunteerById: async(v_id) => {
        const query = `SELECT * FROM volunteer WHERE v_id = $1`;
        const result = await pool.query(query , [v_id]);
        return result.rows[0];
    }
}