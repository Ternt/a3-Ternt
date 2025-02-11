const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const port = 3000;
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res, err) => {
    const filename = dir + req.url.slice( 1 )

    if( req.url === "/" ) {
        sendFile( res, "public/index.html" );
    }
    else if( req.url === "/results" ) {
        sendFile( res, "public/index.html" );
    }
    else{
        sendFile( res, filename );
    }
});


const sendFile = function( response, filename ) {
    const type = mime.getType( filename )
    console.log(filename, type);

    fs.readFile( filename, function( err, content ) {

        // if the error = null, then we've loaded the file successfully
        if( err === null ) {

            // status code: https://httpstatuses.com
            response.writeHeader( 200, { "Content-Type": type })
            response.end( content )

        } else {

            // file not found, error code 404
            response.writeHeader( 404 )
            response.end( "404 Error: File Not Found" )

        }
    })
}


const url = "mongodb://localhost:27017/";
const dbconnect = new MongoClient(url);
let collection = null;

async function run() {
    await dbconnect.connect().then(() => console.log("Connected!"));
    collection = await dbconnect.db("cs4241").collection("game_data");

    // server side rendering
    app.get('/display', async (req, res) => {
        const results = await collection.find({}).toArray();
        console.log(results);
        let body = `<html><body><h1>Cars Data</h1>${JSON.stringify(results)}</body></html>`;
        res.send(body);
    })

    // The following code would add a new car
    // You would want to modify the code to accept form data from the client before inserting the car
    app.get('/add', async (req, res) => {
        let newCar = {"_id": 200, "make": "Jeep", "model": "Cherokee"};
        let body = `
            <html><body>
            <h1>Add New Car</h1>
            ${JSON.stringify(newCar)}
            </body></html>
        `
        const results = await collection.insertOne(newCar);
        console.log(results);
        res.send(body);
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

app.listen(3000);
