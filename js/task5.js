var game = document.getElementById("game");
var symbols = ["🍎", "🍌", "🍇", "🍒", "🍋", "🍉", "🥝", "🍓"];
var cards = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;
function shuffleCards() {
    cards = symbols.concat(symbols);
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}
function startGame() {
    game.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lock = false;
    matches = 0;    
    document.getElementById("score").innerText = matches;
    document.getElementById("message").innerText =
        "Click two cards to find a match!";
    shuffleCards();
    for (let i = 0; i < cards.length; i++) {
        let card = document.createElement("button");
        card.className = "card";
        card.innerText = "?";
        card.dataset.symbol = cards[i];
        game.appendChild(card);
    }
}
game.onclick = function(event) {
    let card = event.target;
    if (!card.classList.contains("card") || lock) {
        return;
    }
    if (card.classList.contains("open") ||
        card.classList.contains("matched")) {
        return;
    }
    card.innerText = card.dataset.symbol;
    card.classList.add("open");
    if (firstCard === null) {
        firstCard = card;
    } else {
        secondCard = card;
        lock = true;
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard.classList.remove("open");
            secondCard.classList.remove("open");
            matches++;
            document.getElementById("score").innerText = matches;
            firstCard = null;
            secondCard = null;
            lock = false;
            if (matches === 8) {
                document.getElementById("message").innerText =
                    "Congratulations! You won!";
            }
        } else {
            setTimeout(function() {
                firstCard.innerText = "?";
                secondCard.innerText = "?";
                firstCard.classList.remove("open");
                secondCard.classList.remove("open");
                firstCard = null;
                secondCard = null;
                lock = false;
            }, 1000);
        }
    }
};
startGame();
