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

router.get('/all', (req,res)=>{
    Parking.find()
    // .populate('idO')
    .populate(['place','idO'])
    .exec((err , result) => {
        if (err)  return res.status(400).json(err);
        else {
            return res.status(200).json(result)
        }
    })
    
})

// router.post('/addById/:id', (req,res)=>{
//     let data = req.params.id;
//     let dep = new Parking(data);
//     dep.save()

//     .then(
//         (result)=>{
//             res.send(result);
//         }
//     )
//     .catch(
//         (err)=>{
//             res.send(err);
//         }
//     )
// })

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
//  router.get('/all', async(req,res)=>{
//     let parking = await
//     // Parking.aggregate(
//     //    [
        
//     //         {
//     //               $lookup:{
//     //                   from:'parkingowners',
//     //                   localField:'idO',
//     //                   foreignField:'_id',
//     //                   as:'owner'
//     //               },
                  
//     //                 $unwind: {
//     //                    path:"place",
//     //                    preserveNullAndEmptyArrays:true 
//     //                 }
                 
//     //           }
             


//     //       ]
   
//     //  )
//      await Parking.populate(parking, {path: 'place'})
//       .then(

//           (result)=>{
              
//               res.send(result);
//           }
//       )
//       .catch(
//           (err)=>{
//               res.send(err);
//           }
//       )

    
//   })
// router.get('/all', (req,res)=>{

//     Parking.aggregate(
//         [
        
//             {
//                 $lookup:{
//                     from:'emplacements',
//                     localField:'idE',
//                     foreignField:'_id',
//                     as:'emp'
//                 }
//             }                                                                                       


//         ]
//     )
//     .then(
//         (result)=>{
           
//             res.send(result);
//         }
//     )
//     .catch(
//         (err)=>{
//             res.send(err);
//         }
//     )

    
// })



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




module.exports = router;