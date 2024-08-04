document.addEventListener("DOMContentLoaded", () => {
    const humanRock = document.getElementById("human-rock");
    const humanPaper = document.getElementById("human-paper");
    const humanScissors = document.getElementById("human-scissors");
    const humanScore = document.querySelector(".humanScore");
    const computerScore = document.querySelector(".computerScore");

    let humanPoints = 0;
    let computerPoints = 0;
    let round = 0;
    const choices = ["rock", "paper", "scissors"];

    const getComputerChoice = () => {
        const choice = Math.floor(Math.random() * choices.length);
        return choices[choice];
    };

    const determineWinner = (computerChoice, humanChoice) => {
        if (computerChoice === humanChoice) {
            return "draw";
        } else {
            if (
                (humanChoice === "rock" && computerChoice === "scissors") ||
                (humanChoice === "paper" && computerChoice === "rock") ||
                (humanChoice === "scissors" && computerChoice === "paper")
            ) {
                return "human";
            } else {
                return "computer";
            }
        }
    };

    const updateWinner = (winner) => {
        if (winner === "human") {
            humanPoints += 1;
            humanScore.textContent = humanPoints;
        } else if (winner === "computer") {
            computerPoints += 1;
            computerScore.textContent = computerPoints;
        }
    };

    const getHumanChoice = (choice) => {
        return () => {
            if (round < 5) {
                console.log(`Human chose ${choice}`);
                const computer = getComputerChoice();
                console.log(`Computer chose ${computer}`);
                const winner = determineWinner(computer, choice);
                console.log(`${winner} won`);
                updateWinner(winner);
                round += 1;
            }
            if (round === 5) {
                displayWinner();
            }
        };
    };

    humanRock.addEventListener("click", getHumanChoice("rock"));
    humanPaper.addEventListener("click", getHumanChoice("paper")); 
    humanScissors.addEventListener("click", getHumanChoice("scissors")); 

    const displayWinner = () => {
        const body = document.body;
        body.innerHTML = " ";

        const finalMessage = document.createElement("h1");
        finalMessage.textContent = `Final Score: Human: ${humanPoints} - Computer ${computerPoints}`; 
        body.appendChild(finalMessage);

        const winner = document.createElement("h2");
        const winnerImg = document.createElement("img");
        const winnerSound = document.createElement("audio");

        if (humanPoints > computerPoints) {
            winnerImg.src = "https://cdn-icons-png.flaticon.com/512/1864/1864509.png";
            winner.textContent = "Hooray!, You won";
            winnerSound.src = "";
        } else if (humanPoints < computerPoints) {
            winnerImg.src = "https://png.pngtree.com/png-clipart/20230913/original/pngtree-computer-clipart-cartoon-retro-computer-with-keyboard-isolated-vector-illustration-png-image_11078246.png";
            winner.textContent = "Ohhh!, You lost";
            winnerSound.src = "";
        } else {
            winnerImg.src = "https://t4.ftcdn.net/jpg/01/07/99/99/360_F_107999940_cWIzsBx0HOrei6vPC0341sjG0j5CjNoC.jpg";
            winner.textContent = "Draw. Not bad!";
            winnerSound.src = "";
        }

        winnerImg.style.width = "400px";
        winnerImg.style.height = "400px";
        body.appendChild(winner);
        body.appendChild(winnerImg);
        body.appendChild(winnerSound);
        winnerSound.play();
    };
});
