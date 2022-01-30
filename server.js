const express = require("express");
const PORT = process.env.PORT || 3003;
const app = express();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// mysql -u root -p

// .env for safe PW storage
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

    // take user selection a run corresponding function
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
  console.log("Showing All Departments");
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// Function to display roles
displayRoles = () => {
  console.log("Showing All Roles");
  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// Function to display employees
displayEmployees = () => {
  console.log("Showing All Employees");
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager 
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// Add a dept
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "Enter the name of the department you would like to add",
        validate: (newDept) => {
          if (newDept) {
            return true;
          } else {
            console.log("Please enter a department name");
            return false;
          }
        },
      },
    ]) // Adding new dept info into dept table not working??
    .then((answer) => {
      connection.query(`INSERT INTO department SET?`, { name: answer.newDept });
      const query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(answer.newDept + " has been added to departments!");

        displayDepartments();
      });
    });
};

// Add a role
addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "What is the title of the new role?",
        validate: (newRole) => {
          if (newRole) {
            return true;
          } else {
            console.log("Please enter a role title");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "addSalary",
        message: "What is the salary for the new role?",
        validate: (newSalary) => {
          if (newSalary) {
            return true;
          } else {
            console.log("Please enter a salary");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.newRole, answer.newSalary];

      // get dept id from table
      const queryRole = `SELECT name, id FROM department`;
      connection.query(queryRole, (err, data) => {
        if (err) throw err;
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "What department does this role belong to?",
              choices: dept,
            },
          ])
          .then((deptRole) => {
            const dept = deptRole.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                          VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log(answer.newRole + " has been added to roles!");

              displayRoles();
            });
          });
      });
    });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
        validate: (firstName) => {
          if (firstName) {
            return true;
          } else {
            console.log("Please enter a first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?",
        validate: (lastName) => {
          if (lastName) {
            return true;
          } else {
            console.log("Please enter a last name");
            return false;
          }
        },
      },
    ])

    .then((answer) => {
      const params = [answer.firstName, answer.lastName];

      const roleTable = `SELECT role.id, role.title FROM role`;

      connection.query(roleTable, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleSelection) => {
            const role = roleSelection.role;
            params.push(role);

            const sqlManager = `SELECT * FROM employee`;

            connection.query(sqlManager, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerSelection) => {
                  const manager = managerSelection.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;

                  connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!");

                    displayEmployees();
                  });
                });
            });
          });
      });
    });
};


// Update an employee

updateRole = () => {
 const employeeTable = `SELECT * FROM employee`;

 connection.query(employeeTable, (err, data) => {
  if (err) throw err;

  const employeeList = data.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

    inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Who would you like to update?",
        choices: employeeList
      }
    ])
    .then(employeeSelection => {
      const employee = employeeSelection.name;
      const params = [];
      params.push(employee);

      const roleTable = `SELECT * FROM role`;

      connection.query(roleTable, (err, data) => {
        if (err) throw err;

        const roleList = data.map(({ id, title}) => ({name: title, value:id}));

          inquirer
          .prompt([
            {
              type: 'list',
              name: 'role',
              message: "Choose a new role for employee",
              choices: roleList
            }
          ])
          .then(roleSelection => {
            const role = roleSelection.role;
            params.push(role);

            let employee = params[0]
            params [0] = role
            params[1] = employee

            const sqlUpdate = `UPDATE employee SET role_id = ? WHERE id=?`;

            connection.query(sqlUpdate, (err, result) => {
              if (err) throw err;
              console.log("Employee role was updated");

              displayEmployees();
            })
        })
      })      
    })
 })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
