const mongoose = require('mongoose');

const bookingFormSchema = new mongoose.Schema({
  bookingdetails: {
    bookingtype: {
      type: String,
      required: true
    },
    eventtype: {
      type: String,
      required: true
    },
    hallname: {
      type: String,
      required: true
    },
    noofguest: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    timefrom: {
      type: String,
      required: true
    },
    timeto: {
      type: String,
      required: true
    },
    interestservice: {
      type: String,
      required: true
    },
    otherinformation: {
      type: String
    },
    describeEvent: {
      type: String
    },
    additionalServices: {
      type: String
    }
  },

  contactdetails: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    streetaddress: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneno: {
      type: Number,
      required: true
    }
  },

  user: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  bookingStatus: {
    type: String,
    default: 'Pending'
  },

  role: {
    type: String
  },

  selectedItems: [
    {
      id: { type: Number },
      name: { type: String },
      value: { type: Number }
    }
  ],

  totalQuotes: {
    type: Number,
    default: 0
  },

  discountCode: {
    type: String
  },

  discountApplied: {
    type: Boolean,
    default: false
  },

  totalPayment: {
    type: Number,
    default: 0
  },

  hallPayment: {
    type: Number,
    default: 0
  },
  paymentStatus:{
    type:Number
  },

  quotesDetails: {
    bookingNotes: {
      type: String
    }
  },

  statusUpdate: {
    statusChangeNotes: {
      type: String
    },
    boundStatus: {
      type: String
    },
    reasonForRefund: {
      type: String
    },
    bookingStatusUpdate: {
      type: String
    }
  },

  remarks: {
    type: String
  }

});

let BookingForm = mongoose.model('bookingform', bookingFormSchema);
module.exports = BookingForm;
