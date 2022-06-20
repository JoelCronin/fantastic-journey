//Questions to be fed inot inquirer

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
             "Add a role",
             "Quit"
    ]
    }
];

const addDepartmentQuestions = [
    {
        name: "departmentQuestion",
        message: "What is the name of the Department?",
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
        choices:[1, 2]
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
      choices:[1, 2]
    },
    {
        name: "employeeManagerQuestion",
        message: "Who will their manager be?",
        type: "list",
        choices:[1, 2]
    }
];

const updateEmployeeQuestions = [
  {
      name: "whichEmployeeUpdateQuestion",
      message: "Which Employee would you like to update?",
      type: "list",
      choices:[1, 2, 3, 4, 5]
  },
  {
    name: "whatUpdateQuestion",
    message: "What aspect of the record would you like to update?",
    type: "list",
    choices:["first_name", "last_name", ]
  }
]

module.exports = {
    addDepartmentQuestions,
    addEmployeeQuestions,
    addRoleQuestions,
    introQuestions,
    updateEmployeeQuestions
}