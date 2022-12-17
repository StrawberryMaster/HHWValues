const numOfQuestionsElement = document.getElementById("numOfQuestions");
numOfQuestionsElement.textContent = questions.length;

function drawCanvas() {
  const c = document.createElement("canvas");
  c.width = 1850;
  c.height = 1300;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#EEEEEE";
  ctx.fillRect(0, 0, 1850, 1300);

  const background = new Image();
  background.onload = function () {
    ctx.drawImage(background, 0, 0);
    document.getElementById("banner").src = c.toDataURL();
  };
  background.src = "./compass.png";
}

document.addEventListener("DOMContentLoaded", drawCanvas);