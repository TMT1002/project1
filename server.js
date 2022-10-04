const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./models/connectionDB");
const { users, session } = require('./models');


dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

connectDB.connectDB();

app.listen(8000, ()=>{
    console.log("Sever is now listening at port 8000");
})

app.get('/', async (req, res)=>{
    const token = await session.
    create({
        user_id: 22123134,
        refresh_token: "1231dwdedrf23r",
        access_token: "cehwf83"
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });
    res.send('HELLO MOI NGUOI')
});





