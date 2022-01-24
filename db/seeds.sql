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
('Dave', 'Siebach', 1, 2),
('Nick', 'Best', 2, null),
('Jared', 'Hawes', 3, null),
('Peter', 'Doumit', 4, null),
('Jackson', 'Bodtker', 5, 4),
('Dianne', 'Papp', 5, null),
('Jenn', 'Pumpkin', 6, null);

