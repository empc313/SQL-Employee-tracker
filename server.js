//Required
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
// const viewFile = require("./js-files/view")
// const addFile = require("./js-files/add");

//Connect to the database
const connection = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`
█▀▀ █▀▄▀█ █▀█ █░░ █▀█ █▄█ █▀▀ █▀▀   ▀█▀ █▀█ ▄▀█ █▀▀ █▄▀ █▀▀ █▀█
██▄ █░▀░█ █▀▀ █▄▄ █▄█ ░█░ ██▄ ██▄   ░█░ █▀▄ █▀█ █▄▄ █░█ ██▄ █▀▄
Connected to Employee Tracker`)
);

const init = () => {
  inquirer
    .prompt([
      //Question
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add New Employee",
          "Update Employee",
          "Delete Employee",
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
      if (choices === "Delete Employee"){
        deleteEmployee();
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
    })
    .catch((err) => console.error(err));
};
init();

//VIEW
//View all departments
const viewAllDepartments = () => {
  let query = `SELECT * FROM department`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};
//View all employees
const viewAllEmployee = () => {
  let query = `SELECT * FROM employee` ;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};
//View all roles
const viewAllRoles = () => {
  let query = `SELECT * FROM role`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

//Add new employee
const addNewEmployee = () => {
  connection.query("SELECT * FROM role", (err, roles) => {
    if (err) console.log(err);
    roles = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter first name of new employee...",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter last name of new employee...",
        },
        {
          type: "list",
          name: "role",
          message: "Enter new employee role...",
          choices: roles,
        },
        {
          type: "list",
          name: "managerId",
          message: "select a manager id...",
          choices: [ 1, 2, 3, 4],
        },
      ])
      .then((data) => {
        console.log(data.role);
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.role,
            manager_id: data.managerId,
          },
          (err) => {
            if (err) throw err;
            console.log("Updated Employee ;");
            init();
          }
        );
      });
  });
};

//Add new department
const addNewDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "Enter New Department.",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: data.newDepartment,
        },
        function (err) {
          if (err) throw err;
        }
      );
      console.log("New department added!");
      init();
    });
};

//Add new role
const addNewRole = () => {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) console.log(err);
    departments = departments.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "Enter name of new role.",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter salary of new role.",
        },
        {
          type: "list",
          name: "departmentId",
          message: "Enter department of new role.",
          choices: departments,
        },
      ])
      .then((data) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: data.newRole,
            salary: data.salary,
            department_id: data.departmentId,
          },
          function (err) {
            if (err) throw err;
          }
        );
        console.log("Added New Role!");
        init();
      });
  });
};

const updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, employees) => {
    if (err) console.log(err);
    employees = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    connection.query("SELECT * FROM role", (err, roles) => {
      if (err) console.log(err);
      roles = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "selectEmployee",
            message: "Select Employee to Update",
            choices: employees,
          },
          {
            type: "list",
            name: "selectRole",
            message: "Select Employee Role.",
            choices: roles,
          },
        ])
        .then((data) => {
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: data.selectNewRole,
              },
              {
                id: data.selectEmployee,
              },
            ],
            function (err) {
              if (err) throw err;
            }
          );
          console.log("Employee Updated!");
          init();
        });
    });
  });
};

