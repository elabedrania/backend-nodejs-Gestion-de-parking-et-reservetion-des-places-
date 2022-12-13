const mongoose = require('mongoose');

const ParkingOwner = mongoose.model('ParkingOwner', {
    name : String,
    email: String,
    pwd:String,
    
    IsAdmin: Boolean,
    parkings:[{type: mongoose.Schema.Types.ObjectId,
    ref: 'Parking'}]


})

module.exports = ParkingOwner;