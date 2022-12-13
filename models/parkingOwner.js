const mongoose = require('mongoose');

const ParkingOwner = mongoose.model('ParkingOwner', {
    name : String,
    email: String,
    pwd:String,
    
    IsAdmin: Boolean,
    parkings:[{}]


})

module.exports = ParkingOwner;