let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );


app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );


io.of( '/stream' ).on( 'connection', stream );

const port = process.env.PORT || 3030 ;
server.listen(port,()=>{  // do not add localhost here if you are deploying it
    console.log("server listening to port "+port);
});