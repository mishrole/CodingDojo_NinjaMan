const ninjaman = document.getElementById("ninjaman");
const btnRefresh = document.getElementById("btnRefresh");
const scoreContainer = document.getElementById("score");
const worldContainer = document.getElementById('world');

// Ghosts
const bluey = document.getElementById('bluey');
const pinky = document.getElementById('pinky');
const pumpky = document.getElementById('pumpky');
const red = document.getElementById('red');

const boxSize = 40;
const mapSize = 15;

// Center Refresh Map Button
document.getElementById('options').style.width = `${mapSize * boxSize}px`;

let score = 0;
let map = [];

const mapGuide = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri'
}

let ninjamanCords = {
    x: 1,
    y: 1
}

let ghostsCords = {
    'bluey': {
        x: 2,
        y: 2
    },
    'pinky': {
        x: 3,
        y: 3
    },
    'pumpky': {
        x: 4,
        y: 4
    },
    'red': {
        x: 5,
        y: 5
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColumn(min, max) {
    let column = [];

    for(let i = 0; i < mapSize; i++) {
        // First and Last Column : Wall
        if(i === 0 || i === mapSize - 1) {
            column.push(1);
        } else {
            // If: Previous Block are Sushi or Onigiri -> Current Block Blank
            if(column[i-1] === 2 || column[i-1] === 3) {
                column.push(0);
            } else {
                column.push(randomNumber(min, max));
            }
        }
    }

    return column;
}

function mapGenerator() {
    let row = [];

    for(let i = 0; i < mapSize; i++) {
        if(i === 0 || i === mapSize - 1) {
            row.push(randomColumn(1,1));
        } else {
            row.push(randomColumn(0, 3));
        }
    }

    // Clear Ninjaman Start Position
    row[1][1] = 0;

    map = row;
}

function drawMap() {
    worldContainer.innerHTML = '';

    for(let i = 0; i < map.length; i++) {
        let rowContainer = document.createElement('div');
        rowContainer.className = 'row';

        for(let j = 0; j < map[i].length; j++) {
            let elementContainer = document.createElement('div');
            let currentElement = map[i][j];
            
            elementContainer.className = mapGuide[currentElement];
            rowContainer.append(elementContainer);
        }

        worldContainer.append(rowContainer);
    }
}

function spawnCharacter() {
    ninjaman.style.top = `${ninjamanCords.y * boxSize}px`;
    ninjaman.style.left = `${ninjamanCords.x * boxSize}px`;
}

function setGhostCords(ghost) {
    let cordY = 0;
    do {
        // let randomRow = randomNumber(1, mapSize - 2);
        let randomColumn = randomNumber(1, mapSize - 2);

        for(let row = mapSize - 2; row >= 1; row--) {
            if(map[row][randomColumn] === 0) {

                // for(let cord in ghostsCords) {
                //     if(ghostsCords[cord].x !== row && ghostsCords[cord].y !== randomColumn) {

                //         console.log(ghostsCords)
                        
                //     }
                // }
                ghostsCords[ghost].y = row;
                ghostsCords[ghost].x = randomColumn;
                cordY = 2;
                break;
                
                // console.log(map[row]);
                // console.log(`Row ${row} | Column ${randomColumn}`)
                
            }
        }

            // for(let row = mapSize - 1; row >= 1; row--) {
            //     random = randomNumber(0, mapSize);
            //     if(map[row][random] === 0) {
            //         cordX = row;
            //         cordY = random;
            //         break;
            //     }
            // }

        // if(map[randomRow][randomColumn] === 0) {
        //     console.log([randomRow, randomColumn]);
        //     ghostsCords[ghost].y = randomRow;
        //     ghostsCords[ghost].x = randomColumn;
        //     cordY = 2;
        // }

                    // console.log([randomRow, randomColumn]);
            // cordX = randomRow;
            // cordY = randomColumn;

    } while (cordY < 1);

    console.log(map)

    // ghostsCords[ghost].y = cordY;
    // ghostsCords[ghost].x = cordX;

    // console.log(ghostsCords);
    // console.log(map[cordX][cordY])
    
    // return [cordX, cordY];
}

function spawnGhost(ghost) {
    setGhostCords(ghost);
    document.getElementById(`${ghost}`).style.top = `${ghostsCords[ghost].y * boxSize}px`;
    document.getElementById(`${ghost}`).style.left = `${ghostsCords[ghost].x * boxSize}px`;
}

function isMoveValid(nextMove, e) {
    // LEFT || RIGHT
    if(e.keyCode == 37 || e.keyCode == 39) {
        if(map[ninjamanCords.y][nextMove] !== 1) {
            return true;
        }
        return false;
    } 
    // UP || DOWN
    else if (e.keyCode == 38 || e.keyCode == 40) {
        if(map[nextMove][ninjamanCords.x] !== 1) {
            return true;
        }
        return false;
    }
}

function eat(nextMove, e) {

    let data = {}

    if(e.keyCode == 37 || e.keyCode == 39) {
        data.element = map[ninjamanCords.y][nextMove];
        data.direction = 'horizontal';
    } else if(e.keyCode == 38 || e.keyCode == 40) {
        data.element = map[nextMove][ninjamanCords.x];
        data.direction = 'vertical';
    }

    if(Object.keys(data).length > 0) {
        if(data.element === 2) {
            score+=10;
        } else if (data.element === 3) {
            score+=5;
        }
    
        if(data.direction === 'vertical') {
            map[nextMove][ninjamanCords.x] = 0;
        } else if(data.direction === 'horizontal') {
            map[ninjamanCords.y][nextMove] = 0;
        }
    }

    scoreContainer.querySelector('span').innerHTML = score;
}

function move(e) {
    // LEFT
    if(e.keyCode == 37) {
        let nextMove = ninjamanCords.x - 1;
        ninjaman.style.transform = 'scale(-1, 1)';
        
        if(isMoveValid(nextMove, e)) {
            ninjamanCords.x--;
            eat(nextMove, e);
        }
    }
    // TOP
    else if(e.keyCode == 38) {
        let nextMove = ninjamanCords.y - 1;
        ninjaman.style.transform = 'rotate(270deg)';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.y--;
            eat(nextMove, e);
        }
    }
    // RIGHT
    else if (e.keyCode == 39) {
        let nextMove = ninjamanCords.x + 1;
        ninjaman.style.transform = '';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.x++;
            eat(nextMove, e);
        } 		
    }
    // DOWN
    else if (e.keyCode == 40) {
        let nextMove = ninjamanCords.y + 1;
        ninjaman.style.transform = 'rotate(90deg)';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.y++;
            eat(nextMove, e);
        }
    }

    drawMap();
    spawnCharacter();
}

function start() {
    // Reset Score
    score = 0;
    scoreContainer.querySelector('span').innerHTML = score;

    // Reset Ninjaman Position
    ninjamanCords = {
        x: 1,
        y: 1
    }

    mapGenerator();
    drawMap();
    spawnCharacter();

    // Reset Ninja Direction
    ninjaman.style.transform = '';

    for(let ghost in ghostsCords) {
        spawnGhost(ghost);
    }
}

start();

document.onkeydown = function(e) {
    move(e);
}

btnRefresh.addEventListener('click', function() {
    start();
});