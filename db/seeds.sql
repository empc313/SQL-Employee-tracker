
INSERT INTO department(name)
VALUES ("Sales"),
("Finance"),
("Legal"),
("Engineering");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 120000, 1),
("Accountant", 125000, 2),
("Associate", 100000, 1),
("Legal Manager", 250000, 3),
("Legal Team", 200000, 3),
("Lead Software Engineer", 250000, 4),
("Software Engineer", 240000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 2, 2),
("Debbie", "Ryan", 1, NULL),
("Jane", "Doe", 7, NULL),
("Miles", "Jenkins", 6, NULL),
("Diana", "Welch", 8, 4),
("Charlotte", "Evans", 5, 7),
("Tammy", "Larson", 4, NULL)