const express   = require('express');
const passport  = require('passport');
const fs        = require('node:fs');
const mime      = require('mime-types');
const mongoose  = require('mongoose');
const Account   = require('../models/account');
const Item      = require('../models/item');
const router    = express();


router.get('/data', async (req, res) => { 
    //console.log(await mongoose.connection.listCollections());
    const account_data = await Account.find({}).exec();
    const item_data = await Item.find({}).exec();
    const data = [];
    data.push(account_data, item_data);
    res.status(200).send(JSON.stringify(data)); 
});

router.post('/register', (req, res) => {
    Account.register({"username": req.body.username, "active": true}, req.body.password, (err) => {
        if (err) { 
            res.sendStatus(422);
        } else {
            res.sendStatus(200);
        }
    });
});

router.post('/login', passport.authenticate('local', { failureMessage: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) { 
            return next(err);
        } 
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        return next();
    });
});

router.get('/([A-z][a-z])*/', (req, res, err) => {
    sendFile( res, "./public/index.html" );
});

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

module.exports = router;
