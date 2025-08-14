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

// Asset configuration
const assetConfig = {
    sounds: {
        enabled: false, // Will be set to true if sound files are found
        click: './assets/click.mp3',
        win: './assets/win.mp3',
        lose: './assets/lose.mp3',
        tie: './assets/tie.mp3',
        gameWin: './assets/game-win.mp3',
        gameLose: './assets/game-lose.mp3'
    },
    images: {
        enabled: false, // Will be set to true if image files are found
        background: './assets/background.jpg',
        icons: {
            rock: './assets/rock-icon.png',
            paper: './assets/paper-icon.png',
            scissors: './assets/scissors-icon.png'
        },
        displayIcons: {
            rock: './assets/rock-display.png',
            paper: './assets/paper-display.png',
            scissors: './assets/scissors-display.png'
        }
    }
};

// Sound effects
const sounds = {};
let soundEnabled = true;
let audioContext = null;
let soundFilesFound = false;

// Initialize Web Audio Context for fallback sounds
function initializeAudioContext() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        return true;
    } catch (e) {
        console.log('Web Audio API not supported');
        return false;
    }
}

// Generate fallback sounds using Web Audio API
function generateTone(frequency, duration, type = 'sine') {
    if (!audioContext) return null;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    return { oscillator, gainNode };
}

// Create fallback sound effects
function createFallbackSounds() {
    return {
        click: () => generateTone(800, 0.1, 'square'),
        win: () => {
            generateTone(523, 0.2); // C5
            setTimeout(() => generateTone(659, 0.2), 100); // E5
            setTimeout(() => generateTone(784, 0.3), 200); // G5
        },
        lose: () => {
            generateTone(400, 0.2);
            setTimeout(() => generateTone(300, 0.3), 150);
        },
        tie: () => generateTone(600, 0.2, 'triangle'),
        gameWin: () => {
            generateTone(523, 0.2); // C5
            setTimeout(() => generateTone(659, 0.2), 100); // E5
            setTimeout(() => generateTone(784, 0.2), 200); // G5
            setTimeout(() => generateTone(1047, 0.4), 300); // C6
        },
        gameLose: () => {
            generateTone(400, 0.3);
            setTimeout(() => generateTone(350, 0.3), 200);
            setTimeout(() => generateTone(300, 0.5), 400);
        }
    };
}

// Initialize sound effects
function initializeSounds() {
    // Initialize Web Audio for fallback sounds
    const audioSupported = initializeAudioContext();

    // Try to load sound files
    let soundsToLoad = Object.keys(assetConfig.sounds).filter(key => key !== 'enabled').length;
    let soundsLoaded = 0;
    let soundsErrored = 0;

    Object.keys(assetConfig.sounds).forEach(key => {
        if (key !== 'enabled') {
            sounds[key] = new Audio(assetConfig.sounds[key]);
            sounds[key].preload = 'auto';
            sounds[key].volume = 0.3;

            // Check if sound file exists
            sounds[key].addEventListener('canplaythrough', () => {
                soundsLoaded++;
                if (soundsLoaded > 0) {
                    soundFilesFound = true;
                    assetConfig.sounds.enabled = true;
                }
                updateSoundToggle();
            });

            sounds[key].addEventListener('error', () => {
                soundsErrored++;
                console.log(`Sound file not found: ${assetConfig.sounds[key]}`);

                // If all sounds failed to load, enable fallback sounds
                if (soundsErrored === soundsToLoad && audioSupported) {
                    console.log('Using fallback Web Audio sounds');
                    assetConfig.sounds.enabled = true;
                    soundFilesFound = false;
                    updateSoundToggle();
                }
            });
        }
    });

    // Enable sound system immediately if Web Audio is supported
    if (audioSupported) {
        assetConfig.sounds.enabled = true;
        updateSoundToggle();
    }
}

// Play sound effect
function playSound(soundName) {
    if (!assetConfig.sounds.enabled || !soundEnabled) return;

    // Resume audio context if needed (for user interaction requirement)
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Try to play sound file first
    if (soundFilesFound && sounds[soundName]) {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(e => {
            console.log('Sound file play failed, trying fallback:', e);
            playFallbackSound(soundName);
        });
    } else {
        // Use fallback Web Audio sounds
        playFallbackSound(soundName);
    }
}

// Play fallback sound using Web Audio API
function playFallbackSound(soundName) {
    if (!audioContext) return;

    const fallbackSounds = createFallbackSounds();
    if (fallbackSounds[soundName]) {
        try {
            fallbackSounds[soundName]();
        } catch (e) {
            console.log('Fallback sound failed:', e);
        }
    }
}

// Toggle sound on/off
function toggleSound() {
    soundEnabled = !soundEnabled;
    updateSoundToggle();

    // Save preference to localStorage
    localStorage.setItem('rps-sound-enabled', soundEnabled);
}

// Update sound toggle button
function updateSoundToggle() {
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        if (assetConfig.sounds.enabled) {
            soundToggle.style.display = 'flex';
            soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
            soundToggle.classList.toggle('muted', !soundEnabled);

            // Update title based on sound source
            const soundSource = soundFilesFound ? 'Sound Files' : 'Generated Tones';
            soundToggle.title = soundEnabled ?
                `Mute Sound (${soundSource})` :
                `Unmute Sound (${soundSource})`;
        } else {
            soundToggle.style.display = 'none';
        }
    }
}

// Load sound preference
function loadSoundPreference() {
    const saved = localStorage.getItem('rps-sound-enabled');
    if (saved !== null) {
        soundEnabled = saved === 'true';
    }
}

// Check for custom assets
function checkAssets() {
    // Check for background image
    const img = new Image();
    img.onload = () => {
        document.body.classList.add('has-bg-image');
        assetConfig.images.enabled = true;
    };
    img.onerror = () => {
        console.log('Background image not found');
    };
    img.src = assetConfig.images.background;

    // Check for custom choice icons
    let customIconsFound = 0;
    Object.keys(assetConfig.images.icons).forEach(choice => {
        const iconImg = new Image();
        iconImg.onload = () => {
            customIconsFound++;
            if (customIconsFound === 3) {
                // All icons found, enable custom icons
                document.querySelectorAll('.choice-btn').forEach(btn => {
                    btn.classList.add('has-custom-icon');
                });
            }
        };
        iconImg.src = assetConfig.images.icons[choice];
    });
}

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
    // Add animation class to trigger score update animation
    playerScoreElement.style.animation = 'none';
    computerScoreElement.style.animation = 'none';

    // Force reflow
    playerScoreElement.offsetHeight;
    computerScoreElement.offsetHeight;

    // Update scores
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;

    // Trigger animation
    playerScoreElement.style.animation = 'scoreUpdate 0.3s ease-out';
    computerScoreElement.style.animation = 'scoreUpdate 0.3s ease-out';
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

    // Remove any selection and custom icon classes
    playerChoiceDisplay.classList.remove('selected', 'has-custom-icon', 'rock-icon', 'paper-icon', 'scissors-icon');
    computerChoiceDisplay.classList.remove('selected', 'has-custom-icon', 'rock-icon', 'paper-icon', 'scissors-icon');
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
    // Add selection animation to player choice
    playerChoiceDisplay.classList.add('selected');

    // Check if using custom icons
    if (assetConfig.images.enabled) {
        playerChoiceDisplay.classList.add('has-custom-icon', `${playerChoice}-icon`);
        playerChoiceDisplay.textContent = '';
    } else {
        playerChoiceDisplay.textContent = choiceEmojis[playerChoice];
    }

    // Add selection animation to computer choice with delay
    setTimeout(() => {
        computerChoiceDisplay.classList.add('selected');

        if (assetConfig.images.enabled) {
            computerChoiceDisplay.classList.add('has-custom-icon', `${computerChoice}-icon`);
            computerChoiceDisplay.textContent = '';
        } else {
            computerChoiceDisplay.textContent = choiceEmojis[computerChoice];
        }
    }, 300);
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
            playSound('win');
            break;
        case 'computer':
            message = `Computer wins this round! ${choiceEmojis[computerChoice]} beats ${choiceEmojis[playerChoice]}`;
            messageClass = 'loser';
            computerScore++;
            playSound('lose');
            break;
        case 'tie':
            message = `It's a tie! Both chose ${choiceEmojis[playerChoice]}`;
            messageClass = 'tie';
            playSound('tie');
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
        playSound('gameWin');
    } else if (computerScore > playerScore) {
        finalMessage = 'Game Over! Computer Wins The Game!';
        finalMessageElement.className = 'loser';
        playSound('gameLose');
    } else {
        finalMessage = "It's a Tie Game! Try Again!";
        finalMessageElement.className = 'tie';
        playSound('tie');
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
    // Load user preferences
    loadSoundPreference();

    // Initialize assets
    initializeSounds();
    checkAssets();

    // Initialize the game
    initializeGame();

    // Prevent multiple rapid clicks
    let isProcessing = false;

    // Add event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isProcessing) return;

            isProcessing = true;
            playSound('click');
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
        playSound('click');
        initializeGame();
    });

    // Add event listener to sound toggle button
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', function() {
            toggleSound();
            // Play a test sound when enabling
            if (soundEnabled) {
                playSound('click');
            }
        });
    }

    // Add event listener to sound test button (for debugging)
    const soundTest = document.getElementById('sound-test');
    if (soundTest) {
        soundTest.addEventListener('click', function() {
            console.log('Testing sound system...');
            console.log('Sound enabled:', soundEnabled);
            console.log('Audio context state:', audioContext ? audioContext.state : 'No audio context');
            console.log('Sound files found:', soundFilesFound);

            if (soundEnabled) {
                playSound('win');
                setTimeout(() => playSound('click'), 500);
            }
        });

        // Show test button in development/debugging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
            soundTest.style.display = 'flex';
        }
    }
});
