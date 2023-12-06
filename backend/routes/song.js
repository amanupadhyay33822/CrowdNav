


const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createSong, getMySongs, getSongsByArtist, getSongsByName } = require('../controllers/song');
const router = express.Router()

router.post("/create/song",isAuthenticated,createSong)
router.get("/getmysong",isAuthenticated,getMySongs)
router.get("/getsongbyArtist/:id",isAuthenticated,getSongsByArtist)
router.get("/song/name",isAuthenticated,getSongsByName)


module.exports = router;
