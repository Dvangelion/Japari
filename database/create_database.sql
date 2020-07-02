
CREATE DATABASE IF NOT EXISTS japari;

USE japari;

CREATE TABLE users (
    id int(10) NOT NULL auto_increment,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY username_unique (username)
)   ENGINE=INNODB;

-- need to inser a row in db to avoid create database multiple times
INSERT INTO users (username, password) VALUES ('test_username', 'test_password');