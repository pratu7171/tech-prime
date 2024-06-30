const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("Database connected Succesfully"))
    .catch((error)=>{
        console.log("Database connection Failed");
        console.error(error);
        process.exit(1);
    })
};