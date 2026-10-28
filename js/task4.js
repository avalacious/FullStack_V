var box = document.getElementById("box");
var startBtn = document.getElementById("startBtn");
var startTime;
var delayTimer;
var gameStarted = false;
var green = false;
var bestTime = localStorage.getItem("bestTime");
if (bestTime !== null) {
    document.getElementById("best").innerText = bestTime + " ms";
}
startBtn.onclick = function() {
    clearTimeout(delayTimer);
    gameStarted = true;
    green = false;
    box.classList.remove("green");
    box.style.backgroundColor = "#dddddd";
    box.innerText = "Wait for green!";
    document.getElementById("result").innerText = "";
    var delay = Math.floor(Math.random() * 3000) + 2000;
    delayTimer = setTimeout(function() {
        if (gameStarted) {
            box.classList.add("green");
            box.innerText = "CLICK NOW!";
            startTime = Date.now();
            green = true;
        }
    }, delay);
};
box.onclick = function() {
    if (!gameStarted) {
        return;
    }
    if (!green) {
        clearTimeout(delayTimer);
        gameStarted = false;
        box.innerText = "Too early! Try again.";
        document.getElementById("result").innerText = "You clicked too early!";
    }
    else {
        var reactionTime = Date.now() - startTime;
        gameStarted = false;
        green = false;
        box.innerText = "Well done!";
        document.getElementById("result").innerText =
            "Your reaction time: " + reactionTime + " ms";
        if (bestTime === null || reactionTime < Number(bestTime)) {
            bestTime = reactionTime;

            localStorage.setItem("bestTime", bestTime);

            document.getElementById("best").innerText =
                bestTime + " ms";
        }
    }
};
