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

app.use('/api/auth' , userRouter);
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





<<<<<<< HEAD

//   added by shivani
// const jwt = require("jsonwebtoken"); 
// const cookieParser = require('cookie-parser');
// const { JWT_SECRET } = process.env;

// app.put('/donor/update', async (req, res) => {
//     const token = req.cookies.token;

//     try {
//      const decoded = jwt.verify(token, JWT_SECRET); 
//      const D_ID = decoded.id;
//      const { name, city, phone } = req.body;

//       // Update query in the donor table
//       await db.query(
//         'UPDATE donor SET D_name = ?, D_city = ?, D_phone = ? WHERE D_ID = ?',
//         [name, city, phone, D_ID]
//       );
//       res.status(200).send("Donor information updated successfully.");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error updating donor information.");
//     }
//   });
  


//   // added by shivani
//   app.put('/volunteer/update', async (req, res) => {

//     const token = req.cookies.token;
  
//     try {
    
//         const decoded = jwt.verify(token, );
//         const V_ID = decoded.id;

//         const { name, city, phone } = req.body;

//       // Update query in the volunteer table
//       await db.query(
//         'UPDATE volunteer SET V_name = ?, V_city = ?, V_phone = ? WHERE V_ID = ?',
//         [name, city, phone, V_ID]
//       );
//       res.status(200).send("Volunteer information updated successfully.");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error updating volunteer information.");
//     }
//   });



// //   added by shivani
// // Route to get donor information to shoow on dashboard
// app.get("/donorDashboard", (req, res)=>{

//     const token = req.cookies.token;

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const D_ID = decoded.id;


    
//     const q = `SELECT 
//     d.D_name, 
//     d.D_city, 
//     d.D_phone, 
//     d.D_email,
//     GROUP_CONCAT(dn.Date) AS Dates, 
//     GROUP_CONCAT(dn.Time) AS Times, 
//     GROUP_CONCAT(dn.Amount) AS Amounts, 
//     GROUP_CONCAT(dn.Payment_type) AS Payment_Types, 
//     GROUP_CONCAT(p.Project_name) AS Project_Names
// FROM 
//     Donor d
// JOIN 
//     Donation dn ON d.D_ID = dn.D_ID
// JOIN 
//     PROJECT p ON dn.Project_ID = p.Project_ID
// WHERE 
//     d.D_ID = ?
// GROUP BY 
//     d.D_ID;
// `;

//     db.query(q, D_ID, (err, data)=>{
//         if(err) return res.json(err);
//         return res.json(data)
//     })

// } )





// // added by shivani
// // Routes to get Volunter info to show on volunteer dashboard

// app.get("/volunteerDashboard", (req,res)=>{


//     const token = req.cookies.token;

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const V_ID = decoded.id;



//     const q = `SELECT 
//     Volunteer.V_name,
//     Volunteer.V_city,
//     Volunteer.V_phone,
//     Volunteer.V_email,
//     Project.Project_name,
//     VolunteerAssignment.Date_of_assign
// FROM 
//     Volunteer
// JOIN 
//     VolunteerAssignment ON Volunteer.V_ID = VolunteerAssignment.V_ID
// JOIN 
//     Project ON VolunteerAssignment.Project_ID = Project.Project_ID
// WHERE 
//     Volunteer.V_ID = ?
// ORDER BY 
//     VolunteerAssignment.Date_of_assign DESC;`;


    
//     db.query(q, V_ID, (err,data)=>{
//         if(err) return res.json(err);
//         return res.json(data)        
//     })
// })
  


// // added by shivani
// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if( !token ) {
//         return res.json({Message: "we need token please provide it"})
//     }
//     else {
//         jwt.verify(token, JWT_SECRET, (err, decoded) => {
//             if( err ) {
//                 return res.json({Message: "Authentication error"})
//             }
//             else {
//                 next();
//             }
//         })
//     }
// }
// app.get("/auth", verifyUser, (req, res) => {
//     return res.json({Status: "Success"});
// })
// app.get('/logout', (req,res)=> {
//     res.clearCookie('token');
//     return res.json({Status: "Success"})
// })
=======
>>>>>>> b7e2d03c67349d15464da969e8cd51e8fefff1af
