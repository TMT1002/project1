const dotenv = require("dotenv");
const cors = require("cors");
const queries = require("./config/queries");
const client = require('./config/connection');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const questionRoute = require("./routes/questions");

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/v1/auth",authRoute);
app.use("/v1/user",userRoute);
app.use("/v1/question",questionRoute);

app.listen(8000, ()=>{
    console.log("Sever is now listening at port 8000");
})

client.connect();

app.get('/', (req, res)=>{
    res.send('HELLO MOI NGUOI')
    client.end;
})





