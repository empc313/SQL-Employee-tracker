
INSERT INTO department(name)
VALUES ("Sales"),
("Finance"),
("Legal"),
("Engineering");


INSERT INTO role (title,salary, department_id)
VALUES ("Sales Manager", 100000, 1),
("Accountant", 125000, 2),
("Associate", 10000, 1),
("Legal Manager", 130000, 3),
("Lawyer", 120000, 3),
("Lead Software Engineer", 150000, 4),
("Software Engineer", 140000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 2, 1),
("Debbie", "Ryan", 1, 1),
("Jane", "Doe", 2, 1)