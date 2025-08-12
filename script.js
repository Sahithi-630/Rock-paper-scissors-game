// Game state variables
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 5;

// Game choices
const choices = ['rock', 'paper', 'scissors'];
const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

// DOM elements
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const currentRoundElement = document.getElementById('current-round');
const playerChoiceDisplay = document.getElementById('player-choice-display');
const computerChoiceDisplay = document.getElementById('computer-choice-display');
const roundMessageElement = document.getElementById('round-message');
const gameOverElement = document.getElementById('game-over');
const finalMessageElement = document.getElementById('final-message');
const finalPlayerScoreElement = document.getElementById('final-player-score');
const finalComputerScoreElement = document.getElementById('final-computer-score');

// Choice buttons
const choiceButtons = document.querySelectorAll('.choice-btn');
const playAgainButton = document.getElementById('play-again-btn');

// Initialize game
function initializeGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    
    updateScoreDisplay();
    updateRoundDisplay();
    resetChoiceDisplays();
    roundMessageElement.textContent = 'Make your choice!';
    roundMessageElement.className = '';
    
    // Enable choice buttons
    choiceButtons.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
    });
    
    // Hide game over screen
    gameOverElement.classList.add('hidden');
}

// Update score display
function updateScoreDisplay() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// Update round display
function updateRoundDisplay() {
    currentRoundElement.textContent = currentRound;
}

// Reset choice displays
function resetChoiceDisplays() {
    playerChoiceDisplay.textContent = '?';
    computerChoiceDisplay.textContent = '?';
    playerChoiceDisplay.className = 'choice-icon';
    computerChoiceDisplay.className = 'choice-icon';
}

// Generate computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine round winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };
    
    if (winConditions[playerChoice] === computerChoice) {
        return 'player';
    } else {
        return 'computer';
    }
}

// Update choice displays with animations
function updateChoiceDisplays(playerChoice, computerChoice) {
    playerChoiceDisplay.textContent = choiceEmojis[playerChoice];
    computerChoiceDisplay.textContent = choiceEmojis[computerChoice];
}

// Display round result
function displayRoundResult(result, playerChoice, computerChoice) {
    let message = '';
    let messageClass = '';
    
    switch (result) {
        case 'player':
            message = `You win this round! ${choiceEmojis[playerChoice]} beats ${choiceEmojis[computerChoice]}`;
            messageClass = 'winner';
            playerScore++;
            break;
        case 'computer':
            message = `Computer wins this round! ${choiceEmojis[computerChoice]} beats ${choiceEmojis[playerChoice]}`;
            messageClass = 'loser';
            computerScore++;
            break;
        case 'tie':
            message = `It's a tie! Both chose ${choiceEmojis[playerChoice]}`;
            messageClass = 'tie';
            break;
    }
    
    roundMessageElement.textContent = message;
    roundMessageElement.className = messageClass;
    
    updateScoreDisplay();
}

// Check if game is over
function checkGameOver() {
    if (currentRound >= maxRounds) {
        setTimeout(() => {
            showGameOverScreen();
        }, 2000);
        return true;
    }
    return false;
}

// Show game over screen
function showGameOverScreen() {
    let finalMessage = '';
    
    if (playerScore > computerScore) {
        finalMessage = 'Congratulations! You Won The Game!';
        finalMessageElement.className = 'winner';
    } else if (computerScore > playerScore) {
        finalMessage = 'Game Over! Computer Wins The Game!';
        finalMessageElement.className = 'loser';
    } else {
        finalMessage = "It's a Tie Game! Try Again!";
        finalMessageElement.className = 'tie';
    }
    
    finalMessageElement.textContent = finalMessage;
    finalPlayerScoreElement.textContent = playerScore;
    finalComputerScoreElement.textContent = computerScore;
    
    gameOverElement.classList.remove('hidden');
}

// Handle player choice
function handlePlayerChoice(playerChoice) {
    // Disable buttons during round processing
    choiceButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.6';
    });
    
    // Generate computer choice
    const computerChoice = getComputerChoice();
    
    // Update displays
    updateChoiceDisplays(playerChoice, computerChoice);
    
    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);
    
    // Display result after a short delay for better UX
    setTimeout(() => {
        displayRoundResult(result, playerChoice, computerChoice);
        
        // Check if game is over
        if (!checkGameOver()) {
            // Prepare for next round
            currentRound++;
            updateRoundDisplay();
            
            // Re-enable buttons after a delay
            setTimeout(() => {
                choiceButtons.forEach(button => {
                    button.disabled = false;
                    button.style.opacity = '1';
                });
                
                // Reset choice displays for next round
                setTimeout(() => {
                    resetChoiceDisplays();
                    roundMessageElement.textContent = 'Make your choice!';
                    roundMessageElement.className = '';
                }, 1000);
            }, 1500);
        }
    }, 500);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the game
    initializeGame();

    // Prevent multiple rapid clicks
    let isProcessing = false;

    // Add event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isProcessing) return;

            isProcessing = true;
            const playerChoice = this.getAttribute('data-choice');
            handlePlayerChoice(playerChoice);

            // Reset processing flag after round is complete
            setTimeout(() => {
                isProcessing = false;
            }, 3000);
        });
    });

    // Add event listener to play again button
    playAgainButton.addEventListener('click', function() {
        initializeGame();
    });
});
