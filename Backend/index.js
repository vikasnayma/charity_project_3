require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require('body-parser');


const userRouter = require('./routes/userRoutes');
const allRouter = require('./routes/allroutes');

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',  // Allow only requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

const PORT = 9000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api/auth' , userRouter);
app.use('/api' , allRouter);

//error handling
// app.use((err , req , res , next) =>{
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";
//     res.status(err.statusCode).json({message : err.message});
// });


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
//                 req.userId = decoded.id;
//                 req.userRole = decoded.role;
//                 // req.name = decoded.name
//                 next();
//             }
//         })
//     }
// }

// app.get("/", verifyUser, (req,res)=>{

//     return res.json({Status: "Success", userId: req.userId, role: req.userRole})
//     // return res.json({Status: "Success", name: req.name})
//     // res.send(`Hello this is backend ${PORT}`)
// })


// app.post("/signup", (req,res)=>{
//     const role = req.body.role;
//     console.log(role)
   
//     const q =  `INSERT INTO ${role} (name, city, phone, email, password) VALUES ($1 ,$2 ,$3,$4,$5)`;
//     const values = [
//        req.body.name,
//        req.body.city,
//        req.body.phone,
//        req.body.email,
//        req.body.password
//     ]
//     console.log(values);

//     pool.query(q, [values], (err, data)=>{
//          if(data) return res.json(data);
//          return res.json(err)
//     })
    
// })


// app.post("/login", (req,res)=>{
    
//     const role = req.body.role;
//     console.log(role)
//         const q = `SELECT * FROM ${role} WHERE email = $1 AND password = $2`;

//         pool.query(q, [req.body.email, req.body.password], (err, data)=>{
//         if(err) {
//             return res.json("Error");
//         }
//         if(data.length > 0) {
//             const token = jwt.sign({id: data[0].ID, role}, JWT_SECRET, {expiresIn: '1d'});
//             console.log(token);
//             res.cookie('token', token);
//             console.log(data)
//             return res.json({Status: "Success", role, id: data[0].ID});

//         }
//         else {
//             return res.json({Message: "No record exist"});
//         }
//     })
    
    
// })

// app.get('/logout', (req,res)=> {
//     res.clearCookie('token');
//     return res.json({Status: "Success"})
// })



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

