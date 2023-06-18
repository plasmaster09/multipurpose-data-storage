const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_category_table_sql = "DROP TABLE IF EXISTS categorynames;"

db.execute(drop_category_table_sql);

const drop_data_table_sql = "DROP TABLE IF EXISTS data;"

db.execute(drop_data_table_sql);

const drop_types1_table_sql = "DROP TABLE IF EXISTS types1;"

db.execute(drop_types1_table_sql);

const drop_types2_table_sql = "DROP TABLE IF EXISTS types2;"

db.execute(drop_types2_table_sql);

const drop_types3_table_sql = "DROP TABLE IF EXISTS types3;"

db.execute(drop_types3_table_sql);

const create_category_table_sql = `
CREATE TABLE categorynames (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(45) NOT NULL,
    PRIMARY KEY (id));
`

const create_data_table_sql = `
CREATE TABLE data (
    dataId int(11) NOT NULL AUTO_INCREMENT,
    title varchar(45) NOT NULL,
    slotId1 int(11) DEFAULT NULL,
    slotId2 int(11) DEFAULT NULL,
    slotId3 int(11) DEFAULT NULL,
    description varchar(150) DEFAULT NULL,
    PRIMARY KEY (dataId));
`

const create_types1_table_sql = `
CREATE TABLE types1 (
    type1Id int(11) NOT NULL AUTO_INCREMENT,
    type1Name varchar(45) NOT NULL,
    PRIMARY KEY (type1Id));  
`

const create_types2_table_sql = `
CREATE TABLE types2 (
    type2Id int(11) NOT NULL AUTO_INCREMENT,
    type2Name varchar(45) NOT NULL,
    PRIMARY KEY (type2Id));  
`

const create_types3_table_sql = `
CREATE TABLE types3 (
    type3Id int(11) NOT NULL AUTO_INCREMENT,
    type3Name varchar(45) NOT NULL,
    PRIMARY KEY (type3Id));  
`

db.execute(create_category_table_sql);
db.execute(create_data_table_sql);
db.execute(create_types1_table_sql);
db.execute(create_types2_table_sql);
db.execute(create_types3_table_sql);

db.end();