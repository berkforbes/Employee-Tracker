const express = require("express");
const PORT = process.env.PORT || 3003;
const app = express();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// mysql -u root -p

require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PW,
  database: "employees",
});

connection.connect((err) => {
  if (err) throw err;
  welcomeMessage();
});

welcomeMessage = () => {
  console.log("------------------------");
  console.log("|                      |");
  console.log("|                      |");
  console.log("|   EMPLOYEE TRACKER   |");
  console.log("|                      |");
  console.log("|                      |");
  console.log("------------------------");
  promptUser();
};

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View all departments") {
        showDepartments();
      }

      if (choices === "View all roles") {
        showDepartments();
      }

      if (choices === "View all employees") {
        showDepartments();
      }

      if (choices === "Add a department") {
        showDepartments();
      }

      if (choices === "Add a role") {
        showDepartments();
      }

      if (choices === "Add an employee") {
        showDepartments();
      }

      if (choices === "Update an employee role") {
        showDepartments();
      }
    });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

