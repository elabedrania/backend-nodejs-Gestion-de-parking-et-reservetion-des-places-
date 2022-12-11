const express = require('express');

const cors = require('cors');






require('./config/connect');

const parkingRoute = require('./routers/parking');
const parkingOwnerRoute = require('./routers/parkingOwner');
const userRoute = require('./routers/user');
const emplacementRoute = require('./routers/emplacement');


const app = express();
app.use(express.json());
app.use(cors());


app.use('/parking', parkingRoute);
app.use('/parkingOwner', parkingOwnerRoute);
app.use('/user', userRoute);
app.use('/emplacement', emplacementRoute);

app.listen(3000, ()=>{

    console.log("server start :D");

});