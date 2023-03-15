//Required
const  inquirer  = require("inquirer");
const mysql = require('mysql');
const cTable = require("console.table");
const path = require('path')

//ADD

//add a department,prompted to enter the name of the department 
const addNewDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Enter New Department.'
            },
        ])
        .then((data) => {
            connection.query('INSERT INTO department SET ?',
                {
                    name: data.newDepartment,
                },
                function (err) {
                    if (err) throw err;
                }
            );
            console.log('New department added!')
            viewAllDepartments();
        });
};

//add a role, enter the name, salary, and department 
const addNewRole = () => {
    connection.query('SELECT * FROM department', (err, departments) => {
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
                    type: 'input',
                    name: 'newRole',
                    message: 'Enter name of new role.'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter salary of new role.',
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Enter department of new role.',
                    choices: departments,
                },
            ])
            .then((data) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: data.newRole,
                        salary: data.salary,
                        department_id: data.departmentId,
                    },
                    function (err) {
                        if (err) throw err;
                    }
                );
                console.log('Added New Role!')
                viewAllRoles();
            });

    });

};
//add an employee, enter the employee’s first name, last name, role, and manager
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
                        console.log('Added New Employee!');
                        viewAllEmployee();

                    }
                );
            });

    });

};
//update an employee role, update and their new role 

