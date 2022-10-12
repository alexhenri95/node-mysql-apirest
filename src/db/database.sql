CREATE DATABASE  IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

DESCRIBE employee;

INSERT INTO employee VALUES
(1, 'Alex', 1000),
(2, 'Joel', 800),
(3, 'Jose', 1500),
(4, 'Frank', 100),
(5, 'Julio', 600);