var game = document.getElementById("game");
var cells = document.querySelectorAll(".cell");
var score = 0;
var time = 30;
var gameRunning = false;
var moleInterval;
var timeInterval;
document.getElementById("startBtn").onclick = function() {
    clearInterval(moleInterval);
    clearInterval(timeInterval);
    score = 0;
    time = 30;
    gameRunning = true;
    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    document.getElementById("message").innerText = "Game Started!";
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove("mole");
    }
    moleInterval = setInterval(function() {
        var random = Math.floor(Math.random() * 9);
        for (var i = 0; i < cells.length; i++) {
            cells[i].classList.toggle("mole", i === random);
        }
    }, 800);
    timeInterval = setInterval(function() {
        time--;
        document.getElementById("time").innerText = time;
        if (time === 0) {
            clearInterval(moleInterval);
            clearInterval(timeInterval);
            gameRunning = false;
            for (var i = 0; i < cells.length; i++) {
                cells[i].classList.remove("mole");
            }
            document.getElementById("message").innerText =
                "Game Over! Your score is " + score;
        }
    }, 1000);
};
game.onclick = function(event) {
    if (gameRunning && event.target.classList.contains("mole")) {
        score++;
        document.getElementById("score").innerText = score;
        event.target.classList.remove("mole");
    }
};
