/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

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