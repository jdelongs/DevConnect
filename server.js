const express = require("express");
const connectDB = require('./config/db');

const app = express();
// connect dababase 
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// test to make sure its running
app.get("/", (req, res) => res.send("API running"));

// defined routes 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// looks for enviorment variable called PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 
