//set up the server
const DEBUG = true;
const db = require('./db/db_connection');
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(logger("dev"));

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.oidc.isAuthenticated();
    res.locals.user = req.oidc.user;
    next();
})

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

// req.isAuthenticated is provided from the auth router
app.get('/authtest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
} );

const read_data_all_sql = `
select null as dataId, "Name" as title, c1.name as slotId1, c2.name as slotId2, c3.name as slotId3, null as description
from categorynames as c1
join categorynames as c2 on c2.id = 2
join categorynames as c3 on c3.id = 3
where c1.id = 1
union
select null as dataId, null as title, null as slotId1, null as slotId2, null as slotId3, json_arrayagg(type1Name) as description from types1
union
select null as dataId, null as title, null as slotId1, null as slotId2, null as slotId3, json_arrayagg(type2Name) as description from types2
union
select null as dataId, null as title, null as slotId1, null as slotId2, null as slotId3, json_arrayagg(type3Name) as description from types3
union
select dataId, title, type1Name, type2Name, type3Name, null as description
from data
join types1 on type1Id = slotId1
join types2 on type2Id = slotId2
join types3 on type3Id = slotId3
`

// define a route for the assignment list page
app.get( "/data", ( req, res ) => {
    db.execute(read_data_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
            else {
                let data = {stuff: results}; // results is still an array, get first (only) element
                res.render('data', data);
            }
    });
} );

const read_categories_all_sql = `
select categorynames.id, categorynames.name, count(types1.type1Id) as count1
from categorynames
join types1
where categorynames.id = 1
union
select categorynames.id, categorynames.name, count(types2.type2Id) as count2
from categorynames
join types2
where categorynames.id = 2
union
select categorynames.id, categorynames.name, count(types3.type3Id) as count3
from categorynames
join types3
where categorynames.id = 3
`

// define a route for the assignment list page
app.get( "/categories", ( req, res ) => {
    db.execute(read_categories_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = {cats: results}; // results is still an array, get first (only) element
            res.render('categories', data);
        }
    });
} );

const read_detail_sql = `
select null as dataId, "Name" as title, c1.name as slotId1, c2.name as slotId2, c3.name as slotId3, null as description
from categorynames as c1
join categorynames as c2 on c2.id = 2
join categorynames as c3 on c3.id = 3
where c1.id = 1
union
select dataId, title, type1Name as slotId1, type2Name as slotId2, type3Name as slotId3, description
from data
join types1 on type1Id = slotId1
join types2 on type2Id = slotId2
join types3 on type3Id = slotId3
where dataId = ?
union
select null as dataId, null as title, null as slotId1, null as slotId2, null as slotId3, json_arrayagg(type1Name) as description from types1
union
select null as dataId, null as title, null as slotId1, null as slotId2, null as slotId3, json_arrayagg(type2Name) as description from types2
union
select null as dataId, null as title, null as slotId1, null as slotId2, null as slotId3, json_arrayagg(type3Name) as description from types3
`

// define a route for the assignment detail page
app.get( "/data/:id", ( req, res ) => {
    db.execute(read_detail_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No assignment found with id = "${req.params.id}"` ); // NOT FOUND
            else {
                let data = {piece: results}; // results is still an array, get first (only) element
                res.render('detail', data);
            }
    });
} );

const read_editor_sql = `
select 0 as typeId, name as typeName
from categorynames
where id = ?
union
select null as typeId, id as typeName
from categorynames
where id = ?
union
select type1Id as typeId, type1Name as typeName
from types1
where table1Num = ?
union
select type2Id as typeId, type2Name as typeName
from types2
where table2Num = ?
union
select type3Id as typeId, type3Name as typeName
from types3
where table3Num = ?
`

// define a route for the assignment detail page
app.get( "/categories/:id", ( req, res ) => {
    db.execute(read_editor_sql, [req.params.id, req.params.id, req.params.id, req.params.id, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = {cat: results}; // results is still an array, get first (only) element
            res.render('editor', data);
        }
    });
} );

// define a route for assignment DELETE
const delete_type1_sql = `
    DELETE 
    FROM
        types1
    WHERE
        type1Id = ?
`
app.get("/categories/1/:id/delete", ( req, res ) => {
    db.execute(delete_type1_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/categories/1");
        }
    });
});

// define a route for assignment DELETE
const delete_type2_sql = `
    DELETE 
    FROM
        types2
    WHERE
        type2Id = ?
`
app.get("/categories/2/:id/delete", ( req, res ) => {
    db.execute(delete_type2_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/categories/2");
        }
    });
});

// define a route for assignment DELETE
const delete_type3_sql = `
    DELETE 
    FROM
        types3
    WHERE
        type3Id = ?
`
app.get("/categories/3/:id/delete", ( req, res ) => {
    db.execute(delete_type3_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/categories/3");
        }
    });
});

// define a route for assignment DELETE
const delete_data_sql = `
    DELETE 
    FROM
        data
    WHERE
        dataId = ?
`
app.get("/data/:id/delete", ( req, res ) => {
    db.execute(delete_data_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/data");
        }
    });
});

const create_types1_sql = `
    INSERT INTO types1 
        (type1Name) 
    VALUES 
        (?);
`

app.post("/categories/1", ( req, res ) => {
    db.execute(create_types1_sql, [req.body.title], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (assignmentId) of the newly inserted row.
            res.redirect(`/categories/1`);
        }
    });
});

const create_types2_sql = `
    INSERT INTO types2 
        (type2Name) 
    VALUES 
        (?);
`

app.post("/categories/2", ( req, res ) => {
    db.execute(create_types2_sql, [req.body.title], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (assignmentId) of the newly inserted row.
            res.redirect(`/categories/2`);
        }
    });
});

const create_types3_sql = `
    INSERT INTO types3 
        (type3Name) 
    VALUES 
        (?);
`

app.post("/categories/3", ( req, res ) => {
    db.execute(create_types3_sql, [req.body.title], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (assignmentId) of the newly inserted row.
            res.redirect(`/categories/3`);
        }
    });
});

const create_data_sql = `
insert into data (title, slotId1, slotId2, slotId3) 
select (?, type1Id, type2Id, type3Id)
from types1
join types2 on type2Name = ?
join types3 on type3Name = ?
where types1.type1Name = ?
`

app.post("/data", ( req, res ) => {
    console.log(req.body.slot2)
    db.execute(create_data_sql, [req.body.title, req.body.slot2, req.body.slot3, req.body.slot1], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (assignmentId) of the newly inserted row.
            res.redirect(`/data`);
        }
    });
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );