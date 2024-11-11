const isAuthorize = async (req, res, next) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(409).json({ msg: 'Please provide token' });
        }
        // console.log(token);
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isAuthorize
}

// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;

// const authenticateToken = (req, res, next) => {
  
//    const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];  //not needed on postman
   
//     // const token = authHeader;
//   //  console.log("auth",authHeader);


//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, JWT_SECRET , (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;