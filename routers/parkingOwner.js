const express = require('express');

const ParkingOwner = require('../models/parkingOwner');

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post( '/register' , ( req , res )=>{

    let data= req.body;
    let adm = new ParkingOwner(data);

    let salt = bcrypt.genSaltSync(10);
    let cyptedPass = bcrypt.hashSync(data.pwd , salt);

    adm.pwd =cyptedPass;
    adm.save()
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

    ParkingOwner.findOne({ email:data.email})
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
    cat = new ParkingOwner(data);
    cat.save()
        .then(
            (savedcat)=>{
                res.send(savedcat)
            }
        )
        .catch(
            (err)=>{
                res.send(err) 
                console.log(err);

            }
    ) 
});


router.get('/all', (req,res)=>{
    ParkingOwner.find()
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

router.get('/getById/:id', (req,res)=>{
    let myId = req.params.id;

    ParkingOwner.findById({ _id : myId})

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

router.put('/update/:id', (req,res)=>{
    
    myId = req.params.id;

    let newData = req.body;

    ParkingOwner.findByIdAndUpdate({_id : myId} , newData)
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

    ParkingOwner.findByIdAndDelete({ _id: myId})
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