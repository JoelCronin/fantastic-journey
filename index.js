// Imports 
const fileQuestions = require("./assets/js/questions")
const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require("./server");
const cTable = require('console.table');

// function createAndSeedDatabase(){
//     db.query('SOURCE schema.sql', function (err, results) {
//         console.log(results);
//       });
//       db.query('SOURCE seeds.sql', function (err, results) {
//         console.log(results);
//       });
// }

// Displays initial List of options
function displayOptionList (){
    inquirer.prompt(fileQuestions.introQuestions)
    .then((answer) => {
        if(answer.introQuestion === "View all Employees"){

            db.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
            displayOptionList();
            });
        } else if (answer.introQuestion === "Add Employee"){
            console.log("success2")
            addEmployee();
        } else if (answer.introQuestion === "Update an employee role"){
            console.log("success3")
        }else if (answer.introQuestion === "View all departments"){
            db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
            displayOptionList();
            });
        }else if (answer.introQuestion === "Add a Department"){
            console.log("success5");
            addDeparment();
        }else if (answer.introQuestion === "View all roles"){
            db.query('SELECT * FROM roles', function (err, results) {
            console.table(results);
            displayOptionList();
            });
        }else if (answer.introQuestion === "Add a role"){
            console.log("success7")
            addRole();
        }else {
            console.log("success8")
        }
    })
};

function addEmployee (){
    inquirer.prompt(fileQuestions.addEmployeeQuestions)
    .then((answer) => {
        db.execute(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES ("${answer.firstNameQuestion}", "${answer.secondNameQuestion}", "${answer.employeeRoleQuestion}", ${answer.employeeManagerQuestion});`);
        displayOptionList();
    })
};

function addDeparment (){
    inquirer.prompt(fileQuestions.addDepartmentQuestions)
    .then((answer) => {
        db.execute(`INSERT INTO department (dept_name)
        VALUES ("${answer.departmentQuestion}");`);
        displayOptionList();
    })
};

function addRole(){
    inquirer.prompt(fileQuestions.addRoleQuestions)
    .then((answer) => {
        db.execute(`INSERT INTO roles (title, salary, department_id)
        VALUES ("${answer.roleNameQuestion}", ${answer.roleSalaryQuestion}, ${answer.roleDepartmentQuestion});`);
        displayOptionList();
    })
};



// createAndSeedDatabase();
displayOptionList();