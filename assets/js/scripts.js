// Pega o elemento do vídeo
const video = document.getElementById('video');

//Carregando os módulos do FaceAPI
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/js/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/js/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/js/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/js/models')
  ]).then(iniciaVideo)

function iniciaVideo(){

    // Pega o conteúdo da camera
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err) // erro...
    )

}

video.addEventListener('play', () => {
    console.log('Lorem ipsum');
})