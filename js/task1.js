/* JS Quiz Arena- a quiz app
1. SHow one question at a time with 4 clickable options, a progress line("Q3/25"), and a live score.
2. After a click, turn the chosen option green or red, reveal the correct one, show the explanation, and lock the other options.
3. Include Next and restart buttons. At the end, show the final score and a rating message.
4. Add a 30 second countdown per question. When it hits 0, auto-lock the question and reveal the answer
5. Add a "Review wrong answers" screen at the end. */
var questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language", "Hyperlinks Text Mode"],
        answer: 0,
        explanation: "HTML is used to create the structure of web pages."
    },
    {
        question: "Which language is used to style a webpage?",
        options: ["Java", "CSS", "Python", "C++"],
        answer: 1,
        explanation: "CSS is used to style webpages."
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["print", "echo", "let", "show"],
        answer: 2,
        explanation: "The let keyword declares a variable."
    },
    {
        question: "Which symbol starts a single-line JavaScript comment?",
        options: ["//", "<!--", "##", "**"],
        answer: 0,
        explanation: "Two forward slashes start a single-line comment."
    },
    {
        question: "Which method prints a message in the console?",
        options: ["console.log()", "print()", "show()", "display()"],
        answer: 0,
        explanation: "console.log() displays information in the console."
    }
];
var current = 0;
var score = 0;
var time = 30;
var timer;
var answered = false;
var wrongAnswers = [];
function showQuestion() {
    clearInterval(timer);
    answered = false;
    time = 30;
    document.getElementById("progress").innerText =
        "Q" + (current + 1) + "/" + questions.length;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("timer").innerText = "Time: " + time + " seconds";
    document.getElementById("progress-line").style.width =
        ((current + 1) / questions.length * 100) + "%";
    document.getElementById("question").innerText =
        questions[current].question;
    document.getElementById("explanation").innerText = "";
    document.getElementById("next-btn").style.display = "none";
    var optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    for (var i = 0; i < 4; i++) {
        var btn = document.createElement("button");
        btn.innerText = questions[current].options[i];
        btn.className = "option";
        btn.onclick = function() {
            checkAnswer(this);
        };
        optionsDiv.appendChild(btn);
    }
    timer = setInterval(function() {
        time--;
        document.getElementById("timer").innerText =
            "Time: " + time + " seconds";
        if (time === 0) {
            clearInterval(timer);
            checkAnswer(null);
        }
    }, 1000);
}
function checkAnswer(button) {
    if (answered) {
        return;
    }
    answered = true;
    clearInterval(timer);
    var correct = questions[current].answer;
    var buttons = document.getElementsByClassName("option");
    var selected = -1;
    if (button !== null) {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i] === button) {
                selected = i;
            }
        }
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === correct) {
            buttons[i].classList.add("correct");
        }
    }
    if (selected === correct) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
    } else {
        if (button !== null) {
            button.classList.add("wrong");
        }
        wrongAnswers.push({
            question: questions[current].question,
            selected: selected === -1 ? "No answer" : questions[current].options[selected],
            correct: questions[current].options[correct]
        });
    }
    document.getElementById("explanation").innerText =
        "Explanation: " + questions[current].explanation;
    document.getElementById("next-btn").style.display = "inline-block";
    if (current === questions.length - 1) {
        document.getElementById("next-btn").innerText = "Finish";
    }
}
function nextQuestion() {
    if (!answered) {
        return;
    }
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    clearInterval(timer);
    document.getElementById("quiz-screen").classList.add("hide");
    document.getElementById("result-screen").classList.remove("hide");
    document.getElementById("final-score").innerText =
        "Your Score: " + score + "/" + questions.length;
    var percentage = score / questions.length * 100;
    if (percentage >= 80) {
        document.getElementById("rating").innerText = "Excellent!";
    } else if (percentage >= 60) {
        document.getElementById("rating").innerText = "Good job!";
    } else if (percentage >= 40) {
        document.getElementById("rating").innerText = "Keep practising!";
    } else {
        document.getElementById("rating").innerText = "Try again!";
    }
}
function reviewAnswers() {
    document.getElementById("result-screen").classList.add("hide");
    document.getElementById("review-screen").classList.remove("hide");
    var list = document.getElementById("wrong-list");
    list.innerHTML = "";
    if (wrongAnswers.length === 0) {
        list.innerText = "You got all answers correct!";
    }
    for (var i = 0; i < wrongAnswers.length; i++) {
        var p = document.createElement("p");
        p.innerText =
            "Question: " + wrongAnswers[i].question +
            "\nYour answer: " + wrongAnswers[i].selected +
            "\nCorrect answer: " + wrongAnswers[i].correct;
        list.appendChild(p);
    }
}
function restartQuiz() {
    clearInterval(timer);
    current = 0;
    score = 0;
    time = 30;
    answered = false;
    wrongAnswers = [];
    document.getElementById("quiz-screen").classList.remove("hide");
    document.getElementById("result-screen").classList.add("hide");
    document.getElementById("review-screen").classList.add("hide");
    showQuestion();
}
showQuestion();
