const CANVAS_WIDTH = 1850;
const CANVAS_HEIGHT = 1300;
const BACKGROUND_COLOR = "#eee"
const BACKGROUND_IMAGE_PATH = "./assets/compass.png";
const BANNER_ELEMENT_ID = "banner";

const numOfQuestionsElement = document.getElementById("numOfQuestions");
const numOfQuestions = questionsOrder.length;
numOfQuestionsElement.textContent = numOfQuestions;

const createCanvas = () => {
    const c = document.createElement("canvas");
    c.width = CANVAS_WIDTH;
    c.height = CANVAS_HEIGHT;
    const ctx = c.getContext("2d");
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return { c, ctx };
};

const loadAndDrawBackground = (ctx, c) => {
    const background = new Image();
    background.onload = () => {
        ctx.drawImage(background, 0, 0);
        document.getElementById(BANNER_ELEMENT_ID).src = c.toDataURL();
    };
    background.src = BACKGROUND_IMAGE_PATH;
};

const drawCanvas = () => {
    const { c, ctx } = createCanvas();
    loadAndDrawBackground(ctx, c);
};

document.addEventListener("DOMContentLoaded", drawCanvas);