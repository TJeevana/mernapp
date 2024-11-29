const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({

    hall : {
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        }
    } 
})

let Price = mongoose.model('price',priceSchema)
module.exports= Price;