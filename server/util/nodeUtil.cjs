const fs        = require('node:fs');
const path      = require('node:path');
const mime      = require('mime-types');

const root = path.resolve(__dirname, '../../');

function fromRoot(dirpath) {
    return path.join(root, dirpath);
}

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

module.exports = {
    root: root,
    fromRoot: fromRoot,
    sendFile: sendFile,
}