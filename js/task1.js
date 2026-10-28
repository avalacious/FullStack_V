/* JS Quiz Arena- a quiz app
1. SHow one question at a time with 4 clickable options, a progress line("Q3/25"), and a live score.
2. After a click, turn the chosen option green or red, reveal the correct one, show the explanation, and lock the other options.
3. Include Next and restart buttons. At the end, show the final score and a rating message.
4. Add a 30 second countdown per question. When it hits 0, auto-lock the question and reveal the answer
5. Add a "Review wrong answers" screen at the end. */


var questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0,
        explanation: "HTML is used to create the structure of web pages."
    },
    {
        question: "Which language is used to style web pages?",
        options: ["Java", "CSS", "Python", "C++"],
        answer: 1,
        explanation: "CSS controls the colors, layout and appearance of a webpage."
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["print", "echo", "let", "display"],
        answer: 2,
        explanation: "The let keyword declares a variable in JavaScript."
    },
    {
        question: "Which symbol is used for a comment in JavaScript?",
        options: ["<!-- -->", "//", "**", "##"],
        answer: 1,
        explanation: "Two forward slashes start a single-line JavaScript comment."
    },
    {
        question: "Which method displays a message in the console?",
        options: [
            "console.log()",
            "print()",
            "show()",
            "writeConsole()"
        ],
        answer: 0,
        explanation: "console.log() prints information in the browser console."
    }
];

var currentQuestion = 0;
var score = 0;
var timeLeft = 30;
var timer;
var answered = false;
var wrongAnswers = [];

// Show the current question
function showQuestion() {
    clearInterval(timer);

    answered = false;
    timeLeft = 30;

    document.getElementById("timer").innerText =
        "Time: " + timeLeft + "s";

    document.getElementById("progress").innerText =
        "Question " + (currentQuestion + 1) + "/" + questions.length;

    document.getElementById("score").innerText =
        "Score: " + score;

    document.getElementById("progress-line").style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    document.getElementById("question").innerText =
        questions[currentQuestion].question;

    document.getElementById("explanation").innerText = "";

    document.getElementById("next-btn").style.display = "none";

    var optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    for (var i = 0; i < questions[currentQuestion].options.length; i++) {
        var button = document.createElement("button");

        button.innerText = questions[currentQuestion].options[i];
        button.className = "option";

        button.onclick = checkAnswer.bind(null, i);

        optionsDiv.appendChild(button);
    }

    startTimer();
}

// Start the 30-second countdown
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;

        document.getElementById("timer").innerText =
            "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
}

// Check the selected answer
function checkAnswer(selected) {
    if (answered) {
        return;
    }

    answered = true;
    clearInterval(timer);

    var correct = questions[currentQuestion].answer;
    var buttons = document.querySelectorAll(".option");

    // Lock all options and reveal the correct answer
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;

        if (i === correct) {
            buttons[i].classList.add("correct");
        }
    }

    if (selected === correct) {
        score++;
        document.getElementById("score").innerText =
            "Score: " + score;
    } else {
        if (selected !== -1) {
            buttons[selected].classList.add("wrong");
        }

        wrongAnswers.push({
            question: questions[currentQuestion].question,
            selected: selected === -1
                ? "Time ran out"
                : questions[currentQuestion].options[selected],
            correct: questions[currentQuestion].options[correct]
        });
    }

    document.getElementById("explanation").innerText =
        "Explanation: " + questions[currentQuestion].explanation;

    document.getElementById("next-btn").style.display = "inline-block";

    if (currentQuestion === questions.length - 1) {
        document.getElementById("next-btn").innerText = "See Results";
    } else {
        document.getElementById("next-btn").innerText = "Next";
    }
}

// Move to the next question
function nextQuestion() {
    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// Display final score and rating
function showResults() {
    clearInterval(timer);

    document.getElementById("quiz-screen").classList.add("hide");
    document.getElementById("result-screen").classList.remove("hide");

    document.getElementById("final-score").innerText =
        "Your Score: " + score + "/" + questions.length;

    var percentage = (score / questions.length) * 100;
    var rating;

    if (percentage >= 80) {
        rating = "Excellent! Great job!";
    } else if (percentage >= 60) {
        rating = "Good work! Keep practising.";
    } else if (percentage >= 40) {
        rating = "Not bad! You can improve.";
    } else {
        rating = "Keep learning. Try again!";
    }

    document.getElementById("rating").innerText = rating;
}

// Review incorrect and unanswered questions
function reviewAnswers() {
    document.getElementById("result-screen").classList.add("hide");
    document.getElementById("review-screen").classList.remove("hide");
    var list = document.getElementById("wrong-list");
    list.innerHTML = "";
    if (wrongAnswers.length === 0) {
        list.innerText = "Perfect score! You got every answer correct.";
        return;
    }
    for (var i = 0; i < wrongAnswers.length; i++) {
        var item = document.createElement("p");
        item.innerHTML =
            "<b>Question:</b> " + wrongAnswers[i].question +
            "<br><b>Your answer:</b> " + wrongAnswers[i].selected +
            "<br><b>Correct answer:</b> " + wrongAnswers[i].correct;
        list.appendChild(item);
    }
}
function restartQuiz() {
    clearInterval(timer);
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    answered = false;
    wrongAnswers = [];
    document.getElementById("quiz-screen").classList.remove("hide");
    document.getElementById("result-screen").classList.add("hide");
    document.getElementById("review-screen").classList.add("hide");
    showQuestion();
}
showQuestion();
