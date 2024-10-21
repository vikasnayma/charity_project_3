const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/dbConnection');
const { JWT_SECRET } = process.env;


const register = (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Query to check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE LOWER(email) = LOWER($1);'

    pool.query(checkUserQuery, [req.body.email], (err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Database error' });
        }

        if (result.rows.length > 0) {
            return res.status(409).send({ msg: 'User is already in use' });
        } else {
            // Hash the password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {

                    return res.status(400).send({ msg: err });
                } else {
                    // Query to insert the new user
                    const insertUserQuery = `
                            INSERT INTO users (name, email, password)
                            VALUES ($1, $2, $3)
                        `;

                    pool.query(insertUserQuery, [req.body.name, req.body.email, hash], (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send({ msg: err });
                        }

                        return res.status(201).send({
                            msg: 'The user has been registered.',
                        });
                    });
                }
            });
        }
    });
}

const login = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE LOWER(email) = LOWER($1);';

    pool.query(checkUserQuery, [req.body.email], (err, result) => {
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
        bcrypt.compare(req.body.password , user.password, (bErr, bResult) => {
            if (bErr) {
                return res.status(400).send({
                    msg: bErr
                });
            }
            if (bResult) {
                const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).send({
                    msg: 'Logged In',
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

    const checkUserQuery = `SELECT * FROM users WHERE id=$1;`;
    pool.query(checkUserQuery , [decode.id] , function(err , result , fields){
        if(err) throw err;
        return res.status(200).send({ success: true , data: result.rows[0] , message: 'Fetched Successfully'});
    });
}

module.exports = {
    register,
    login,
    getUser
}