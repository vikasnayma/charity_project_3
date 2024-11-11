require("dotenv").config();
require('./config/dbConnection');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRoutes');
const allRouter = require('./routes/allroutes');

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend URL
    credentials: true
}));

const PORT = 9000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api' , userRouter);
app.use('/api' , allRouter);

//error handling
app.use((err , req , res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({message : err.message});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });





