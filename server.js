const express = require("express");

const app = express();

//test to make sure its running
app.get("/", (req, res) => res.send("API running"));

//looks for enviorment variable called PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 
