const express = require('express'),
      fs      = require('node:fs'),
      mime    = require('mime-types'),
      MongoClient = require('mongodb').MongoClient;

const port = 3000;
const app  = express();

const passport = require('passport');
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy


app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}));

app.use(passport.initialize()); 
app.use(passport.session());
app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    fullURL = `http://${req.hostname}${req.originalUrl}`

    console.log( `${req.method} ${fullURL}` );

    next();
});

authUser = (user, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${user}`)         //passport will populate, user = req.body.username
    console.log(`Value of "Password" in authUser function ----> ${password}`) //passport will popuplate, password = req.body.password

    let authenticated_user = { id: 123, name: "Kyle"} 
    
    return done (null, authenticated_user ) 
}

passport.use(new LocalStrategy (authUser));

passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     

    done(null, user.id)  
});

// database connection
const url = "mongodb://localhost:27017/";
const dbconnect = new MongoClient(url);
let collection = null;

async function run() {
    await dbconnect.connect().then(() => console.log("Connection to MongoDB established!"));
    const account_collection = await dbconnect.db("a3-cs4241").collection("accounts");
    const item_collection = await dbconnect.db("a3-cs4241").collection("item_data");

    // server side rendering
    app.get('/data', async (req, res) => {
        const accounts_array = await account_collection.find({}).toArray();
        const items_array = await item_collection.find({}).toArray();
        const results = accounts_array.concat(items_array);
        res.send(results);
    })

    app.get('/data/item', async (req, res) => {
        const results = await item_collection.find({}).toArray();
        res.send(results);
    })

    app.post('/login/submit', passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
    }));


    app.post('/signup/submit', async (req, res) => {
        let dataString = "";

        req.on( "data", function( data ) {
            dataString += data;
            const account = JSON.parse(dataString);
            account_collection.insertOne(account, (err, res) => {
                if (err) throw err;
                console.log("1 document inserted");
            });
            res.send("signed up");
        })
    })

    app.get('/remove', async (req, res) => {
        const results = await collection.deleteMany({ })

        let body = `
            <html><body>
            <h1>Remove</h1>
            All cars were removed.
            </body></html>
        `
        console.log(results);
        res.send(body);
    })
}
const appRun = run();

// routing
function sendFile( response, filename ) {
    const type = mime.lookup( filename );
    fs.readFile( filename, function( err, content ) {

        // if the error = null, then we've loaded the file successfully
        if( err === null ) {

            // status code: https://httpstatuses.com
            response.writeHeader( 200, { "Content-Type": type });
            response.end( content );

        } else {

            // file not found, error code 404
            response.writeHeader( 404 );
            response.end( "404 Error: File Not Found" );

        }
    })
}

app.get('/([A-z][a-z])*/', (req, res, err) => {
    sendFile( res, "./public/index.html" );
});


app.listen(port, (err) => {
    if (err) {
        console.error("Something went wrong here.");
    }

    console.log(`Server listening at localhost:${port}`)
});
