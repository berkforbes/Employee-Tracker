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
        displayDepartments();
      }

      if (choices === "View all roles") {
        displayRoles();
      }

      if (choices === "View all employees") {
        displayEmployees();
      }

      if (choices === "Add a department") {
        addDepartment();
      }

      if (choices === "Add a role") {
        addRole();
      }

      if (choices === "Add an employee") {
        addEmployee();
      }

      if (choices === "Update an employee role") {
        updateRole();
      }
    });
};

// Function to display dept
displayDepartments = () => {
  console.log('Showing All Departments');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw (err);
    console.table(rows);
    promptUser();
  });
};

// Function to display roles
displayRoles = () => {
  console.log('Showing All Roles');
  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw (err);
    console.table(rows);
    promptUser();
  });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

