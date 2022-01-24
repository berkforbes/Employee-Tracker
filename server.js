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
 
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
 
// test function
app.get('/', (req, res) => {
   res.json({
     message: 'Hello World'
   });
 });
 
// Default response for any other request (Not Found)
app.use((req, res) => {
   res.status(404).end();
 });
 
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
