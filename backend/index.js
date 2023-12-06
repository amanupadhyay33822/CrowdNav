const express = require('express');
const { connect } = require("./config/database")
const cors = require('cors');
const app = express();
require("dotenv").config();

const port = 3000 || process.env.PORT
connect()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const allowedOrigins = ['http://localhost:5173']; // Add more origins as needed
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);
const user = require("./routes/auth");
const song = require("./routes/song");
const playlist = require("./routes/playlist");
app.use("/api/v1",user)
// app.use("/api/v1",song)
// app.use("/api/v1",playlist)
app.get("/",(req,res)={
    res.json("hello");
})
app.listen(port, ()=> {
    console.log(`listening on ${port}`)
})
