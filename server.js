const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./models/connectionDB");
const route = require("./routes/v1");

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

//Connect Database
connectDB.connectDB();

//Route
app.use("/v1",route);

app.listen(8000, ()=>{
    console.log("Sever is now listening at port 8000");
})






