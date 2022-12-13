const express = require('express');
const User = require('../models/user');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post( '/register' , ( req , res )=>{

    let data= req.body;
    let client = new User(data);

    let salt = bcrypt.genSaltSync(10);
    let cyptedPass = bcrypt.hashSync(data.pwd , salt);

    client.pwd =cyptedPass;
    client.save()
    .then( 

        (result)=>{
        res.status(200).send(result)

        })
    .catch(
        
        (err)=>{
        res.status(400).send(err)
    
    })
})



router.post( '/login'   , ( req , res )=>{

    let data= req.body;

    User.findOne({ email:data.email})
    .then( 

    (result)=>{
    let validPass = bcrypt.compareSync(data.pwd , result.pwd);

    if(validPass ==false){
    res.status(401).send('email or password invalid')
}   
    else{
        let playload = {

            _id : result._id,
            name :result.name,
            email: result.email

        }
        let token= jwt.sign( playload , '123456789');

        res.status(200).send({ mytoken: token});
    }
    }
    )
.catch(
    
    (err)=>{
    res.status(400).send(err)

})



})






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