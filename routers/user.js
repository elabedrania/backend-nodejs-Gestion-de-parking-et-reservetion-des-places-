const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/add', (req, res)=>{
    data = req.body;
    prod = new User(data);
    prod.save()
        .then(
            (savedcat)=>{
                res.send(savedcat)
            }
        )
        .catch(
            (err)=>{
                res.send(err) 
            }
    ) 
});


router.get('/all', (req,res)=>{
    User.find()
    .then(
        (result)=>{
            res.send(result);
        }
    )
    .catch(
        (err)=>{
            res.send(err.res.data);
        }
    )
})


router.put('/update/:id', (req,res)=>{
    
    myId = req.params.id;

    let newData = req.body;

    User.findByIdAndUpdate({_id : myId} , newData)
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})


router.delete('/delete/:id', (req,res)=>{
    let myId = req.params.id;

    User.findByIdAndDelete({ _id: myId})
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})


module.exports = router;