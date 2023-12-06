const Song = require("../models/Song")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.createSong = async (req, res) => {
  try {
    //fetch data
    const { name , thumbnail,track } = req.body;

    //validation
    if (!name || !thumbnail || !track) {
      return res.status(400).json({
        sucess: false,
        message: "Fill all the details ",
      });
    }

    
    const artist = req.user._id;
    const songDetails = {name, thumbnail, track,artist}
    const createSong = await Song.create(songDetails)

  
    res.status(201).json({
      sucess: true,
      createSong,
    });

  } catch (err) {
    return res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};

exports.getSongsByArtist = async (req, res) => {
    try {
      //fetch current user
       const artistId= req.params.id;
       const songs = await Song.find( {artist:artistId})
       

      
    

      
  
      //validation
      if (!songs) {
        return res.status(400).json({
          sucess: false,
          message: "no songs found",
        });
      }
  
      
  
    
     return res.status(201).json({
        sucess: true,
        songs,
      });
  
    } catch (err) {
      return res.status(400).json({
        sucess: false,
        message: err.message,
      });
    }
  };
  
  exports.getMySongs = async (req, res) => {
    try {
      //fetch current user
       

      //check logined user is artist or not 
      const songs = await Song.find({ artist:req.user._id})

      
  
      //validation
      if (!songs) {
        return res.status(400).json({
          sucess: false,
          message: "no songs found",
        });
      }
  
      
  
    
     return res.status(201).json({
        sucess: true,
        songs,
      });
  
    } catch (err) {
      return res.status(400).json({
        sucess: false,
        message: err.message,
      });
    }
  };


  exports.getSongsByName = async (req, res) => {
    try {
      //fetch current user
       const Name= req.body.name;
       const songs = await Song.find({name: Name});       
      
      
    

      
  
      //validation
      if (songs.length == 0) {
        return res.status(400).json({
          sucess: false,
          message: "no songs found",
        });
      }
  
      
  
    
     return res.status(201).json({
        sucess: true,
        songs,
      });
  
    } catch (err) {
      return res.status(400).json({
        sucess: false,
        message: err.message,
      });
    }
  };
