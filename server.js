const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const  morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path')

dotenv.config();

connectDB();
//rest object 
const app  = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})
const port = process.env.PORT || 8000;
app.listen(port,  () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white);
})
