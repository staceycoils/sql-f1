DROP DATABASE IF EXISTS sql_f1_ops;
DROP DATABASE IF EXISTS sql_f1;

CREATE DATABASE sql_f1_ops;
CREATE DATABASE sql_f1;

USE sql_f1;


CREATE TABLE drivers (
    id INTEGER PRIMARY KEY,
    firstName VARCHAR(50),
    surname VARCHAR(50),
    country VARCHAR(100)
);

CREATE TABLE races (
    id INTEGER PRIMARY KEY,
    seasonYear INTEGER,
    round INTEGER,
    circuit VARCHAR(100)
);

CREATE TABLE points (
    id INTEGER PRIMARY KEY,
    pointMethod VARCHAR(30),
    startDate INTEGER,
    endDate INTEGER,
    FL INTEGER,
    1st INTEGER,
    2nd INTEGER,
    3rd INTEGER,
    4th INTEGER,
    5th INTEGER,
    6th INTEGER,
    7th INTEGER,
    8th INTEGER,
    9th INTEGER,
    10th INTEGER
);

INSERT INTO points VALUES
    (1, '1950-1959', 1950, 1959, 1, 8, 6, 4, 3, 2, null, null, null, null, null),
    (2, '1960', 1960, 1960, null, 8, 6, 4, 3, 2, 1, null, null, null, null),
    (3, '1961-1990', 1961, 1990, null, 9, 6, 4, 3, 2, 1, null, null, null, null),
    (4, '1991-2002', 1991, 2002, null, 10, 6, 4, 3, 2, 1, null, null, null, null),
    (5, '2003-2009', 2003, 2009, null, 10, 8, 6, 5, 4, 3, 2, 1, null, null),
    (6, '2010-2018', 2010, 2018, null, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1),
    (7, '2019-', 2019, 9999, 1, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1),
    (8, "Medals Matter", 9999, 9999, null, 10, 6, 3, null,null, null, null, null, null, null),
    (9, "All or Nothing", 9999, 9999, null, 10, null, null, null,null, null, null, null, null, null),
    (10, "Reverse", 9999, 9999, null, null, null, null, null,null, null, null, null, null, null);

USE sql_f1_ops;

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    year INTEGER,
    firstName VARCHAR(50),
    surname VARCHAR(50),
    country VARCHAR(100)
);

CREATE TABLE races (
    id INTEGER PRIMARY KEY,
    seasonYear INTEGER,
    round INTEGER,
    circuit VARCHAR(100),
    res01 VARCHAR(20) DEFAULT NULL,
    res02 VARCHAR(20) DEFAULT NULL,
    res03 VARCHAR(20) DEFAULT NULL,
    res04 VARCHAR(20) DEFAULT NULL,
    res05 VARCHAR(20) DEFAULT NULL,
    res06 VARCHAR(20) DEFAULT NULL,
    res07 VARCHAR(20) DEFAULT NULL,
    res08 VARCHAR(20) DEFAULT NULL,
    res09 VARCHAR(20) DEFAULT NULL,
    res10 VARCHAR(20) DEFAULT NULL,
    res11 VARCHAR(20) DEFAULT NULL,
    res12 VARCHAR(20) DEFAULT NULL,
    res13 VARCHAR(20) DEFAULT NULL,
    res14 VARCHAR(20) DEFAULT NULL,
    res15 VARCHAR(20) DEFAULT NULL,
    res16 VARCHAR(20) DEFAULT NULL,
    res17 VARCHAR(20) DEFAULT NULL,
    res18 VARCHAR(20) DEFAULT NULL,
    res19 VARCHAR(20) DEFAULT NULL,
    res20 VARCHAR(20) DEFAULT NULL,
    res21 VARCHAR(20) DEFAULT NULL,
    res22 VARCHAR(20) DEFAULT NULL,
    res23 VARCHAR(20) DEFAULT NULL,
    res24 VARCHAR(20) DEFAULT NULL,
    res25 VARCHAR(20) DEFAULT NULL,
    res26 VARCHAR(20) DEFAULT NULL,
    res27 VARCHAR(20) DEFAULT NULL,
    res28 VARCHAR(20) DEFAULT NULL,
    res29 VARCHAR(20) DEFAULT NULL,
    res30 VARCHAR(20) DEFAULT NULL,
    pole VARCHAR(20) DEFAULT NULL,
    fastest VARCHAR(20) DEFAULT NULL
);

CREATE TABLE points (
    id INTEGER PRIMARY KEY,
    pointMethod VARCHAR(30),
    startDate INTEGER,
    endDate INTEGER,
    FL INTEGER,
    1st INTEGER,
    2nd INTEGER,
    3rd INTEGER,
    4th INTEGER,
    5th INTEGER,
    6th INTEGER,
    7th INTEGER,
    8th INTEGER,
    9th INTEGER,
    10th INTEGER
);

INSERT INTO points VALUES
    (1, '1950-1959', 1950, 1959, 1, 8, 6, 4, 3, 2, null, null, null, null, null),
    (2, '1960', 1960, 1960, null, 8, 6, 4, 3, 2, 1, null, null, null, null),
    (3, '1961-1990', 1961, 1990, null, 9, 6, 4, 3, 2, 1, null, null, null, null),
    (4, '1991-2002', 1991, 2002, null, 10, 6, 4, 3, 2, 1, null, null, null, null),
    (5, '2003-2009', 2003, 2009, null, 10, 8, 6, 5, 4, 3, 2, 1, null, null),
    (6, '2010-2018', 2010, 2018, null, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1),
    (7, '2019-', 2019, 9999, 1, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1);

SELECT * FROM points;
SELECT * FROM races;
