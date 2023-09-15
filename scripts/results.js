const urlParams = new URLSearchParams(window.location.search);
const xAxis = parseFloat(urlParams.get("right"));
const yAxis = parseFloat(urlParams.get("strict"));

const CANVAS_WIDTH = 1850;
const CANVAS_HEIGHT = 1600;
const FONT_FAMILY = "Georgia, serif";

const canvasElement = document.createElement("canvas");
canvasElement.width = CANVAS_WIDTH;
canvasElement.height = CANVAS_HEIGHT;

const imageElement = new Image();
imageElement.src = "./assets/compass.png";

const bannerElement = document.getElementById("banner");

const drawText = (ctx, text, x, y, align = "left", color = "#fff", fontSize = "5.75em") => {
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.font = `${fontSize} ${FONT_FAMILY}`;
    ctx.fillText(text, x, y);
};

const drawCanvas = () => {
    const ctx = canvasElement.getContext("2d");
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imageElement, 0, 100);
    
    ctx.fillStyle = "#c03";
    ctx.fillRect(0, 0, CANVAS_WIDTH, 100);

    drawText(ctx, "HHWValues", 30, 70);
    drawText(ctx, "strawberrymaster.github.io/HHWValues", 1820, 70, "right");

    ctx.beginPath();
    ctx.arc(425 + (1000 * (xAxis + 10) / 20), 1250 - (1000 * (yAxis + 10) / 20), 25, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();

    drawText(ctx, `Progressive / Traditional Axis (x): ${xAxis}`, 925, 1465, "center", "#222222", "6em");
    drawText(ctx, `Lenient / Strict Axis (y): ${yAxis}`, 925, 1540, "center", "#222222", "6em");

    bannerElement.src = canvasElement.toDataURL();
};

imageElement.onload = () => window.requestAnimationFrame(drawCanvas);