const cTable = require('console.table');
const db = require("../server")
const main = require("../index")

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
        
        db.execute(`INSERT INTO employee(first_name, last_name, role_id, manager_id, manager_name)
        VALUES ("${answer.firstNameQuestion}", "${answer.secondNameQuestion}", "${roleIDanswer[0]}", ${managerIDanswer[0]}, "${managerFullname}");`);
        main.displayOptionList();
    })
};