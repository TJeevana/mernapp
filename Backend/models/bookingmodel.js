// const mongoose = require('mongoose');

// const bookingSchema = mongoose.Schema({
   
//     bookingdetails: {
//             bookingtype: {
//                 type: String,
//                 required: true
//             },
    
//             eventtype: {
//                 type: String,
//                 required: true
//             },
    
//             hallname: {
//                 type: String,
//                 required: true
//             },
    
//             noofguest: {
//                 type: Number,
//                 required: true
//             },
        
//             date: {
//                 type: Date,
//                 required: true
//             },
        
//             timefrom: {
//                 type: String,
//                 required: true
//             },
        
//             timeto: {
//                 type: String,
//                 required: true
//             },
    
//             interestservice: {
//                 type: String,
//                 required: true
//             },
        
//             otherinformation: {
//                 type: String,
//                 // optional field
//             }
//         },
//         contactdetails: {
//             firstname: {
//                 type: String,
//                 required: true
//             },
    
//             lastname: {
//                 type: String,
//                 required: true
//             },
    
//             streetaddress: {
//                 type: String,
//                 required: true
//             },
    
//             state: {
//                 type: String,
//                 required: true
//             },
    
//             city: {
//                 type: String,
//                 required: true
//             },
    
//             postcode: {
//                 type: String,
//                 required: true
//             },
    
//             country: {
//                 type: String,
//                 required: true
//             },
    
//             email: {
//                 type: String,
//                 required: true
//             },
    
//             phoneno: {
//                 type: Number,
//                 required: true
//             }
//         },
//     user: {
//         type: mongoose.SchemaTypes.ObjectId,
//         required: true,
//         ref: 'User'
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     paymentInfo: {
//         id: {
//             type: String,
//             required: true
//         },
//         status: {
//             type: String,
//             required: true
//         }
//     },
//     paidAt: {
//         type: Date
//     },
//     bookingStatus: {
//         type: String,
//         required: true,
//         default: 'Processing'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// })

// let bookingModel = mongoose.model('Booking', bookingSchema);

// module.exports = bookingModel;