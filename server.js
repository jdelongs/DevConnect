const express = require("express");
const connectDB = require('./config/db');
const path = require('path')
const app = express();
// connect dababase 
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// test to make sure its running
// app.get("/", (req, res) => res.send("API running"));

// defined routes 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


// Serve static assets in production 
if(process.env.NODE_ENV === 'production') {
    //set static folder 
    app.use(express.static('client/build')); 

    app.get('*', (req, res => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }))
} 

// looks for enviorment variable called PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 
