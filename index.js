window.addEventListener('load', () => {

    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    const colorButtons = document.querySelectorAll('.palette > button');
    const widthButtons = document.querySelectorAll('.line > button');
    const saveHeader = document.querySelector('header');
    const clearButton = document.querySelector('#clear-canvas-button');

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let PAINTING = false;
    let STROKE_COLOR = 'black'
    let STROKE_WIDTH = 10

    const startPosition = (e) => {
        PAINTING = true;
        draw(e)
    }
    const finishedPosition = () => {
        PAINTING = false;
        context.beginPath();
    }
    const draw = (e) => {
        if (!PAINTING) return;
        context.lineWidth = STROKE_WIDTH;
        context.lineCap = "round";
        context.strokeStyle = STROKE_COLOR
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }
    const changeColor = () => {
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                STROKE_COLOR = btn.value
            })
        });
    }
    const changeWidth = () => {
        widthButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                STROKE_WIDTH = btn.value
            })
        });
    }
    const clearCanvas = () => {
        clearButton.addEventListener('click', () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        });
    }
    const saveDrawing = () => {
        saveHeader.addEventListener('click', () => {
            const image = canvas.toDataURL();
            const tmpLink = document.createElement('a');
            tmpLink.download = 'image.png';
            tmpLink.href = image;
            document.body.appendChild(tmpLink);
            tmpLink.click();
            document.body.removeChild(tmpLink);
        });
    }

    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', finishedPosition)
    canvas.addEventListener('mousemove', draw)

    changeColor();
    changeWidth();
    clearCanvas();
    saveDrawing();
});
