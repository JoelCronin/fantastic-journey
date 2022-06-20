// Imports 
const fileQuestions = require("./assets/js/questions")
const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require("./server");
const cTable = require('console.table');
// const view = require("./options/view")

// Displays initial List of options to choose from
function displayOptionList (){
    inquirer.prompt(fileQuestions.introQuestions)
    .then((answer) => {
        //Shows table with all employee details displayed on it
        if(answer.introQuestion === "View all Employees"){
            db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name, roles.salary, employee.manager_name 
            FROM employee, roles, department
            WHERE employee.role_id = roles.id
            And department.id = roles.department_id;`, function (err, results) {
            console.table(results);
            displayOptionList();
            });

        //Brings up questions to add employee
        } else if (answer.introQuestion === "Add Employee"){
            addEmployee();

        //Brings up questions to update employee role
        } else if (answer.introQuestion === "Update an employee role"){
            updateEmployee();

        //Shows table with all department details displayed on it
        }else if (answer.introQuestion === "View all departments"){
            db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
            displayOptionList();
            });

        //Brings up questions to add department
        }else if (answer.introQuestion === "Add a Department"){
            addDeparment();

        //Shows table with all the roles details displayed on it
        }else if (answer.introQuestion === "View all roles"){
            db.query(`SELECT roles.id, roles.title, roles.salary,  department.dept_name
            FROM department, roles
            WHERE department.id = roles.department_id;`, function (err, results) {
            console.table(results);
            displayOptionList();
            });

        //Brings up questions to add role
        }else if (answer.introQuestion === "Add a role"){
            addRole();
        
        //Pressing quit will exit the application
        }else {
            process.exit();

        }
    })
};

//Blank arrays ready to store all employees, roles and departments
const employeeArray = [];
const rolesArray = [];
const deptArray = [];
var choiceofDepts = [];
var choiceOfRoles = [];
var choiceofEmployee = [];

//Function to populate employeeArray with all listed employees
function populateEmployeeArray(){
    db.query('SELECT * FROM employee', function (err, results) {
        employeeArray.push(results)
        var allEmployees = employeeArray[0];

        for (let i = 0; i < allEmployees.length; i++){
            let employeeList = `${allEmployees[i].id} ${allEmployees[i].first_name} ${allEmployees[i].last_name}`;
            choiceofEmployee.push(employeeList);
        }
        });    
}

//Function to populate rolesArray with all listed roles
function populateRolesArray(){
    db.query('SELECT * FROM roles', function (err, results) {
        rolesArray.push(results)
        var allRoles = rolesArray[0];

        for (let i = 0; i < allRoles.length; i++){
            let roleList = `${allRoles[i].id} ${allRoles[i].title}`;
            choiceOfRoles.push(roleList);
        }
        });    
}

//Function to populate deptArray with all listed departments
function populateDeptArray(){
    db.query('SELECT * FROM department', function (err, results) {
        deptArray.push(results);
        var allDepts = deptArray[0];

        for (let i = 0; i < allDepts.length; i++){
            let deptList = `${allDepts[i].id} ${allDepts[i].dept_name}`;
            choiceofDepts.push(deptList);
        }
        });    
}

//Function to generate employee update questions and then log the changes to MySQL database
function updateEmployee(){

    //Call these two functions first so we have access to list of employees and roles to be used in questions
    populateEmployeeArray();
    populateRolesArray();
    inquirer.prompt([
        {
            name: "confirmUpdate",
            message: "Are you sure you want to update employee?",
            type: "list",
            choices: ["YES", "NO"]
        },
        {
            name: "whichEmployeeUpdate",
            message: "What Employee would you like to update?",
            type: "list",
            choices: choiceofEmployee
        },
        {
            name: "whatRoleUpdate",
            message: "What role will they now be doing?",
            type: "list",
            choices: choiceOfRoles
        }
    ])

    //Answers used to update MySQL
    .then((answer) => {
        let roleIDUpdate = answer.whatRoleUpdate.split(" ")
        let employeeIDUpdate = answer.whichEmployeeUpdate.split(" ")
        db.query(`UPDATE employee
        SET role_id = ${roleIDUpdate[0]}
        WHERE id = ${employeeIDUpdate[0]}`);
        displayOptionList();
    })

}

//Function to create a new employee
function addEmployee (){
    populateRolesArray();
    populateEmployeeArray();
    choiceofEmployee.push("NULL")
    inquirer.prompt([
        {
            name: "firstNameQuestion",
            message: "What is the first name of this employee?",
            type: "input",
            validate: (answer) =>{
                const nameParse = parseInt(answer)
                if(!isNaN(nameParse) || answer === ""){
                  return "First name should be a non-empty string"
                } else {
                  return true
                }
            } 
        },
        {
            name: "secondNameQuestion",
            message: "What is the surname of this employee?",
            type: "input",
            validate: (answer) =>{
                const nameParse = parseInt(answer)
                if(!isNaN(nameParse) || answer === ""){
                  return "Surname should be a non-empty string"
                } else {
                  return true
                }
            }  
        },
        {
          name: "employeeRoleQuestion",
          message: "What Role will they be doing?",
          type: "list",
          choices: choiceOfRoles
        },
        {
            name: "employeeManagerQuestion",
            message: "Who will their manager be?",
            type: "list",
            choices: choiceofEmployee
        }
    ])
    .then((answer) => {
        let roleIDanswer = answer.employeeRoleQuestion.split(" ")
        let managerIDanswer = answer.employeeManagerQuestion.split(" ")
       
        //Conditional statement used so "null" can be used for manager when needed
        if (managerIDanswer.length > 1){
            var managerFullname = `${managerIDanswer[1]} ${managerIDanswer[2]}`
        } else {
            var managerFullname = "null"
        }
        
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id, manager_name)
        VALUES ("${answer.firstNameQuestion}", "${answer.secondNameQuestion}", "${roleIDanswer[0]}", ${managerIDanswer[0]}, "${managerFullname}");`);
        displayOptionList();
    })
};

function addDeparment (){
    inquirer.prompt(fileQuestions.addDepartmentQuestions)
    .then((answer) => {
        db.query(`INSERT INTO department (dept_name)
        VALUES ("${answer.departmentQuestion}");`);
        displayOptionList();
    })
};

function addRole(){
    populateDeptArray();
    inquirer.prompt([
        {
            name: "roleNameQuestion",
            message: "What is the name of this role?",
            type: "input",
            validate: (answer) =>{
                const roleParse = parseInt(answer)
                if(!isNaN(roleParse) || answer === ""){
                  return "Role should be a non-empty string"
                } else {
                  return true
                }
            }
        },
        {
            name: "roleSalaryQuestion",
            message: "What is the salary of this role?",
            type: "input",
            validate: (answer) =>{
                const salaryParse = parseInt(answer)
                if(isNaN(salaryParse) || answer === "" || salaryParse < 0){
                  return "Salary should be a be a positive number"
                } else {
                  return true
                }
            }
        },
        {
            name: "roleDepartmentQuestion",
            message: "What Department is this role in?",
            type: "list",
            choices: choiceofDepts
        }
    ])
    .then((answer) => {
        let departmentAnswer = answer.roleDepartmentQuestion.split(' ')
        db.query(`INSERT INTO roles (title, salary, department_id)
        VALUES ("${answer.roleNameQuestion}", ${answer.roleSalaryQuestion}, ${departmentAnswer[0]});`);
        displayOptionList();
    })
};

displayOptionList();
