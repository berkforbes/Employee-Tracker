INSERT INTO department (name)
VALUES
('Soils Lab'),
('Engineers'),
('Geologists'),
('Operations'),
('Office');

INSERT INTO role (title, salary, department_id)
VALUES
('Lab Tech', 50000, 1),
('Lab Manager', 75000, 1),
('Project Engineer', 85000, 2),
('Project Geologist', 85000, 3),
('Staff Geologist', 65000, 3),
('Office Manager', 80000, 4),
('Secretary', 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Nick', 'Best', 1, null),
('Dave', 'Siebach', 2, 1),
('Jared', 'Hawes', 3, null),
('Peter', 'Doumit', 4, null),
('Jackson', 'Bodtker', 5, 4),
('Dianne', 'Papp', 6, null),
('Jenn', 'Pumpkin', 7, null);

