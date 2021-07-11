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

// io.on('connection', socket => {
//     socket.on('join-room', (roomId, userId) => {
//         socket.join(roomId);
//         socket.broadcast.to(roomId).emit('user-connected', userId);

//         socket.on('message', message => {
//             io.to(roomId).emit('createMessage', message);
            
            
//         })
//     })
//     socket.on('screen-share', () => {
//         io.emit('screen-share');
//     });

//     socket.on('screen-share', (userId) => {
//         socket.broadcast.to(roomId).emit('screen-share', data);
//     });

// })

io.of( '/stream' ).on( 'connection', stream );

server.listen(3000 );
// process.env.PORT||
