//Required
const  inquirer  = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");

const connection = mysql.createConnection({
    host:"127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db"
})

//Questions

//view all departments, formatted table showing department names and department ids

//viewl all roles, job title, role id, the department that role belongs to, and the salary for that role

//view all employees,  employee ids, first names, last names, job titles, 
//departments, salaries, and managers that the employees report to

//add a department, 

//add a role, 

//add an employee, 

//and update an employee role