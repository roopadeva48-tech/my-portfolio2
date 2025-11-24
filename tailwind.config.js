// tailwind.config.js

module.exports = {
  // ... other configurations (content, plugins, etc.)
  theme: {
    extend: {
      // Define the keyframes for movement
      keyframes: {
        'star-drift': {
          // Shifts a 200% width container 50% left to create a seamless, horizontal loop
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'moon-move': {
          // Moves the moon element from its starting position off-screen left to the right
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(150vw) translateY(100px)' }, 
        },
      },
      // Apply the keyframes with specific, SLOW durations
      animation: {
        // Star Drift: Slow loop over 90 seconds
       // 🚀 CHANGED LINE: Duration increased from 90s to 150s 🚀
        'star-drift': 'star-drift 150s linear infinite', 
        
        // Moon move remains the same unless you want to change it too
        'moon-move': 'moon-move 180s linear infinite forwards',
      },
    },
  },
  // ... rest of the file
};