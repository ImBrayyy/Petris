let moveInterval = 100; 

document.addEventListener('keydown', e => {
    if (!isPaused) {
        // If the game is not paused
        if (e.key === 'ArrowLeft') {
            playerMove(-1);
        } else if (e.key === 'ArrowRight') {
            playerMove(1);
        } else if (e.key === 'ArrowDown') {
            dropPlayer();
        } else if (e.key === 'ArrowUp') {
            playerRotate(1);
        } else if (e.key === ' ') {
            quickDrop();
        } else if (e.key === 'P' || e.key === 'p') {
            // Pause the game when 'P' key is pressed
            isPaused = true;
            drawPauseScreen();
        }
        if (e.key === 'C' || e.key == 'c') {
            holdPiece();
            canSwap = false;
        }
    } else {
        // If the game is paused, 'P' key resumes the game
        if (e.key === 'P' || e.key === 'p') {
            isPaused = false;
            
            requestAnimationFrame(update);
            if (resetStatsOnUnpause) {
                player.score = 0;
                level = 0;
                totalLineCount = 0;
                dropInterval = 1000;
                updateScore();
                resetStatsOnUnpause = false; // Reset the flag
            }
        }
    }
});

