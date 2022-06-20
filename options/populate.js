const employeeArray = [];
const rolesArray = [];
const deptArray = [];
var choiceofDepts = [];
var choiceOfRoles = [];
var choiceofEmployee = [];

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

module.exports = {
    populateDeptArray,
    populateEmployeeArray,
    populateRolesArray
}