const canvas = document.getElementById("tetris")
const ctx = canvas.getContext('2d');

canvas.height = innerHeight * 0.9
canvas.width = innerWidth * 0.45

canvas.width = 360;
canvas.height = 720;

ctx.scale(30,30)


const nextPieceCanvas = document.getElementById("nextPieceCanvas");
const nextPieceCtx = nextPieceCanvas.getContext("2d");


let nextPiece;

let totalLineCount = 0;

let level = 0;
let levelSpeeds = [1000,900,810,729,656,590,500,250]

function drawNextPiece(nextPiece) {
    nextPieceCtx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);

    const blockSize = nextPieceCanvas.width / 5;
    const offsetX = (nextPieceCanvas.width - blockSize * nextPiece[0].length) / 2;
    const offsetY = (nextPieceCanvas.height - blockSize * nextPiece.length) / 2;

    nextPiece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                nextPieceCtx.fillStyle = convertToColorString(value);
                nextPieceCtx.fillRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
                nextPieceCtx.strokeStyle = '#fff';
                nextPieceCtx.lineWidth = 2;
                nextPieceCtx.strokeRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
            }
        });
    });
}


function updateScore() {
    document.getElementById('scoreLabel').innerText = `Score: ${player.score}`
    document.getElementById("lineCount").innerText = `Line Count: ${totalLineCount}`
    document.getElementById("levelCount").innerText = `Level: ${level}`
}

const colors = {
    1: 'rebeccapurple',
    2: 'orange',
    3: 'blue',
    4: 'purple',
    5: 'violet',
    6: 'green',
    7: 'indigo',
    8: 'lightblue',
    9: 'pink',
    10: 'gold',  
    11: 'darkgray', 
    12: 'yellow',  
    13: 'brown',  
    14: 'cyan',  
    15: 'magenta',  
    16: 'lime',  
    17: 'teal',  
    18: 'coral',
    19: 'red',
    20: 'silver',
    21: 'olive',
    22: 'navy',
    23: 'turquoise',
    24: 'maroon',
    25: 'salmon',
    26: 'skyblue',
    27: 'darkgreen',
    28: 'orchid'
};




function draw() {
    if (!isPaused) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.02;

        for (let y = 0; y < arena.length; ++y) {
            for (let x = 0; x < arena[y].length; ++x) {
                ctx.strokeRect(x, y, 1, 1);
            }
        }

        drawGhostPiece();
        drawMatrix(arena, { x: 0, y: 0 });
        drawMatrix(player.matrix, player.pos);
    } else {
        drawPauseScreen();
    }
}




function drawGhostPiece() {
    // Create a deep clone of the player object to avoid modifying the original
    const ghostPlayer = JSON.parse(JSON.stringify(player));

    // Move the ghost piece down until it collides with the bottom or another piece
    while (!collide(arena, ghostPlayer)) {
        ghostPlayer.pos.y++;
    }

    // Move back up by one to place the ghost piece just above the collision point
    ghostPlayer.pos.y--;

    // Draw the ghost piece matrix with the isGhost parameter set to true
    drawMatrix(ghostPlayer.matrix, ghostPlayer.pos, true);
}




const matrix = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
]


function createPiece(type) {
    if(type === '1') {
        return [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],

        ]
    } else if (type === '2') {
        return [
            [0, 0, 0, 0],
            [0, 0, 2, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],

        ]
    } else if (type === '3') {
        return [
            [0, 3, 0, 0],
            [0, 3, 0, 0],
            [0, 3, 0, 0],
            [0, 3, 3, 0],
        ]
    } else if (type === '4') {
        return [
            [0, 0, 4, 0],
            [0, 0, 4, 0],
            [0, 0, 4, 0],
            [0, 4, 4, 0],

        ]
        
    } else if (type === '5') {
        return [
            [0, 0, 0, 0],
            [0, 0, 5, 0],
            [5, 5, 5, 5],
            [0, 0, 0, 0],
        ]
    } else if (type === '6') {
        return [
            [0, 0, 0, 0],
            [0, 6, 0, 0],
            [6, 6, 6, 6],
            [0, 0, 0, 0],
        ]
    } else if (type === '7') {
        return [
            [0, 0, 0, 0],
            [0, 0, 7, 0],
            [0, 7, 7, 7],
            [0, 7, 0, 0],
        ]
    } else if (type === '8') {
        return [
            [0, 0, 0, 0],
            [0, 8, 0, 0],
            [8, 8, 8, 0],
            [0, 0, 8, 0],
        ]
    } else if (type === '9') {
        return [
            [0, 9, 0, 0],
            [0, 9, 0, 0],
            [0, 9, 9, 9],
            [0, 0, 0, 0],
        ]
    } else if (type === 'A') {
        return [
            [0, 0, 'A', 0, 0],
            [0, 0, 'A', 0, 0],
            [0, 0, 'A', 0, 0],
            [0, 0, 'A', 0, 0],
            [0, 0, 'A', 0, 0],
            
        ]
    } else if (type === 'B') {
        return [
            [0,  0,   0,  0],
            [0,  0,  'B', 'B'],
            [0, 'B', 'B',  0],
            [0, 'B', 0,    0],
        ]
    } else if (type === 'C') {
        return [
            [0, 0, 0, 0, 0],
            [0, 'C', 0,   'C', 0],
            [0, 'C', 'C', 'C', 0],
            [0, 0, 0, 0, 0],
        ]
    } else if (type === 'D') {
        return [
            [0, 0, 0, 0, 0],
            [0,  0,  'D', 0, 0],
            [0,  0,  'D', 0, 0],
            [0, 'D', 'D', 'D', 0],
        ]
        
    } else if (type === 'E') {
        return [
            [0, 0, 0, 0, 0],
            [0,  0,  'E', 0, 0],
            [0, 'E', 'E', 'E', 0],
            [0,  0,  'E', 0, 0],
            [0, 0, 0, 0, 0]
        ]
    } else if (type === 'F') {
        return [
            [0, 0, 0, 0, 0],
            [0, 'F',  0,   0, 0],
            [0, 'F',  'F', 'F', 0],
            [0, 0, 0, 'F', 0],
            [0, 0, 0, 0, 0]
        ]
    } else if (type === 'G') {
        return [
            [0, 0, 0,  0, 0],
            [0, 0,    0,  'G', 0],
            [0, 'G', 'G', 'G', 0],
            [0, 'G', 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
        
    } else if (type === 'H') {
        return [
            [0, 0,   'H', 0],
            [0, 0,   'H', 0],
            [0, 'H', 'H', 0],
            [0, 'H', 0, 0],
        ]
        
    } else if (type === 'I') {
        return [
            [0, 'I',  0, 0],
            [0, 'I',  0, 0],
            [0, 'I', 'I', 0],
            [0,  0,  'I', 0],
        ]
    }
    else if (type === 'J') {
        return [
            ['J']
        ]
    } else if (type === 'K') {
        return [
            [0,  0,   0],
            [0, 'K', 'K'],
            [0, 'K',  0],
        ]
    } else if (type === 'L') {
        return [
            [0,  0,  0],
            [0, 'L', 0],
            [0, 'L', 0],
        ]
    } else if (type === 'M') {
        return [
            [0, 'M', 0],
            [0, 'M', 0],
            [0, 'M', 0],
        ]
    } else if (type === 'N') {
        return [
            [ 0,  'N', 0],
            ['N', 'N','N'],
            [ 0,   0,  0],  
        ]
    } else if (type === 'O') {
        return [
            [0, 0, 0, 0],
            [0, 0,   'O', 'O'],
            [0, 'O', 'O',  0],
            [0, 0, 0, 0],
        ]
    } else if (type === 'P') {
        return [
            [0,    0,   0, 0],
            ['P', 'P',  0, 0],
            [0,   'P', 'P',0],
            [0,    0,   0, 0],
        ]
    } else if (type === 'Q') {
        return [
            [0,  0,   0,  0],
            [0, 'Q',  0,  0],
            [0, 'Q',  0,  0],
            [0, 'Q', 'Q', 0],
        ]
    } else if (type === 'R') {
        return [
            [0,  0,   0,  0],
            [0,  0,  'R',  0],
            [0,  0,  'R',  0],
            [0,  'R','R' , 0],
        ]
    } else if (type === 'S') {
        return [
            [0,  'S', 0,  0],
            [0,  'S', 0,  0],
            [0,  'S', 0,  0],
            [0,  'S', 0 , 0],
        ]
    }
 

}

function collide(arena,player) {
    const [m, o] = [player.matrix,player.pos];
    for(let y = 0; y < m.length; ++y) {
        for(let x = 0; x < m[y].length; ++x) {
            if(m[y][x] !== 0 && (arena[y+ o.y] && arena[y + o.y][x + o.x])!== 0) {
                return true;
            }
        }
    }
    return false
}


function createMatrix(w,h) {
    const matrix = []
    while(h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix;
}

function convertToColorString(input) {
    if (/^[1-9]$/.test(input)) {
        return colors[input];
    } else {
        const charNumber = charToNumber(input);
        return charNumber !== -1 ? colors[charNumber] : 'Invalid';
    }
}

  
  
// Function from the previous example
function charToNumber(char) {
    let charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
        return charCode - 65 + 10;
    } else {
        return -1;
    }
}

function drawMatrix(matrix, offset, isGhost = false) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                // Use a different color for the ghost piece
                ctx.fillStyle = isGhost ? 'rgba(0,0,0, 0.3)' : convertToColorString(value);

                // Draw filled rectangle with adjusted dimensions
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);

                // Set the stroke color, line width, and draw the outline
                ctx.strokeStyle = isGhost ? convertToColorString(value) : '#fff';
                ctx.lineWidth = isGhost? 0.05 : 0.075;
                ctx.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}




const player = {
    pos: {x: 5,y: 5},
    matrix: null,
    score: 0,
}


function dropPlayer() {
    player.pos.y++ 

    if(collide(arena,player)) {
        player.pos.y--;
        merge(arena,player);
        playerReset();
        arenaSweep();
        updateScore()
    }

    dropCounter = 0;
}

function quickDrop() {
    while (!collide(arena, player)) {
        player.pos.y++;
    }

    // Move back up by one to place the player just above the collision point
    player.pos.y--;

    // Merge, reset, sweep, and update score
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();

    dropCounter = 0;
}


function playerMove(direction) {
    player.pos.x += direction;
    if (collide(arena, player)) {
        player.pos.x -= direction;
    }
}







function playerRotate(direction) {
    const pos = player.pos.x
    let offset = 1;
    rotate(player.matrix, direction);

    while(collide(arena,player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1: -1));

        if(offset > player.matrix[0].length) {
            rotate(player.matrix, -direction);
            player.pos.x = pos;
            return;
        }

    }
}

function rotate(matrix, direction) {
    for(let y = 0; y < matrix.length; ++y) {
        for(let x = 0; x < y; ++x) {
            [ 
                matrix[x][y], 
                matrix[y][x] 
            ] = [ 
                matrix[y][x],
                matrix[x][y] 
            ];
        }
    }



    if(direction > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

let resetStatsOnUnpause
function playerReset() {
    const pieces = '123456789ABCDEFGHIJKLMNOPQRS';
    const randomType = pieces[Math.floor(Math.random() * 28)];

    if (!nextPiece) {
        nextPiece = createPiece(randomType);
    }

    player.matrix = JSON.parse(JSON.stringify(nextPiece));
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);

    const nextRandomType = pieces[Math.floor(Math.random() * 28)];
    nextPiece = createPiece(nextRandomType);
    drawNextPiece(nextPiece);

    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        isPaused = true;
        drawPauseScreen();
        resetStatsOnUnpause = true;
    }
}

function determineLevelSpeed() {
    // Determine the index to use within the bounds of the array
    let levelIndex = Math.min(level, levelSpeeds.length - 1);

    dropInterval = levelSpeeds[levelIndex];
}

let incrementPerLevel = 7;
let baseLevelUpdateThreshold = 3;


function updateLevel() {

    // Calculate the exponential threshold based on the level
    let levelUpdateThreshold = baseLevelUpdateThreshold + (level * incrementPerLevel);

    // Check if the totalLineCount meets the calculated threshold
    if (totalLineCount % levelUpdateThreshold === 0) {
        // Increase the level by 1 when the threshold is met
        level++;
    }
}



function arenaSweep() {
    let rowCount = 1;
    let simulatedRowCount = 1;
    outer: for(let y = arena.length -1; y > 0; --y) {
        for(let x = 0; x < arena[y].length; ++x) {
            if(arena[y][x] == 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += simulatedRowCount * 50;
        totalLineCount += rowCount
        simulatedRowCount *= 2;
        updateLevel() 
        determineLevelSpeed()
    }
}



let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;


function update(time = 0) {
    if(isPaused) { return }

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        dropPlayer();
    }


    draw();
    requestAnimationFrame(update);
}

function merge(arena, player) {
    player.matrix.forEach((row,y) => {
        row.forEach((value,x) => {
            if(value !== 0) {
                arena[y+player.pos.y][x + player.pos.x] = value;
            }
        })
    })
    canSwap = true;
}




let isPaused = false;

function drawPauseScreen() {
    // Draw dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, canvas.width / 30, canvas.height / 30);  
    ctx.fillStyle = '#919191';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '10px Arial';
    
    const textX = (canvas.width / 2) / 30;  
    const textY = (canvas.height / 2) / 30; 
    
    ctx.fillText('II', textX, textY);
}


let storedPiece = null;
let canSwap = true;

function holdPiece() {
    if(!canSwap) {return}
    if (storedPiece === null) {
        // If no piece is stored, store the current piece and get a new one
        storedPiece = JSON.parse(JSON.stringify(player.matrix));
        playerReset();
        canSwap = false;
    } else {
        // Swap the stored piece with the current piece
        const temp = JSON.parse(JSON.stringify(player.matrix));
        player.matrix = JSON.parse(JSON.stringify(storedPiece));
        storedPiece = temp;
        canSwap = false;

    }

    // Redraw the stored piece on the storedPieceCanvas
    drawStoredPiece();
}

let storedPieceCtx = storedPieceCanvas.getContext('2d');

function drawStoredPiece() {
    storedPieceCtx.clearRect(0, 0, storedPieceCanvas.width, storedPieceCanvas.height);
    
    if (storedPiece !== null) {
        const blockSize = storedPieceCanvas.width / 5;
        const offsetX = (storedPieceCanvas.width - blockSize * storedPiece[0].length) / 2;
        const offsetY = (storedPieceCanvas.height - blockSize * storedPiece.length) / 2;

        storedPiece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    storedPieceCtx.fillStyle = convertToColorString(value);
                    storedPieceCtx.fillRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
                    storedPieceCtx.strokeStyle = '#fff';
                    storedPieceCtx.lineWidth = 2;
                    storedPieceCtx.strokeRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
                }
            });
        });
    }
}




const arena = createMatrix(12,24)


playerReset();
updateScore();
update();

