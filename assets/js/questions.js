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
             "Delete a Department",
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



module.exports = {
    addDepartmentQuestions,
    introQuestions
}