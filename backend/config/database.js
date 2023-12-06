const mongoose = require('mongoose');
require("dotenv").config();


exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    } )
    .then(()=>{
        console.log("sucessfully connected")

    })
    .catch((error)=>{
        console.log("error connecting")
        console.log(error.message)
        process.exit(1)
    })
 }
 
