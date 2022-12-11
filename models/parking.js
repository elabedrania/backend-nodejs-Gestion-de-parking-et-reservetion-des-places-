const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectId;
const Parking = mongoose.model('Parking', {
    name : String,
    address: String,
    nb:{
        type: String,
        default : 50
    },
    idO : objectId
})


module.exports = Parking;