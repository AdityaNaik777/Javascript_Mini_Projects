let gameSequence = [];
let userSequence = [];
let Score;
let btns = ["green", "purple", "red", "blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started!");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 500);
}

function levelUp() {
  // resetting user sequence
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  // choosing random Color
  let randIndex = Math.floor(Math.random() * 3);
  let randomColor = btns[randIndex];
  let randBtn = document.querySelector(`.${randomColor}`);

  // console.log(randIndex);
  // console.log(randomColor);
  // console.log(randBtn);
  gameSequence.push(randomColor);
  console.log(gameSequence);

  gameFlash(randBtn);
}

function checkAnswer(index) {
  // console.log("Current Level :",level);
  // let index=level-1;
  if (userSequence[index] === gameSequence[index]) {
    // if user enters the last color
    if (userSequence.length === gameSequence.length) {
      // levelUp()
      setTimeout(levelUp, 1000);
    }
    // console.log("Same Value");
  } else {
    console.log("Game Over");
    // h2.innerText=`Game Over, your score is ${level-1} Press any key to start`
    h2.innerHTML = `
    Game Over!
    Your score was ${level}<br>Press any key to start
    `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}
function btnPress() {
  let btn = this;
  console.log(btn);
  // btnFlash(btn);
  userFlash(btn);

  userColor = btn.getAttribute("id");
  console.log(userColor);

  userSequence.push(userColor);

  checkAnswer(userSequence.length - 1);
}

let btnAll = document.querySelectorAll(".btn");
for (btn of btnAll) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
