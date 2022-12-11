const express = require('express');
const Emplacement = require('../models/emplacement');

const router = express.Router();

router.post('/add', (req, res)=>{
    data = req.body;
    prod = new Emplacement(data);
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

    Emplacement.aggregate(
        [
        
            {
                $lookup:{
                    from:'parkings',
                    localField:'idP',
                    foreignField:'_id',
                    as:'park'
                }
            }


        ]
    )
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


router.get('/getById/:id', (req, res)=>{
    let myId = req.params.id;

    Emplacement.findById({ _id: myId})
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
});


router.put('/update/:id', (req,res)=>{
    
    myId = req.params.id;

    let newData = req.body;

    Emplacement.findByIdAndUpdate({_id : myId} , newData)
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

router.put('/reserver/:id', async(req, res)=>{
        const id = req.params.id;
        await Emplacement.findOneAndUpdate({_id: id}, {state: true})
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

    Emplacement.findByIdAndDelete({ _id: myId})
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