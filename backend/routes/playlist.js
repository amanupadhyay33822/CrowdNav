const express = require('express');
const { createPlaylist, getPlaylistById, getPlaylistByArtistId, addSongToPlaylist } = require('../controllers/playlist');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router()

router.post("/create/playlist",isAuthenticated,createPlaylist)
router.get("/getplaylist/:playlistId",isAuthenticated,getPlaylistById)
router.get("/getplaylistbyArtistId/:artistId",isAuthenticated,getPlaylistByArtistId)
router.post("/add/song",isAuthenticated,addSongToPlaylist);


module.exports = router;