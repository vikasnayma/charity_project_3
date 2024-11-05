require("dotenv").config();
require('./config/dbConnection');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRoutes');
const donationRouter = require('./routes/donationRoutes');
const donorRouter = require('./routes/donorRoutes');
const volunteerRouter = require('./routes/volunteerRoutes');

const cors = require('cors');
const PORT = 8900;


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api' , userRouter);
app.use('/api' , donationRouter);
app.use('./api' , donorRouter);
app.use('./api' , volunteerRouter);

//error handling
app.use((err , req , res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({message : err.message});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });