const express = require('express');
const app = express();
const path = require('path')
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({path: "./.env"})


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicdirectory = path.join(__dirname,"./public")
app.use(express.static(publicdirectory))



//parse URL-ENCODED BODY (as sent buy html foam)
app.use(express.urlencoded({extended : false}));
app.use(express.json());



app.set('view engine', 'hbs');



db.connect((err)=>{
    if(err)
    console.log(err)
    else
    console.log('mysql is connected......')
})

//define routes
app.use('/', require("./routes/pages"))
app.use('/auth',require('./routes/auth'))



app.listen(3000,()=>{
    console.log('surver is running on port 3000')
})