//Backend/models/hallmodel.js
const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({

    name :{
        type : String,
        required : [true,"please enter hallname"],
        trim : true,
        maxLength : [50,"hall name connot exceed 50 charactors" ]
    },
    capacity:{
        type : Number,
        required : [true,"please enter capacity of hall"],
        trim : true,
        maxLength : [4,"hall name connot exceed 50 charactors" ]
    },
    details:{
        type : String,
        required : [true,"please enter other details"],
    },
     numOfReviews: {
        type: Number,
        default: 0
    },
    ratings: {
        type: String,
        default: 0
    },

    reviews:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',  
                required: true
            },
             
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }

        }
     ]  
})

let Hall = mongoose.model('hall',hallSchema)
module.exports= Hall;