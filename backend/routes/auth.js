const  { register, login, location, getLocation } = require("../controllers/auth")


const express = require('express');
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/location",location)
router.get("/get/location",getLocation)


module.exports = router;
