var moveSpeed = 25;
var createRobberSpeed = 1000;
var createHeartSpeed = 10000;
var boostRobbersSpeed = 7000;
var level = 0;
var step = 5;

//
var displayHeight = 0;
var displayWidth = 0;
var marginTopRemove = 0;
var score = -1;
var life = 4;
//
var intervalCreateRobbers;
var intervalCreateHeart;
var intervalMoveRobbers;
var intervalBoostRobbers;

//
function CreateRobber() {
  document.getElementById("game-space").innerHTML +=
    "<img src='images/robber-" +
    getRandomInt(1, 5) +
    ".png' class='movableObj' onmousedown='KillRobber(this)' style='position: absolute; display: block; margin-top:" +
    (displayHeight - 125) +
    "px; margin-left:" +
    getRandomInt(0, displayWidth - 75) +
    "px; width: 75px; height: 75px;'></img>";
}

function CreateHeart() {
  document.getElementById("game-space").innerHTML +=
    "<img src='images/heart.png' class='movableObj' onmousedown='GetHeart(this)' style='position: absolute; display: block; margin-top:" +
    (displayHeight - 125) +
    "px; margin-left:" +
    getRandomInt(0, displayWidth - 75) +
    "px; width: 75px; height: 75px;'></img>";
}

function MoveRobber() {
  var imgMovableObj = document.getElementsByClassName("movableObj");
  for (let i = 0; i < imgMovableObj.length; i++) {
    var mt = +window.getComputedStyle(imgMovableObj[i]).marginTop.slice(0, -2);
    if (mt <= marginTopRemove) {
      if (RemoveHeart() <= 0) {
        EndGame();
      }
      imgMovableObj[i].remove();
    } else {
      imgMovableObj[i].style.marginTop = mt - step + "px";
    }
  }
}

function KillRobber(robber) {
  robber.remove();
  AddScore();
}
function GetHeart(heart) {
  heart.remove();
  AddHeart();
}
function Load() {
  window.addEventListener("resize", () => {
    document.body.style.height = window.innerHeight - 80 + "px";
    displayHeight = document.getElementById("game-space").scrollHeight;
    displayWidth = document.getElementById("game-space").scrollWidth;
    document.getElementById('lvl-counter').style = "text-align: center; position: absolute; width:"+displayWidth+"px;";
  });
  AddScore();
  AddHeart();
  AddLvL();
  document.body.style.height = window.innerHeight - 80 + "px";
  displayHeight = document.getElementById("game-space").scrollHeight;
  displayWidth = document.getElementById("game-space").scrollWidth;
  document.getElementById('lvl-counter').style = "text-align: center; position: absolute; width:"+displayWidth+"px;";
  StartCounting();

  delay(4000).then(() => {
    intervalMoveRobbers = setInterval(MoveRobber, moveSpeed);
    intervalCreateRobbers = setInterval(CreateRobber, createRobberSpeed);
    intervalBoostRobbers = setInterval(BoostRobbers, boostRobbersSpeed);
    delay(500).then(() => {
      intervalCreateHeart = setInterval(CreateHeart, createHeartSpeed);
    });
  });
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function StartCounting() {
  var arr = ["3", "2", "1", "GO!"];
  for (let i = 0; i <= arr.length - 1; i++) {
    document.getElementById("game-space").innerHTML +=
      "<span onload='RemoveCount(this)' id='count' style='position:absolute;top: " +
      (displayHeight / 2 - 75) +
      "px; left: " +
      (displayWidth / 2 - 75) +
      "px; font-size: 150px; color:#3F42A2; filter: drop-shadow(0 0 10px crimson);'>" +
      arr[i] +
      "</span>";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.getElementById("count").remove();
  }
}
async function RemoveCount(count) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  count.remove();
}
function BoostRobbers() {
  if (moveSpeed >= 11) {
    moveSpeed--;
    clearInterval(intervalMoveRobbers);
    intervalMoveRobbers = setInterval(MoveRobber, moveSpeed);
  }
  if (createRobberSpeed >= 400) {
    createRobberSpeed -= 50;
    clearInterval(intervalCreateRobbers);
    intervalCreateRobbers = setInterval(CreateRobber, createRobberSpeed);
  }
  AddLvL();
}
function EndGame() {
  clearInterval(intervalCreateRobbers);
  clearInterval(intervalCreateHeart);
  clearInterval(intervalMoveRobbers);
  clearInterval(intervalBoostRobbers);
  document.body.innerHTML = "<div id='block-end_game'><div class='inner-block-end_game'><span id='result-score'>Score: 214</span><a href='newgame.html' class='button'>Start new game</a></div></div>";
  document.getElementById('block-end_game').style += "width: "+displayWidth+"px; height: "+displayHeight+"px;";
  document.getElementById('result-score').textContent = "Score: " + score;
}

function AddScore() {
  document.getElementById("score-text").innerText = ++score;
}

function AddHeart() {
  document.getElementById("score-heart").innerText = ++life;
}

function RemoveHeart() {
  document.getElementById("score-heart").innerText = --life;
  return life;
}

function getRandomInt(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function AddLvL() {
  document.getElementById("lvl-counter").innerText = "Level: " + ++level;
}
