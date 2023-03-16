//Required
const  inquirer  = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");

//VIEW
//View all departments
const viewAllDepartments = () => {
    let query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      const deptChoices = res.map((choices) => ({
        value: choices.id,
        name: choices.name,
      }));
      console.table(res);
      viewAllDepartments(deptChoices);
      init();
    });
  };
  //View all employees
  const viewAllEmployee = () => {
    let query = `SELECT * FROM employee, role, department`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      const empChoices = res.map((choices) => ({
        value: choices.id,
        name: choices.name,
      }));
      console.table(res);
      viewAllEmployee(empChoices);
      init();
    });
  };
  //View all roles
  const viewAllRoles = () => {
    let query = `SELECT * FROM role`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      const roleChoices = res.map((choices) => ({
        value: choices.id,
        name: choices.name,
      }));
      console.table(res);
      viewAllRoles(roleChoices);
      init();
    });
  };

  module.exports = {viewAllDepartments, viewAllEmployee, viewAllRoles};

