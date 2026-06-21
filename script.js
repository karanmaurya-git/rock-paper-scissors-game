const choices = document.querySelectorAll(".choice");

const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const resultText = document.getElementById("result");

const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const roundText = document.getElementById("round");

const resetBtn = document.getElementById("resetBtn");

let playerScore = 0;
let computerScore = 0;
let round = 1;
let gameOver = false;

// Statistics
let stats = JSON.parse(localStorage.getItem("rpsStats")) || {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0
};

updateStats();

// Game Logic
choices.forEach(choice => {

    choice.addEventListener("click", () => {

        if (gameOver) return;

        // Remove previous active state
        choices.forEach(btn => btn.classList.remove("active"));

        // Highlight selected button
        choice.classList.add("active");

        const playerChoice = choice.dataset.choice;

        const options = ["rock", "paper", "scissors"];
        const computerChoice =
            options[Math.floor(Math.random() * options.length)];

        playerChoiceText.textContent = capitalize(playerChoice);
        computerChoiceText.textContent = capitalize(computerChoice);

        let result;

        if (playerChoice === computerChoice) {

            result = "🤝 Draw!";

        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {

            result = "🎉 You Win!";
            playerScore++;

        } else {

            result = "😢 You Lose!";
            computerScore++;
        }

        resultText.textContent = result;

        playerScoreText.textContent = playerScore;
        computerScoreText.textContent = computerScore;

        if (round < 5) {

            round++;
            roundText.textContent = round;

        } else {

            finishMatch();
        }
    });
});

// Match End
function finishMatch() {

    gameOver = true;

    stats.gamesPlayed++;

    let finalMessage = "";

    if (playerScore > computerScore) {

        stats.wins++;
        finalMessage = "🏆 Congratulations! You Won The Match!";

    } else if (playerScore < computerScore) {

        stats.losses++;
        finalMessage = "💀 Computer Won The Match!";

    } else {

        stats.draws++;
        finalMessage = "🤝 Match Draw!";
    }

    resultText.textContent = finalMessage;

    localStorage.setItem(
        "rpsStats",
        JSON.stringify(stats)
    );

    updateStats();

    setTimeout(() => {
        alert(finalMessage);
    }, 300);
}

// Statistics Dashboard
function updateStats() {

    document.getElementById("gamesPlayed").textContent = stats.gamesPlayed;
    document.getElementById("wins").textContent = stats.wins;
    document.getElementById("losses").textContent = stats.losses;
    document.getElementById("draws").textContent = stats.draws;

    const winRate =
        stats.gamesPlayed > 0
            ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1)
            : 0;

    document.getElementById("winRate").textContent = winRate;
}

// Reset Game
resetBtn.addEventListener("click", () => {

    playerScore = 0;
    computerScore = 0;
    round = 1;
    gameOver = false;

    playerScoreText.textContent = "0";
    computerScoreText.textContent = "0";
    roundText.textContent = "1";

    playerChoiceText.textContent = "-";
    computerChoiceText.textContent = "-";

    resultText.textContent = "Choose your move!";

    choices.forEach(btn => btn.classList.remove("active"));
});

// Helper Function
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}