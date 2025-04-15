const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const DB_URL = process.env.DB;
const app = express();
const connect = require("./config/mongoDB");
const fileRoutes = require("./Routes/fileRoutes")
const fileUpload = require('express-fileupload');

app.use(express.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));


app.get("/",(req,res)=>{
    res.send("Server is running....")
})

app.use('/api/v1', fileRoutes);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connect(DB_URL);
})
