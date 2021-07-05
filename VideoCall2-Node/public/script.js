// const { PeerServer } = require("peer");
// const { text } = require("express");
// const { Socket } = require("dgram");
// const h = require('helpers.js');
// import h from './helpers.js';
function generateRandomString(){
    const crypto = window.crypto || window.msCrypto;
    let array = new Uint32Array(1);

    return crypto.getRandomValues(array);
}


function closeVideo(elemId) {
    if (document.getElementById(elemId)) {
        document.getElementById(elemId).remove();
        this.adjustVideoElemSize();
    }
}


function pageHasFocus() {
    return !(document.hidden || document.onfocusout || window.onpagehide || window.onblur);
}


function getQString(url = '', keyToReturn = '') {
    url = url ? url : location.href;
    let queryStrings = decodeURIComponent(url).split('#', 2)[0].split('?', 2)[1];

    if (queryStrings) {
        let splittedQStrings = queryStrings.split('&');

        if (splittedQStrings.length) {
            let queryStringObj = {};

            splittedQStrings.forEach(function (keyValuePair) {
                let keyValue = keyValuePair.split('=', 2);

                if (keyValue.length) {
                    queryStringObj[keyValue[0]] = keyValue[1];
                }
            });

            return keyToReturn ? (queryStringObj[keyToReturn] ? queryStringObj[keyToReturn] : null) : queryStringObj;
        }

        return null;
    }

    return null;
}


function userMediaAvailable() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}


function getUserFullMedia() {
    if (this.userMediaAvailable()) {
        return navigator.mediaDevices.getUserMedia({
            video: true,
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        });
    }

    else {
        throw new Error('User media not available');
    }
}


function getUserAudio() {
    if (this.userMediaAvailable()) {
        return navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        });
    }

    else {
        throw new Error('User media not available');
    }
}



function shareScreen1() {
    if (this.userMediaAvailable()) {
        return navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: "always"
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            }
        });
    }

    else {
        throw new Error('User media not available');
    }
}


function getIceServer() {
    return {
        iceServers: [
            {
                urls: ["stun:eu-turn4.xirsys.com"]
            },
            {
                username: "ml0jh0qMKZKd9P_9C0UIBY2G0nSQMCFBUXGlk6IXDJf8G2uiCymg9WwbEJTMwVeiAAAAAF2__hNSaW5vbGVl",
                credential: "4dd454a6-feee-11e9-b185-6adcafebbb45",
                urls: [
                    "turn:eu-turn4.xirsys.com:80?transport=udp",
                    "turn:eu-turn4.xirsys.com:3478?transport=tcp"
                ]
            }
        ]
    };
}


function addChat(data, senderType) {
    let chatMsgDiv = document.querySelector('#chat-messages');
    let contentAlign = 'justify-content-end';
    let senderName = 'You';
    let msgBg = 'bg-white';

    if (senderType === 'remote') {
        contentAlign = 'justify-content-start';
        senderName = data.sender;
        msgBg = '';

        this.toggleChatNotificationBadge();
    }

    let infoDiv = document.createElement('div');
    infoDiv.className = 'sender-info';
    infoDiv.innerHTML = `${senderName} - ${moment().format('Do MMMM, YYYY h:mm a')}`;

    let colDiv = document.createElement('div');
    colDiv.className = `col-10 card chat-card msg ${msgBg}`;
    colDiv.innerHTML = xssFilters.inHTMLData(data.msg).autoLink({ target: "_blank", rel: "nofollow" });

    let rowDiv = document.createElement('div');
    rowDiv.className = `row ${contentAlign} mb-2`;


    colDiv.appendChild(infoDiv);
    rowDiv.appendChild(colDiv);

    chatMsgDiv.appendChild(rowDiv);

    /**
     * Move focus to the newly added message but only if:
     * 1. Page has focus
     * 2. User has not moved scrollbar upward. This is to prevent moving the scroll position if user is reading previous messages.
     */
    if (this.pageHasFocus) {
        rowDiv.scrollIntoView();
    }
}


function toggleChatNotificationBadge() {
    if (document.querySelector('#chat-pane').classList.contains('chat-opened')) {
        document.querySelector('#new-chat-notification').setAttribute('hidden', true);
    }

    else {
        document.querySelector('#new-chat-notification').removeAttribute('hidden');
    }
}



function replaceTrack(stream, recipientPeer) {
    let sender = recipientPeer.getSenders ? recipientPeer.getSenders().find(s => s.track && s.track.kind === stream.kind) : false;

    sender ? sender.replaceTrack(stream) : '';
    console.log("here",sender);
}



function toggleShareIcons(share) {
    let shareIconElem = document.querySelector('#share-screen');
    console.log(shareIconElem)
    if (share) {
        shareIconElem.setAttribute('title', 'Stop sharing screen');
        shareIconElem.children[0].classList.add('text-primary');
        shareIconElem.children[0].classList.remove('text-white');
    }

    else {
        shareIconElem.setAttribute('title', 'Share screen');
        shareIconElem.children[0].classList.add('text-white');
        shareIconElem.children[0].classList.remove('text-primary');
    }
}


function toggleVideoBtnDisabled(disabled) {
    document.getElementById('toggle-video').disabled = disabled;
}


function maximiseStream(e) {
    let elem = e.target.parentElement.previousElementSibling;

    elem.requestFullscreen() || elem.mozRequestFullScreen() || elem.webkitRequestFullscreen() || elem.msRequestFullscreen();
}


function singleStreamToggleMute(e) {
    if (e.target.classList.contains('fa-microphone')) {
        e.target.parentElement.previousElementSibling.muted = true;
        e.target.classList.add('fa-microphone-slash');
        e.target.classList.remove('fa-microphone');
    }

    else {
        e.target.parentElement.previousElementSibling.muted = false;
        e.target.classList.add('fa-microphone');
        e.target.classList.remove('fa-microphone-slash');
    }
}


function saveRecordedStream(stream, user) {
    let blob = new Blob(stream, { type: 'video/webm' });

    let file = new File([blob], `${user}-${moment().unix()}-record.webm`);

    saveAs(file);
}


function toggleModal(id, show) {
    let el = document.getElementById(id);

    if (show) {
        el.style.display = 'block';
        el.removeAttribute('aria-hidden');
    }

    else {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', true);
    }
}



function setLocalStream(stream, mirrorMode = true) {
    const localVidElem = document.getElementById('local');

    localVidElem.srcObject = stream;
    mirrorMode ? localVidElem.classList.add('mirror-mode') : localVidElem.classList.remove('mirror-mode');
}


function adjustVideoElemSize() {
    let elem = document.getElementsByClassName('card');
    let totalRemoteVideosDesktop = elem.length;
    let newWidth = totalRemoteVideosDesktop <= 2 ? '50%' : (
        totalRemoteVideosDesktop == 3 ? '33.33%' : (
            totalRemoteVideosDesktop <= 8 ? '25%' : (
                totalRemoteVideosDesktop <= 15 ? '20%' : (
                    totalRemoteVideosDesktop <= 18 ? '16%' : (
                        totalRemoteVideosDesktop <= 23 ? '15%' : (
                            totalRemoteVideosDesktop <= 32 ? '12%' : '10%'
                        )
                    )
                )
            )
        )
    );


    for (let i = 0; i < totalRemoteVideosDesktop; i++) {
        elem[i].style.width = newWidth;
    }
}


function createDemoRemotes(str, total = 6) {
    let i = 0;

    let testInterval = setInterval(() => {
        let newVid = document.createElement('video');
        newVid.id = `demo-${i}-video`;
        newVid.srcObject = str;
        newVid.autoplay = true;
        newVid.className = 'remote-video';

        //video controls elements
        let controlDiv = document.createElement('div');
        controlDiv.className = 'remote-video-controls';
        controlDiv.innerHTML = `<i class="fa fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
            <i class="fa fa-expand text-white expand-remote-video" title="Expand"></i>`;

        //create a new div for card
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card card-sm';
        cardDiv.id = `demo-${i}`;
        cardDiv.appendChild(newVid);
        cardDiv.appendChild(controlDiv);

        //put div in main-section elem
        document.getElementById('videos').appendChild(cardDiv);

        this.adjustVideoElemSize();

        i++;

        if (i == total) {
            clearInterval(testInterval);
        }
    }, 2000);
}




const socket = io('/');
const videoGrid = document.getElementById('video-grid');

var socketId = '';
var myStream = '';
var screen = '';
var recordedStream = [];
var mediaRecorder = '';

const VideoShown = document.createElement('video');
VideoShown.muted = true;


var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

var currentPeer;

const peers = [];
let VideoShownStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    VideoShownStream = stream;
    VideoStream(VideoShown, stream);

    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            VideoStream(video, userVideoStream)
            // currentPeer = call.peerConnection
        })

    })


    socket.on('user-connected', (userId) => {
        console.log("New user connected");
        setTimeout(function () {
            connecToNewUser(userId, stream);
        }, 500)
        peers.push(userId);
    })


    let text = $('input')

    $('html').keydown((e) => {
        if (e.which == 13 && text.val().length !== 0) {
            // console.log(text.val());
            socket.emit('message', text.val());
            text.val('');
        }
    })

    socket.on('createMessage', message => {
        console.log('this is coming from server', message);
        $('ul').append(`<li class="message"><b>Participant</b><br/>${message}</li>`);
        scrollToBottom()
    })

})

peer.on('open', id => {
    // console.log(id);
    socket.emit('join-room', ROOM_ID, id);
})

// document.getElementById("screenShare").addEventListener('click', (e) => {
//     navigator.mediaDevices.getDisplayMedia({
//         video: {
//             cursor: "always"
//         },
//         audio: {
//             echoCancellation: true,
//             noiseSuppression: true
//         }
//     }).then((stream) => {
//         let videoTrack = stream.getVideoTracks()[0];
//         let sender = currentPeer.getSender().find(function(s) {
//             return s.track.kind == videoTrack.kind
//         })
//         sender.replaceTrack(videoTrack)
//     }).catch((err) => {
//         console.log("unable to get display media" + err);
//     })
// })


const connecToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', (userVideoStream) => {
        VideoStream(video, userVideoStream)
        // currentPeer = call.peerConnection
    });
}


const VideoStream = (video, stream) => {
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

// Mute video
const muteUnmute = () => {
    console.log(VideoShownStream);
    const enabled = VideoShownStream.getAudioTracks()[0].enabled;
    if (enabled) {
        VideoShownStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    }
    else {
        setMuteButton();
        VideoShownStream.getAudioTracks()[0].enabled = true;

    }
}

const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
    document.querySelector('.main-mute-button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
    document.querySelector('.main-mute-button').innerHTML = html;
}

//video on-off
const playStop = () => {
    // console.log(VideoShownStream);
    let enabled = VideoShownStream.getVideoTracks()[0].enabled;
    if (enabled) {
        VideoShownStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    }
    else {
        setStopVideo();
        VideoShownStream.getVideoTracks()[0].enabled = true;

    }
}

const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main-video-button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main-video-button').innerHTML = html;
}


$('#chat').on('click', function () {
    animateDiv();
})

$(document).keyup(function (e) {
    if (e.keyCode === 27 && $('.main-right').hasClass('visible')) {
        animateDiv();
    }
})

function animateDiv() {
    $('.main-right').toggleClass('visible');
    $('.main-right').animate({
        width: 'toggle',
    }, 500);
}


function shareScreen() {
    shareScreen1().then((stream) => {
        // toggleShareIcons(true);

        //disable the video toggle btns while sharing screen. This is to ensure clicking on the btn does not interfere with the screen sharing
        //It will be enabled was user stopped sharing screen
        // toggleVideoBtnDisabled(true);

        //save my screen stream
        screen = stream;

        //share the new stream with all partners
        broadcastNewTracks(stream, 'video', false);

        //When the stop sharing button shown by the browser is clicked
        screen.getVideoTracks()[0].addEventListener('ended', () => {
            stopSharingScreen();
        });
    }).catch((e) => {
        console.error(e);
    });
}


function stopSharingScreen() {
    //enable video toggle btn
    toggleVideoBtnDisabled(false);

    return new Promise((res, rej) => {
        screen.getTracks().length ? screen.getTracks().forEach(track => track.stop()) : '';

        res();
    }).then(() => {
        toggleShareIcons(false);
        broadcastNewTracks(myStream, 'video');
    }).catch((e) => {
        console.error(e);
    });
}


function broadcastNewTracks(stream, type, mirrorMode = true) {
    setLocalStream(stream, mirrorMode);

    let track = type == 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
    console.log("aaa",track,peers,stream.getVideoTracks());
    for (let p in peers) {
        let pName = peers[p];

        if (typeof peers[pName] == 'object') {
            replaceTrack(track, peers[pName]);
        }
    }
}

//When user clicks the 'Share screen' button
document.getElementById('share-screen').addEventListener('click', (e) => {
    e.preventDefault();

    if (screen && screen.getVideoTracks().length && screen.getVideoTracks()[0].readyState != 'ended') {
        stopSharingScreen();
    }

    else {
        shareScreen();
    }
});


// var Peer = window.SimplePeer;
// var socket = io.connect();

// var initiateBtn = document.getElementById('initiateBtn');
// var stopBtn = document.getElementById('stopBtn');
// var initiator = false;

// const stunServerConfig = {
//   iceServers: [{
//     url: 'turn:13.250.13.83:3478?transport=udp',
//     username: "YzYNCouZM1mhqhmseWk6",
//     credential: "YzYNCouZM1mhqhmseWk6"
//   }]
// };

// initiateBtn.onclick = (e) => {
//   initiator = true;
//   socket.emit('initiate');
// }

// stopBtn.onclick = (e) => {
//   socket.emit('initiate');
// }

// socket.on('initiate', () => {
//   startStream();
//   initiateBtn.style.display = 'none';
//   stopBtn.style.display = 'block';
// })

// function startStream () {
//   if (initiator) {
//     // get screen stream
//     navigator.mediaDevices.getUserMedia({
//       video: {
//         mediaSource: "screen",
//         width: { max: '1920' },
//         height: { max: '1080' },
//         frameRate: { max: '10' }
//       }
//     }).then(gotMedia);
//   } else {
//     gotMedia(null);
//   }
// }

// function gotMedia (stream) {
//   if (initiator) {
//     var peer = new Peer({
//       initiator,
//       stream,
//       config: stunServerConfig
//     });
//   } else {
//     var peer = new Peer({
//       config: stunServerConfig
//     });
//   }

//   peer.on('signal', function (data) {
//     socket.emit('offer', JSON.stringify(data));
//   });

//   socket.on('offer', (data) => {
//     peer.signal(JSON.parse(data));
//   })

//   peer.on('stream', function (stream) {
//     // got remote video stream, now let's show it in a video tag
//     var video = document.querySelector('video');
//     video.srcObject = stream;
//     video.play();
//   })
// }