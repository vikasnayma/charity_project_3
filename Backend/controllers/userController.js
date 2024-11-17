const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/dbConnection');
const { JWT_SECRET } = process.env;

// Function to get table name based on user type
const getTableName = (userType) => {
    switch (userType) {
        case 'donor': return 'donor';
        case 'volunteer': return 'volunteer';
        case 'manager': return 'manager';
        default: throw new Error("Invalid user type");
    }
};

//REGISTER 
const register = (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  
    const { name, email ,city , phone , password, userType } = req.body;
    const tableName = getTableName(userType);

    // Query to check if the user already exists
    const checkUserQuery = `SELECT * FROM ${tableName} WHERE LOWER(email) = LOWER($1)`;

    pool.query(checkUserQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Database error' });
        }

        if (result.rows.length > 0) {
            return res.status(409).send({ msg: 'User is already in use' });
        } else {

            // Hash the password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(400).send({ msg: err });
                } else {
                    // Query to insert the new user
                    const insertUserQuery = `
                            INSERT INTO  ${tableName} (name, email, city , phone , password)
                            VALUES ($1, $2, $3 , $4 , $5)
                        `;

                    pool.query(insertUserQuery, [name, email, city , phone, hash], (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send({ msg: err });
                        }
                        return res.status(201).send({
                            msg: 'The user has been registered successfully.',
                        });
                    });
                }
            });
        }
    });
}

//LOGIN
const login = (req, res) => {
    const errors = validationResult(req);
    
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userType } = req.body;
    const tableName = getTableName(userType);

    const checkUserQuery = `SELECT * FROM  ${tableName} WHERE LOWER(email) = LOWER($1)`;

    pool.query(checkUserQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Database error' });
        }
        if (result.rows.length === 0) {
            console.log(result);
            return res.status(409).send({
                msg: "email or password is incorrect"
            });
        }
        const user = result.rows[0];
        bcrypt.compare(password , user.password, (bErr, bResult) => {
            if (bErr) {
                return res.status(400).send({
                    msg: bErr
                });
            }
            if (bResult) {
                const token = jwt.sign({ id: user.email }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).send({
                    msg: 'Logged In Successfully',
                    token,
                    user
                });
            }
            return res.status(401).send({
                msg: "email or password is incorrect"
            });
        });
    }
    )
};

const getUser = (req , res) => {
    const authToken = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(authToken , JWT_SECRET);
    const tableName = getTableName(decode.userType);

    const checkUserQuery = `SELECT * FROM ${tableName} WHERE id = $1`;
    pool.query(checkUserQuery , [decode.id] , function(err , result , fields){
        if(err) throw err;
        return res.status(200).send({ success: true , data: result.rows[0] , message: 'User Fetched Successfully'});
    });
}
module.exports = {
    register,
    login,
    getUser
}





// const userController = {
//   signup: (req, res) => {
//     const { email, name, phone, password , city , userType } = req.body;
//     const table = getTableName(userType);
//     bcrypt.hash(password, 10, (err, hash) => {
//       if (err) {
//         console.error('Error hashing password:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }

//       User.createUser(email, name, phone, password , city , table ,  (err, result) => {
//         if (err) {
//           console.error('Error executing query:', err);
//           return res.status(500).json({ error: 'Internal server error' });
//         }
//         res.status(201).json({ message: 'User registered successfully' });
//       });
//     });
//   },

//   login: (req, res) => {
//     const { email, password , userType } = req.body;
//     const table = getTableName(userType); 
//     User.getUserByEmail(email ,  table , (err, result) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
//       console.log(result.rows);
      

//       if (result.rows.length === 0) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//       }

//       const user = result.rows[0];
      
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         console.log(password);
//         console.log(user.password);
        
        
//         if (err) {
//           console.error('Error comparing passwords:', err);
//           return res.status(500).json({ error: 'Internal server error' });
//         }
        
//         if (!isMatch) {
//           return res.status(401).json({ error: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ userId: user.userid }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//       });
//     });
//   }
// };

// module.exports = userController;