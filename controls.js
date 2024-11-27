let moveInterval = 100;

document.addEventListener('keydown', e => {
    if (!isPaused) {
        // If the game is not paused
        switch (e.key) {
            case 'ArrowLeft':
            case 'A':
            case 'a':
                playerMove(-1);
                break;
            case 'ArrowRight':
            case 'D':
            case 'd':
                playerMove(1);
                break;
            case 'ArrowDown':
            case 'S':
            case 's':
                dropPlayer();
                break;
            case 'ArrowUp':
            case 'W':
            case 'w':
                playerRotate(1);
                break;
            case ' ':
                quickDrop();
                break;
            case 'C':
            case 'c':
                if (canSwap) {
                    holdPiece();
                    canSwap = false;
                }
                break;
            case 'P':
            case 'p':
                isPaused = true;
                drawPauseScreen();
                break;
            default:
                break; // Handle any keys that do not match
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
