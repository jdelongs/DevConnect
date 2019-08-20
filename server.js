const express = require("express");
const connectDB = require('./config/db');

const app = express();
//connect dababase 
connectDB();

//test to make sure its running
app.get("/", (req, res) => res.send("API running"));

//looks for enviorment variable called PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 
