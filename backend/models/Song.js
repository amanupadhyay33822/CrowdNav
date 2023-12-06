const mongoose = require('mongoose')    


const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
  
    thumbnail:{
        type:String,
        required:true,
        
    },
    //audio file url
    track:{
        type:String,
        required:true,
    },
 
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
})

module.exports = mongoose.model("Song",songSchema);