const pool = require('../config/dbConnection');

const Donor = {
    addDonor: async(donorData)=> {
        const { d_id , d_name , d_city , d_phone , d_email , d_password  } = donorData;
        const query = `INSERT INTO donor (d_id , d_name , d_city , d_phone , d_email , d_password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [ d_id , d_name , d_city , d_phone , d_email , d_password ];
        const result = await pool.query(query , values);
        return result.rows[0];
    },

    getAllDonor: async() => {
        const query = `SELECT * FROM donor`;
        const  result = await pool.query(query);
        return result.rows;
    },

    getDonorById: async(d_id) => {
        const query = `SELECT * FROM donor WHERE d_id = $1`;
        const result = await pool.query(query , [d_id]);
        return result.rows[0];
    }
}

module.exports = Donor;