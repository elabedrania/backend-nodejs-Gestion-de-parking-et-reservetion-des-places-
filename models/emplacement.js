const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectId;
const Emplacement = mongoose.model('Emplacement', {
    name : {
        type: String
    },
    state:{
        type: Boolean,
        default: false
    },
    idP : objectId
})

module.exports = Emplacement;