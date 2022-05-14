const { verifyToken, verifyTokenAndAuth } = require('./verfyToken');


const router = require('express').Router();

//update user
router.put("/:id", verifyTokenAndAuth , async (req, res) => {
   if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString();
   }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id , {
            $set:req.body,
        }
        , {new: true});
         console.log(updatedUser)

        res.status(200).json(updatedUser);

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router; 