const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const User = require("../models/Location");

exports.createPlaylist = async (req, res, next) => {
  try {
    //fetch  data
    const { thumbnail, name, songs } = req.body;
    if (!thumbnail || !songs || !name) {
      return res.status(400).json({
        sucess: false,
        message: "Fill all the details ",
      });
    }

    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: req.user._id,
      collaborator: [],
    };
    const playlist = await Playlist.create(playlistData);
    res.status(201).json({
      sucess: true,
      playlist,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(400).json({
        sucess: false,
        message: "Playlist not found",
      });
    }
    res.status(201).json({
      sucess: true,
      playlist,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.getPlaylistByArtistId = async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(400).json({
        sucess: false,
        message: "artist not found",
      });
    }
    const playlist = await Playlist.find({ owner: artistId });

    res.status(201).json({
      sucess: true,
      playlist,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    console.log();
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(400).json({
        sucess: false,
        message: "playlist not found",
      });
    }
    // console.log(playlist.owner === req.user._id)
    //check if current user is owner of playlist or collaborator of playlist
    if (
      !playlist.owner.equals(req.user._id) &&
      !playlist.collaborators.includes(req.user._id)
    ) {
      return res.status(400).json({
        sucess: false,
        message: "not allowed",
      });
    }
    //check song is valid or not
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(400).json({
        sucess: false,
        message: "song not found",
      });
    }
    //add song now
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(201).json({
      sucess: true,
      message: "song added successfully",
      playlist,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};
