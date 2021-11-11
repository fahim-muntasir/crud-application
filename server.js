const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

//internal export
const routers = require('./server/routes/router');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path:'.env'});
const PORT = process.env.PORT || 8080;

//morgan setup
app.use(morgan('tiny'));

//body-parser setup
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//view engine setup 
app.set('view engine', 'ejs');

// database connection 
connectDB();

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

//router setup
app.use('/', routers);

app.listen(PORT, () => console.log(`Server is runing on http://localhost:${PORT}`));