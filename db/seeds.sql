-- Seed the tables with some mock employees

USE employee_db;

INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Projects"),
       ("HR"),
       ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Director", 100000.00, 1),
       ("Sales Manager", 75000.00, 1),
       ("Projects Director", 80000.00, 2), 
       ("Projects Manager", 60000.00, 2),
       ("HR Director", 84000.00, 3),
       ("HR Manager", 56000.00, 3),
       ("Finance Director", 90000.00, 4),
       ("Finance Manager", 70000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_name)
VALUES ("Joel", "Smith", 1, NULL, NULL),
       ("Sophie", "Brown", 2, 1, "Joel Smith"),
       ("Sarah", "Clark", 3, NULL, NULL), 
       ("Tom", "Highfield", 4, 3, "Sarah Clark"),
       ("John", "Burns", 5, NULL, NULL),
       ("Eva", "Turle", 6, 5, "John Burns"), 
       ("Emma", "Moss", 7, NULL, NULL),
       ("Steve", "Cook", 8, 7, "Emma Moss");