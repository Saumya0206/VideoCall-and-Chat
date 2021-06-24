
const express= require('express');
const app= express();
const server = require('http').Server(app);
// const { v4: uuidv4 } = require('uuid');

// app.set('view engine','ejs');
// app.use(express.static('public'));

app.get('/',(req,res)=>{
    // res.redirect(`V${uuidv4()}`);
    res.status(200).send("Hello world");
})

// app.get('/:room',(req,res)=>{
//     res.render('room', { roomId: req.params.room})
// })



server.listen(3030);

