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

displayEmployess = () => {
  console.log('Showing All Employees');
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager 
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id`

  connection.promise().query(sql, (err, rows) => {
    if (err) throw (err);
    console.table(rows);
    promptUser();
  });
};

addDepartment= () => {
  inquirer
  .prompt([
    {
      type: "inout",
      name: "newDepartment",
      message: "Enter the name of the department you would like to add",
      validate: newDept => {
        if (newDept) {
          return true;
      } else {
        console.log("Please enter a department name");
          return false;
        }
      } 
    }
  ])
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

