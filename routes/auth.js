const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//register

router.post('/register', async(req, res) => {
    const newUser = new User({
     username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString()
        
    });
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
   
});

//login
router.post("/login") ,async (req, res) => {
    
}



module.exports = router;



