const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    email: String,
    pwd: String,
    
})


module.exports = User;