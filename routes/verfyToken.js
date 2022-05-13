const res = require('express/lib/response');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next)=>{
const authHeader = req.headers.token;
if(authHeader){
    const token = authHeader.split(' ')[1];
   jwt.verify(token, process.env.JWT_SEC,(err, user) =>{
       if(err){
           res.status(500).json("Token is not valid");
           req.user = user
           next();
       }
   })
}else{
    res.status(401).json({message: "Not authorized"});
}
};

const verifyTokenAndAuth = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }else{
            res.status(401).json({message: "Not allowed"});
        }
    });
};



module.exports = {verifyToken, verifyTokenAndAuth};