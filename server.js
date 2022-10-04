const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./models/connectionDB");

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

connectDB();

app.listen(8000, ()=>{
    console.log("Sever is now listening at port 8000");
})

app.get('/', (req, res)=>{
    res.send('HELLO MOI NGUOI')
    client.end;
})





