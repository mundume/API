
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next)=>{
const authHeader = req.headers.token;
if(authHeader){
    const token = authHeader.split(' ')[1]
    if(token){
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err){
                res.status(401).json({message: "Invalid token"});
            }else{
                req.user = user;
                next();
            
        }
        });
    }
    
   
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