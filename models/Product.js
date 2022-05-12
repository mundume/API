const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true

    },
    price: {
    required: true,
    type: Number
    },
    image: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    
    },
    category: {
        type: Array,
        required: true,
    },

    size:{
        type: String,
        
    },
    color:{
        type: String,
        

    },


    


}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);