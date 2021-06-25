// const { PeerServer } = require("peer");

// const { text } = require("express");

// const { Socket } = require("dgram");
const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

const peers = {};
let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })

    })

    socket.on('user-connected', (userId) => {
        console.log("New user connected");
        connecToNewUser(userId, stream);
    })

    socket.on("user-connected", (userId) => {
        setTimeout(function () {
            connecToNewUser(userId, stream);
        }, 5000)
    })


    let text = $('input')
    // console.log(text)

    $('html').keydown((e) => {
        if (e.which == 13 && text.val().length !== 0) {
            // console.log(text.val());
            socket.emit('message', text.val());
            text.val('');
        }
    })

    socket.on('createMessage', message => {
        console.log('this is coming from server',message);
        $('ul').append(`<li class="message"><b>user</b><br/>${message}</li>`);
        scrollToBottom()
    })
})

peer.on('open', id => {
    // console.log(id);
    socket.emit('join-room', ROOM_ID, id);
})


const connecToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
    });
}



const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

const scrollToBottom = () => {
    let d = $('.main-chat-window');
    d.scrollTop(d.prop("scrollHeight"));
}
