const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ala:ala@cluster0.tcu3a.mongodb.net/?retryWrites=true&w=majority')
        .then(
            ()=>{
                console.log('Connected');
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )


module.exports = mongoose ;
