# Assets Folder

This folder contains additional assets for the Rock Paper Scissors game to enhance the visual and audio experience.

## 🎵 Sound Effects

Place the following sound files in this folder to enable audio feedback:

### Required Sound Files:
- `click.mp3` - Button click sound
- `win.mp3` - Player wins round sound
- `lose.mp3` - Player loses round sound  
- `tie.mp3` - Tie round sound
- `game-win.mp3` - Player wins game sound
- `game-lose.mp3` - Player loses game sound

### Sound File Requirements:
- Format: MP3 (recommended) or WAV
- Duration: 0.5-2 seconds for best experience
- Volume: Moderate (will be set to 50% in game)

## 🖼️ Images

### Background Image:
- `background.jpg` - Custom background image
  - Recommended size: 1920x1080 or higher
  - Format: JPG, PNG, or WebP
  - Will be overlaid with gradient for readability

### Custom Choice Icons (Buttons):
- `rock-icon.png` - Rock choice button icon
- `paper-icon.png` - Paper choice button icon  
- `scissors-icon.png` - Scissors choice button icon
  - Recommended size: 128x128px or higher
  - Format: PNG with transparency
  - Style: Clean, simple icons that work well at small sizes

### Custom Display Icons (Game Area):
- `rock-display.png` - Rock choice display icon
- `paper-display.png` - Paper choice display icon
- `scissors-display.png` - Scissors choice display icon
  - Recommended size: 256x256px or higher
  - Format: PNG with transparency
  - Style: Larger, more detailed versions for the main game display

## 🔧 How It Works

The game automatically detects which assets are available:

1. **Sound Detection**: The game tries to load each sound file. If successful, audio feedback is enabled.

2. **Image Detection**: The game checks for image files and applies them automatically:
   - Background image is applied with an overlay
   - Custom icons replace emoji if all 3 choice icons are found
   - Display icons are used in the main game area

3. **Fallback**: If assets aren't found, the game uses the default styling with emojis and gradients.

## 📁 Folder Structure

```
assets/
├── README.md (this file)
├── background.jpg (optional)
├── click.mp3 (optional)
├── win.mp3 (optional)
├── lose.mp3 (optional)
├── tie.mp3 (optional)
├── game-win.mp3 (optional)
├── game-lose.mp3 (optional)
├── rock-icon.png (optional)
├── paper-icon.png (optional)
├── scissors-icon.png (optional)
├── rock-display.png (optional)
├── paper-display.png (optional)
└── scissors-display.png (optional)
```

## 🎨 Asset Creation Tips

### Sound Effects:
- Use royalty-free sounds or create your own
- Keep files small (under 100KB each)
- Test volume levels - they should be pleasant, not jarring
- Consider the game's playful theme

### Images:
- Maintain consistent art style across all icons
- Use high contrast for visibility
- Test at different screen sizes
- Consider accessibility (clear, recognizable shapes)

### Background:
- Choose images that won't interfere with text readability
- Abstract patterns or subtle textures work best
- Avoid busy or high-contrast backgrounds

## 🚀 Getting Started

1. Add any combination of the above assets to this folder
2. Refresh the game page
3. The game will automatically detect and use available assets
4. Check the browser console for any loading messages

Enjoy your enhanced Rock Paper Scissors experience! 🎮
