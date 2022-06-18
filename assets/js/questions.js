const introQuestions = [
    {
        name: "introQuestion",
        message: "What would you like to do?",
        type: "list",
        choices: [  
            "View all Employees", 
             "Add Employee",
             "Update an employee role",
             "View all departments",
             "Add a Department",
             "View all roles",
             "add a role",
             "Quit"
    ]
    }
];

const addDepartmentQuestions = [
    {
        name: "DepartmentQuestion",
        message: "What is the name of the Department",
        type: "input",
        validate: (answer) =>{
            const departmentParse = parseInt(answer)
            if(!isNaN(departmentParse) || answer === ""){
              return "Department should be a non-empty string"
            } else {
              return true
            }
        }
    }
];

const addRoleQuestions = [
    {
        name: "roleNameQuestion",
        message: "What is the name of this role",
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
        message: "What is the salary of this role",
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
        type: "choice",
        choices:["HR", "Finance"]
    }
];

const addEmployeeQuestions = [
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
        message: "What is the sunname of this employee?",
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
        name: "employeeManagerQuestion",
        message: "Who will their manager be?",
        type: "choice",
        choices:["Joel", "Sophie"]
    }
];

module.exports = {
    addDepartmentQuestions,
    addEmployeeQuestions,
    addRoleQuestions,
    introQuestions
}