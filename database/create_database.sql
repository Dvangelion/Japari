CREATE TABLE users (
    id int(10) NOT NULL auto_increment,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY username_unique (username)
)   ENGINE=INNODB;
