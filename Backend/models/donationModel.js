const pool = require('../config/dbConnection');

const Donation = {

    //ADD DONATION
    addDonation: async(donationData) => {
        const { transaction_id , d_id , date , time , amount , project_id , payment_type } = donationData;
        const query =  `INSERT INTO donation (transaction_id , d_id , date , time , amount , project_id , payment_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [ transaction_id , d_id , date , time , amount , project_id , payment_type ];
        const result = await pool.query(query , values);
        return result.rows[0];
    },
    //GET ALL DONATION
    getDonation: async() => {
        const query = `SELECT * FROM donation`;
        const result = await pool.query(query);
        return result.rows;
    },

    //GET DONATION BY ID
    getDonationById: async(transaction_id) => {
        const query = `SELECT * FROM donation WHERE transaction_id = $1`;
        const result = await pool.query(query , [transaction_id]);
        return result.rows[0];
    }
     
}

module.exports = Donation;