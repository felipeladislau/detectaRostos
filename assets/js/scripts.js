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

// Ouvindo o evento do Play
video.addEventListener('play', () => {

    //Ajuste do canvas da detecção
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)


    //Ouvindo o evento várias vezes.
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    }, 100)
})