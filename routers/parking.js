const express = require('express');
const Parking = require('../models/parking');
const ParkingOwner = require('../models/parkingOwner');

const router = express.Router();


router.post('/add', (req,res)=>{

    let data = req.body;
    let dep = new Parking(data);
    dep.save()

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

// router.get('/all', (req,res)=>{
    
//     Parking.find()
//         .then(
//             (result)=>{
//                 res.send(result);
//             }
//         )
//         .catch(
//             (err)=>{
//                 res.send(err);
//             }
//         )
// })
router.get('/all', (req,res)=>{

   Parking.aggregate(
      [
        
           {
                 $lookup:{
                     from:'parkingowners',
                     localField:'idO',
                     foreignField:'_id',
                     as:'owner'
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

    Parking.findById({ _id: myId})
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

    Parking.findByIdAndUpdate({_id : myId}, newData)
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

router.delete('/delete/:id', (req,res)=>{
    let myId = req.params.id;

    Parking.findByIdAndDelete({_id: myId})
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

router.get('/count', (req, res)=>{

})


module.exports = router;