const express = require("express");
require("dotenv").config({path:"/config/config.env"});
const mongoose = require("mongoose");
const cors = require("cors");
const morgan=require("morgan");
const connectDB=require("./config/db");
const auth=require("./middlewares/auth");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.get("/protected", auth, (req, res)=>{
    return res.status(200).json({...req.user._doc});
});

app.use("/api/", require("./routes/auth"));


const PORT=process.env.PORT || 8000;

app.listen(PORT,async () =>{
    try{
        await connectDB();
        console.log(`Server running on port: ${PORT}`);
    }
    // await connectDB();
    catch(err){
        console.log(err);
    }
} );
