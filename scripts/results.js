const urlParams = new URLSearchParams(window.location.search);
const xAxis = parseFloat(urlParams.get("right"));
const yAxis = parseFloat(urlParams.get("strict"));

const canvasElement = document.createElement("canvas");
canvasElement.width = 1850;
canvasElement.height = 1600;

const imageElement = new Image();
imageElement.src = "./compass.png";

const bannerElement = document.getElementById("banner");

function drawCanvas() {
    const ctx = canvasElement.getContext("2d");
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, 1850, 1600);
    ctx.drawImage(imageElement, 0, 0);

    const dot = canvasElement.getContext("2d");
    dot.beginPath();
    dot.arc(425 + (1000 * (xAxis + 10) / 20), 1150 - (1000 * (yAxis + 10) / 20), 25, 0, 2 * Math.PI);
    dot.fillStyle = 'red';
    dot.fill();
    dot.stroke();

    ctx.font = "6em Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#222222";
    ctx.fillText("Progressive / Traditional Axis (x): " + xAxis, 925, 1375);
    ctx.fillText("Lenient / Strict Axis (y): " + yAxis, 925, 1450);
    ctx.textAlign = "right";
    ctx.font = "5.75em Georgia, serif";
    ctx.fillText("strawberrymaster.github.io/HHWValues", 1820, 1560);

    bannerElement.src = canvasElement.toDataURL();
}

imageElement.onload = function () {
    drawCanvas();
};

window.requestAnimationFrame(drawCanvas);