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
        } else if (answer.introQuestion === "Update an employee role"){
            console.log("success3")
        }else if (answer.introQuestion === "View all departments"){
            db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
            displayOptionList();
            });
        }else if (answer.introQuestion === "Add a Department"){
            console.log("success5")
        }else if (answer.introQuestion === "View all roles"){
            db.query('SELECT * FROM roles', function (err, results) {
            console.table(results);
            displayOptionList();
            });
        }else if (answer.introQuestion === "add a role"){
            console.log("success7")
        }else {
            console.log("success8")
        }
    })
}



// createAndSeedDatabase();
displayOptionList();