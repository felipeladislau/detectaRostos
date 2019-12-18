const video = document.getElementById('video');

function iniciaVideo(){

    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )

}

iniciaVideo()