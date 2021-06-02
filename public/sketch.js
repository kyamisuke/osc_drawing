var socket;

function setup() {
    createCanvas(600, 400);
    background(51);

    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
    socket.on('ZIGSIM/SyuFyMxNClLa0loa/touch01', newDeviceDrawing);
    socket.on('pads', newOperated);
}

function newDrawing(data) {
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 30, 30);
}

function newDeviceDrawing(data) {
    console.log("iPhone is coming!! data: " + data);
}

function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 30, 30);
}

function controllerOperated(pads) {
    console.log(pads);

    socket.emit('pads', pads);
}

function newOperated(data) {
    console.log(data);
}

function draw() {
    var pads = navigator.getGamepads ? navigator.getGamepads() :
        (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    pads = pads[0];
    if (pads) {
        controllerOperated(pads);
    }
}
