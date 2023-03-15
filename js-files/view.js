//Required
const  inquirer  = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");


//view all departments, formatted table showing department names and department ids
function viewAllDepartments(){
    let query =
    `SELECT * FROM department`
  connection.query(query,(err, res)=>{
      if (err) throw err;
      const deptChoices = res.map((choices) => ({
          value: choices.id, name: choices.name
      }));
    console.table(res);
    viewAllDepartments(deptChoices);
  });
}
//view all roles, job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles(){
    let query =
    `SELECT * FROM role`
  connection.query(query,(err, res)=>{
      if (err) throw err;
      const roleChoices = res.map((choices) => ({
          value: choices.id, name: choices.name
      }));
    console.table(res);
    viewAllRoles(roleChoices);
  });
}

//view all employees,  employee ids, first names, last names, job titles, 
//departments, salaries, and managers that the employees report to
function viewAllEmployee(){
    let query =
    `SELECT * FROM employee`
  connection.query(query,(err, res)=>{
      if (err) throw err;
      const empChoices = res.map((choices) => ({
          value: choices.id, name: choices.name
      }));
    console.table(res);
    viewAllEmployee(empChoices);
  });
}
