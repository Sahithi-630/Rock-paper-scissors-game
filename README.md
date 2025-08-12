# Rock Paper Scissors Game

A modern, interactive Rock Paper Scissors game built with vanilla HTML, CSS, and JavaScript. Play against the computer in a best-of-5 rounds format with beautiful animations and responsive design.

## 🎮 Game Overview

Rock Paper Scissors is a classic hand game where each player simultaneously forms one of three shapes:
- **Rock** 🪨 crushes Scissors
- **Paper** 📄 covers Rock
- **Scissors** ✂️ cuts Paper

This implementation features a 5-round tournament against a computer opponent with real-time scoring and visual feedback.

## ✨ Features

### Core Gameplay
- **5-round tournament** format
- **Real-time scoring** for player vs computer
- **Random computer opponent** with fair play
- **Visual choice display** with emojis
- **Round-by-round feedback** with color-coded results
- **Final game results** with winner declaration

### User Interface
- **Responsive design** - works on desktop, tablet, and mobile
- **Modern card-based layout** with gradient backgrounds
- **Smooth animations** and hover effects
- **Intuitive button controls** with visual feedback
- **Professional typography** and spacing
- **Color-coded results** (green for wins, red for losses, yellow for ties)

### Technical Features
- **Pure vanilla JavaScript** - no external frameworks
- **Event-driven architecture** with proper DOM manipulation
- **Clean, modular code** with comprehensive comments
- **Cross-browser compatibility**
- **Mobile-first responsive design**

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation & Setup
1. **Download or clone** this repository
2. **Navigate** to the project folder
3. **Open** `index.html` in your web browser
4. **Start playing** immediately!


## 🎯 How to Play

1. **Start the game** by opening `index.html` in your browser
2. **Choose your move** by clicking one of the three buttons:
   - 🪨 **Rock** - Crushes scissors
   - 📄 **Paper** - Covers rock
   - ✂️ **Scissors** - Cuts paper
3. **Watch the computer** make its random choice
4. **See the round result** and updated scores
5. **Continue playing** until all 5 rounds are complete
6. **View final results** and your overall performance
7. **Play again** by clicking the "Play Again" button

### Winning Conditions
- **Player wins**: Score more rounds than the computer
- **Computer wins**: Computer scores more rounds than the player
- **Tie game**: Both player and computer win the same number of rounds

## 📁 Project Structure

```
rock-paper-scissors-game/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # Game logic and interactions
└── README.md          # Project documentation
```

### File Descriptions

#### `index.html`
- Semantic HTML5 structure
- Game layout with score display, choice buttons, and result areas
- Responsive viewport configuration
- Accessibility-friendly markup

#### `styles.css`
- Modern CSS3 with flexbox and grid layouts
- Responsive design with mobile-first approach
- Smooth animations and transitions
- Color-coded feedback system
- Professional gradient backgrounds

#### `script.js`
- Pure vanilla JavaScript (ES6+)
- Event-driven game logic
- Modular function architecture
- Comprehensive error handling
- Clean, well-documented code

## 🎨 Design Features

### Visual Elements
- **Gradient backgrounds** for modern appeal
- **Card-based layout** with subtle shadows
- **Emoji icons** for intuitive choice representation
- **Smooth transitions** for better user experience
- **Responsive typography** that scales with screen size

### Color Scheme
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Success**: Green tones for wins
- **Error**: Red tones for losses
- **Warning**: Yellow tones for ties
- **Neutral**: Gray tones for UI elements

### Animations
- **Hover effects** on interactive elements
- **Button press feedback** with transform animations
- **Smooth transitions** between game states
- **Color changes** for result feedback

## 🔧 Technical Implementation

### JavaScript Architecture
```javascript
// Core game state management
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;

// Main game functions
- initializeGame()      // Reset game state
- handlePlayerChoice()  // Process player input
- getComputerChoice()   // Generate random computer choice
- determineWinner()     // Apply game rules
- updateScoreDisplay()  // Update UI elements
- checkGameOver()       // End game detection
```

### Event Handling
- **Click events** for choice buttons
- **DOM content loaded** for initialization
- **Debounced inputs** to prevent rapid clicking
- **Keyboard accessibility** support

### Responsive Design
- **Mobile-first** CSS approach
- **Flexible layouts** using CSS Grid and Flexbox
- **Scalable typography** with relative units
- **Touch-friendly** button sizes (minimum 44px)

## 🧪 Testing Scenarios

### Functional Testing
- ✅ All three choice buttons work correctly
- ✅ Computer generates random choices
- ✅ Game rules applied correctly (rock beats scissors, etc.)
- ✅ Scores update accurately after each round
- ✅ Game ends after exactly 5 rounds
- ✅ Correct winner determination and messages
- ✅ Play Again button resets all game state

### UI/UX Testing
- ✅ Responsive design on different screen sizes
- ✅ Button hover and click animations work
- ✅ Color-coded feedback displays correctly
- ✅ Game over modal appears and functions properly
- ✅ All text is readable and properly sized

### Edge Cases
- ✅ Rapid clicking doesn't break the game
- ✅ Game state resets properly between games
- ✅ Tie games handled correctly
- ✅ Final score calculations are accurate

## 🌟 Future Enhancements

### Potential Features
- **Sound effects** for button clicks and results
- **Animation sequences** for choice reveals
- **Player statistics** tracking across multiple games
- **Difficulty levels** with different computer strategies
- **Multiplayer mode** for two human players
- **Tournament brackets** for extended gameplay
- **Customizable themes** and color schemes

### Technical Improvements
- **Local storage** for persistent statistics
- **Progressive Web App** features
- **Offline functionality**
- **Advanced animations** with CSS keyframes
- **Accessibility enhancements** (ARIA labels, screen reader support)

## 🤝 Contributing

This project was built as a learning exercise following specific requirements:
- No external frameworks or libraries
- Pure vanilla JavaScript implementation
- Responsive design principles
- Clean, readable code structure

Feel free to fork this project and add your own enhancements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as part of a coding challenge
- Inspired by the classic Rock Paper Scissors game
- Designed with modern web development best practices
- Focused on clean code and user experience

---

**Enjoy playing Rock Paper Scissors!** 🎮