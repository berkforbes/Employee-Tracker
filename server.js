const express = require('express')
const PORT = process.env.PORT || 3003;
const app = express();
const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

// mysql -u root -p


require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'employees'
  });
 
connection.connect(err => {
    if (err) throw err;
    welcomeMessage();
})

welcomeMessage = () => {
    console.log ('------------------------')
    console.log ('|                      |')
    console.log ('|                      |')
    console.log ('|   EMPLOYEE TRACKER   |')
    console.log ('|                      |')
    console.log ('|                      |')
    console.log ('------------------------')
}

 
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
