/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const db = require("./db_connection");

const delete_category_table_sql = "DELETE FROM categorynames;"

db.execute(delete_category_table_sql);

const delete_data_table_sql = "DELETE FROM data;"

db.execute(delete_data_table_sql);

const delete_types1_table_sql = "DELETE FROM types1;"

db.execute(delete_types1_table_sql);

const delete_types2_table_sql = "DELETE FROM types2;"

db.execute(delete_types2_table_sql);

const delete_types3_table_sql = "DELETE FROM types3;"

db.execute(delete_types3_table_sql);

const insert_category_sql = `
    INSERT INTO categorynames 
        (id, name) 
    VALUES 
        (?, ?);
`

db.execute(insert_category_sql, [1, 'Order']);
db.execute(insert_category_sql, [2, 'Color']);
db.execute(insert_category_sql, [3, 'Date']);

const insert_data_sql = `
    INSERT INTO data 
        (dataId, title, slotId1, slotId2, slotId3, description) 
    VALUES 
        (?, ?, ?, ?, ?, ?);
`

db.execute(insert_data_sql, [1, 'Example 1', 1, 1, 1, null]);
db.execute(insert_data_sql, [2, 'Example 2', 2, 2, 2, null]);
db.execute(insert_data_sql, [3, 'Example 3', 3, 3, 3, null]);

const insert_types1_sql = `
    INSERT INTO types1 
        (type1Id, type1Name) 
    VALUES 
        (?, ?);
`

db.execute(insert_types1_sql, [1, 'First']);
db.execute(insert_types1_sql, [2, 'Second']);
db.execute(insert_types1_sql, [3, 'Third']);

const insert_types2_sql = `
    INSERT INTO types2 
        (type2Id, type2Name) 
    VALUES 
        (?, ?);
`

db.execute(insert_types2_sql, [1, 'Red']);
db.execute(insert_types2_sql, [2, 'Blue']);
db.execute(insert_types2_sql, [3, 'Green']);

const insert_types3_sql = `
    INSERT INTO types3 
        (type3Id, type3Name) 
    VALUES 
        (?, ?);
`

db.execute(insert_types3_sql, [1, 'Yesterday']);
db.execute(insert_types3_sql, [2, 'Today']);
db.execute(insert_types3_sql, [3, 'Tomorrow']);

db.end();