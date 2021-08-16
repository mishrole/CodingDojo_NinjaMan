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
const mapSize = 17;

// Center Refresh Map Button
document.getElementById('options').style.width = `${mapSize * boxSize}px`;

// MapCenter
let centerBlock = Math.floor(mapSize / 2);

let score = 0;
let map = [];

const mapGuide = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri',
    4: 'test'
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

let ghostsHouseCords = [
    [centerBlock, centerBlock - 1],
    [centerBlock - 1, centerBlock],
    [centerBlock, centerBlock],
    [centerBlock + 1, centerBlock]
];

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
            // If: Previous Block are Sushi or Onigiri, or Next Block is a wall  -> Current Block Blank
            if(column[i-1] === 2 || column[i-1] === 3 || column[i+1] == 1) {
                column.push(0);
            } else {

                let current = randomNumber(min, max);
                column.push(current);
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
    row[1][2] = 0;
    row[2][1] = 0;

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

function drawGhostHouse() {

    // Top-top
    map[centerBlock - 2][centerBlock - 3] = 0;
    map[centerBlock - 2][centerBlock - 2] = 0;
    map[centerBlock - 2][centerBlock - 1] = 0;
    map[centerBlock - 2][centerBlock] = 0;
    map[centerBlock - 2][centerBlock + 1] = 0;
    map[centerBlock - 2][centerBlock + 2] = 0;
    map[centerBlock - 2][centerBlock + 3] = 0;

    // Top
    map[centerBlock - 1][centerBlock - 3] = 0;
    map[centerBlock - 1][centerBlock - 2] = 1;
    map[centerBlock - 1][centerBlock - 1] = 1;
    map[centerBlock - 1][centerBlock] = 4;
    map[centerBlock - 1][centerBlock + 1] = 1;
    map[centerBlock - 1][centerBlock + 2] = 1;
    map[centerBlock - 1][centerBlock + 3] = 0;
    
    // centerBlock
    map[centerBlock][centerBlock - 3] = 0;
    map[centerBlock][centerBlock - 2] = 1;
    map[centerBlock][centerBlock - 1] = 4;
    map[centerBlock][centerBlock] = 4;
    map[centerBlock][centerBlock + 1] = 4;
    map[centerBlock][centerBlock + 2] = 1;
    map[centerBlock][centerBlock + 3] = 0;

    // Bottom
    map[centerBlock + 1][centerBlock - 3] = 0;
    map[centerBlock + 1][centerBlock - 2] = 1;
    map[centerBlock + 1][centerBlock - 1] = 1;
    map[centerBlock + 1][centerBlock] = 1;
    map[centerBlock + 1][centerBlock + 1] = 1;
    map[centerBlock + 1][centerBlock + 2] = 1;
    map[centerBlock + 1][centerBlock + 3] = 0;

    // Bottom-Bottom
    map[centerBlock + 2][centerBlock - 3] = 0;
    map[centerBlock + 2][centerBlock - 2] = 0;
    map[centerBlock + 2][centerBlock - 1] = 0;
    map[centerBlock + 2][centerBlock] = 0;
    map[centerBlock + 2][centerBlock + 1] = 0;
    map[centerBlock + 2][centerBlock + 2] = 0;
    map[centerBlock + 2][centerBlock + 3] = 0;

}

function setGhostCords(ghost, index) {

    ghostsCords[ghost].x = ghostsHouseCords[index][0];
    ghostsCords[ghost].y = ghostsHouseCords[index][1];
    // ghostsCords[ghost].y = centerBlock;
    // ghostsCords[ghost].x = centerBlock;

    console.log(ghostsHouseCords)
    // let status = true;
    // do {
    //     let randomColumn = randomNumber(1, mapSize - 2);

    //     for(let row = mapSize - 2; row >= 1; row--) {
    //         if(map[row][randomColumn] === 0) {
    //             ghostsCords[ghost].y = row;
    //             ghostsCords[ghost].x = randomColumn;
    //             status = false;
    //             break;
    //         }
    //     }
    // } while (status);

    
}

function spawnGhost(ghost) {
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
    drawGhostHouse();
    drawMap();
    spawnCharacter();

    // Reset Ninja Direction
    ninjaman.style.transform = '';

    Object.keys(ghostsCords).forEach((key, index) => {
        // console.log(ghostsCords[key]);
        // console.log(index);
        setGhostCords(key, index);
        spawnGhost(key);
    });

    // for(let ghost in ghostsCords) {
    //     spawnGhost(ghost);
    // }
}

start();

document.onkeydown = function(e) {
    move(e);
}

btnRefresh.addEventListener('click', function() {
    start();
});