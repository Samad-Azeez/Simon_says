let started = false;
let level = 0;
let gamePattern = [];
let userClickedPattern = [];

const buttons = document.querySelectorAll(".btn");
const body = document.querySelector("body");

// Start Game
document.addEventListener("keydown", () => {
    if (!started) {
        started = true;
        getNext();
    }
});

function restartGame() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}

function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                getNext();
            }, 1000);
        }
    } else {
        playSound("wrong");
        setTitle("Game Over, Press Any Key to Restart");
        body.classList.add("game-over");
        setTimeout(() => {
            body.classList.remove("game-over");
        }, 100);
        restartGame();
    }
}

buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const color = e.target.id;
        animateBtn(e.target);
        playSound(color);
        userClickedPattern.push(color);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function getNext() {
    userClickedPattern = [];
    level++;
    setTitle("Level " + level);
    const randNum = Math.floor(Math.random() * 4);
    const selectedBtn = buttons[randNum];
    playSound(selectedBtn.id);
    animateBtn(selectedBtn);
    gamePattern.push(selectedBtn.id);
}

function setTitle(value) {
    const levelTitle = document.getElementById("level-title");
    levelTitle.innerText = value;
}

function playSound(color) {
    const audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}

function animateBtn(btn) {
    btn.classList.add("pressed");
    setTimeout(function () {
        btn.classList.remove("pressed");
    }, 100);
}