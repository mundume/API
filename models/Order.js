const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema('Cart', {

        userId: {
            type: String,
            required: true
        },
        products: [{ 
          productId: {
            type: String,  
          },
            quantity: {
                type: Number,
                default: 1,
            }

        }],
        amount: {
            type: Number,
            required: true

        },

        adress: {
            type:Object, required: true
        },

        status:{
            type: String,
            required: true,
            default: 'pending',
        }

    } , { timestamps: true });

    module.exports = mongoose.model('Order', OrderSchema);
