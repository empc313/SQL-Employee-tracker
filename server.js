//Required
const  inquirer  = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");
const path = require('path');

const connection = mysql.createConnection({
    host:"127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db"
})
 inquirer
 .prompt([
     //Questions
     {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
            'View All Employees',
            'Add New Employee',
            'Update Employee',
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add New Role',
            'EXIT'
        ]
      },
    ])
    .then((answers) => {
        const { choices } = answers;

        if (choices === 'View All Employees') {
            viewAllEmployee();
        }
        if (choices === 'Add New Employee') {
            addNewEmployee();
        }
        if (choices === 'Update Employee') {
            updateEmployee();
        }
        if (choices === 'View All Departments') {
            viewAllDepartments();
        }
        if (choices === 'Add New Department') {
            addNewDepartment();
        }
        if (choices === 'View All Roles') {
            viewAllRoles();
        }
        if (choices === 'Add New Role') {
            addNewRole();
        }
        if (choices === 'EXIT') {
            console.log("Thank you for using Employee Tracker")
            connection.end();
        }

    });

    //VIEW FUNCTIONS
    //View all departments
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
//View all employees
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
//View all roles
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
    };

    const addNewEmployee = () => {
    connection.query('SELECT * FROM role', (err, roles) => {
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
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter first name of new employee...'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter last name of new employee...'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Enter new employee role...',
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'select a manager id...',
                    choices: [0, 1, 2, 3, 4]
                }
            ])
            .then((data) => {
                console.log(data.role);
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: data.role,
                        manager_id: data.managerId
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Updated Employee Roster;');
                        viewAllEmployee();

                    }
                );
            });

    });

};

  
      
   