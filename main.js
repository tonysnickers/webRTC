let localStream;
let remoteStream;
let peerConnection

const init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
    document.getElementById('user-1').srcObject = localStream
    createOffer()
};

const servers = {
    iceServer:[
        {
            url:["stun.12voip.com:3478",  "stun.acrobits.cz:3478"]
        }
    ]
}

const createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
  
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks.forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    // faire un console.log de l'event pour savoir comment il est constitué

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate) {
            
        }
    } 


    const offer = await peerConnection.createOffer()
    // console.log(offer);
    console.log(offer);

    await peerConnection.setLocalDescription(offer)

}
init()