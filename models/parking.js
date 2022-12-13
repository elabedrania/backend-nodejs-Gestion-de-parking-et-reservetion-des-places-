const mongoose = require('mongoose');
const Emplacement = require('./emplacement');
const objectId = require('mongodb').ObjectId;

const Parking = mongoose.model('Parking', {
    name : String,
    address: String,
    nb:{
        type: String,
        default : 50
    },
    idO : mongoose.Schema.ObjectId,
    //place:[{type: mongoose.Schema.ObjectId}]
})


module.exports = Parking;