const Cart = require("../models/Cart");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,

} = require("./verifyToken");

const router = require("express").Router();

//CREATE CART

router.post ("/", verifyToken,async(req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }

    
});

//UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Cart

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
         await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Cart has been cleared"});
    }catch(err){
        res.status(500).json(err);

    }
});

//GET USER CART
router.get("/find/:userId",  verifyTokenAndAuthorization, async (req, res) => {
    try{
         const Cart = await Cart.findOne({userId: req.params.userId});
         
            res.status(200).json(Cart);
    }catch(err){
        res.status(500).json(err);

    }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
      res.status(200).json(err);
    }

});


module.exports = router;