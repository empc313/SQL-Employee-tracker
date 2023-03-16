//Required
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
// const viewFile = require("./js-files/view")
// const addFile = require("./js-files/add");

//Connect to the database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_db",
},console.log(`
█▀▀ █▀▄▀█ █▀█ █░░ █▀█ █▄█ █▀▀ █▀▀   ▀█▀ █▀█ ▄▀█ █▀▀ █▄▀ █▀▀ █▀█
██▄ █░▀░█ █▀▀ █▄▄ █▄█ ░█░ ██▄ ██▄   ░█░ █▀▄ █▀█ █▄▄ █░█ ██▄ █▀▄
Connected to Employee Tracker`));


const init = () => {
  inquirer.prompt([
      //Question
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add New Employee",
          "Update Employee",
          "View All Departments",
          "Add New Department",
          "View All Roles",
          "Add New Role",
          "EXIT",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View All Employees") {
        viewAllEmployee();
      }
      if (choices === "Add New Employee") {
        addNewEmployee();
      }
      if (choices === "Update Employee") {
        updateEmployee();
      }
      if (choices === "View All Departments") {
        viewAllDepartments();
      }
      if (choices === "Add New Department") {
        addNewDepartment();
      }
      if (choices === "View All Roles") {
        viewAllRoles();
      }
      if (choices === "Add New Role") {
        addNewRole();
      }
      if (choices === "EXIT") {
        console.log("Thank you for using Employee Tracker");
        connection.end();
      }
    }).catch(err => console.error(err));
}
init();