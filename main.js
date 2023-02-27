const cam = document.querySelector('#video')

promise.all ( [
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('models'),
]).then(starVideo)

async function starVideo () {
    const contraitns = { vide : true }

    try {
        let stream = await navigator.mediaDevices.getUserMedia(contraitns)

        cam.srcObject = stream 
        cam.onloadedmetadata = () => { 
            cam.play()
        }
    } catch (error) {
        console.error(error) 
    }
}

cam.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(cam)
    document.body.append(canvas) 

    const displaySize = { width: cam.width, height: cam.height}

    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {

        const detection = await faceapi.detectAllFaces(
            cam,
            new faceapi.tinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.drae.drawFaceLandmarks(canvas, resizedDetections)
        faceapi,draw.drawFaceExpressions(canvas, resizedDetections)
    
    },100)
})

