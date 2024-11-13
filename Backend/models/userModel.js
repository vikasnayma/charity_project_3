// const pool = require('../config/dbConnection');

// const User = { 
//      //2
//      getUserByEmail: async (Data,table) => {
//         const { email } = Data;
//         const query = `SELECT * FROM ${table} WHERE email = $1`;
//         const result = await pool.query(query, [email]);
//         return result.rows[0];
//     },

//     //12
//     createUser: async (Data , table) => {
//         const { name, city, phone, email, password } = Data;
//         console.log("data" , Data);
//         const query = `INSERT INTO ${table} (name, city, phone, email, password)
//             VALUES ($1, $2, $3, $4, $5) RETURNING *`;
//         const values = [name, city, phone, email, password];
//         const result = await pool.query(query, values);
//         return result.rows[0];
//     },
// }

// module.exports = User ;