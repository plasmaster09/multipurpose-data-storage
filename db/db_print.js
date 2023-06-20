const db = require("./db_connection");

/**** Read the subjects table ****/

const select_category_sql = "SELECT * FROM categorynames";

db.execute(select_category_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'categorynames' contents:")
        console.log(results);
    }
);

const select_types1_sql = "SELECT * FROM types1";

db.execute(select_types1_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'types1' contents:")
        console.log(results);
    }
);

const select_types2_sql = "SELECT * FROM types2";

db.execute(select_types2_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'types2' contents:")
        console.log(results);
    }
);

const select_types3_sql = "SELECT * FROM types3";

db.execute(select_types3_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'types3' contents:")
        console.log(results);
    }
);

const select_data_sql = "SELECT * FROM data";

db.execute(select_data_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'data' contents:")
        console.log(results);
    }
);

db.end();