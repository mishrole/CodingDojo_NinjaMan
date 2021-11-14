/*
Tu desafío será:
(Básico) Llevar la cuenta de cuántos sushis se come NinjaMan. ✔
(Básico) Añadir Onigiri como comida alternativa para NinjaMan. ✔
(Intermedio) Que se genere un mundo al azar cuando se cargue la página. ✔ (Demasiado Azar)
(Avanzado) Añadir Fantasmas que persigan a NinjaMan.
(Avanzado) Darle 3 vidas a NinjaMan. Cuando un fantasma toque a NinjaMan 3 veces, aparezca Game Over
*/

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
let isGameOver = false;
let score = 0;
let map = [];

const mapGuide = {
    0: 'blank',
    1: 'wall',
    2: 'sushi', // 10 points
    3: 'onigiri', // 5 points
    4: 'house'
}

const wallModelGuide = {
    modelT: function(param) {

        let x = param[0];
        let y = param[1];

        for(let i = 1; i <= 5; i++) {
            map[x][y + i] = 3;
            map[x + 1][y + i] = 3;
            map[x + 2][y + i] = 3;
            map[x + 3][y + i] = 3;
            map[x + 4][y + i] = 3;

            if(i >= 2 && i <= 4) {
                map[x + 1][y + i] = 1;
            }

            if(i === 3) {
                map[x + 2][y + i] = 1;
                map[x + 3][y + i] = 1;
            } 
        }
    },
    modelC: function(param) {

        let x = param[0];
        let y = param[1];

        for(let i = 1; i <= 5; i++) {
            map[x][y + i] = 3;
            map[x + 2][y + i] = 3;
            map[x + 3][y + i] = 3;
            map[x + 4][y + i] = 3;

            if(i >= 2 && i <= 4) {
                map[x + 1][y + i] = 1;

                if(i === 2) {
                    map[x + i][y + i] = 1;
                }

                map[x + 3][y + i] = 1;

            } else {
                map[x + 1][y + i] = 3;
            }

        }
    },
    modelZ: function(param) {
        
        let x = param[0];
        let y = param[1];

        for(let i = 1; i <= 5; i++) {
            map[x][y + i] = 3;
            map[x + 2][y + i] = 3;
            map[x + 3][y + i] = 3;
            map[x + 4][y + i] = 3;

            if(i >= 2 && i <= 4) {
                map[x + 2][y + i] = 1;
            } else {
                map[x + 1][y + 2] = 1;
                map[x + 3][y + 4] = 1;
            }
        }
    },
    modelI: function(param) {

        let x = param[0];
        let y = param[1];

        for(let i = 1; i <= 3; i++) {
            map[x][y + i] = 3;
            map[x + 4][y + i] = 3;

            if(i >= 1 && i <= 3) {
                map[x + i][y + 2] = 1;
            }
        }
    },
    modelH: function(param) {
        let x = param[0];
        let y = param[1];

        for(let i = 1; i <= 5; i++) {
            
            map[i][y + 1] = 3;
            map[x][y + i] = 3;
            map[x + 4][y + i] = 3;

            if(i >= 1 && i <= 3) {
                map[x + i][y + 2] = 1;
                map[x + i][y + 4] = 1;

                if(i === 3) {
                    map[x + 1][y + i] = 3;
                    map[x + 2][y + i] = 1;
                    map[x + 3][y + i] = 3;
                }
            }

            if(i === 5) {
                map[x + 1][i] = 3;
                map[x + 2][i] = 3;
                map[x + 3][i] = 3;
            }
        }
    }
}

const mapModels = {
    model1: function() {
        wallModelGuide.modelT([1,0]);
        wallModelGuide.modelZ([5,0]);
        wallModelGuide.modelC([9,0]);
        wallModelGuide.modelH([11,0]);
    
        wallModelGuide.modelZ([1,4]);
        wallModelGuide.modelT([4,3]);
        wallModelGuide.modelT([4,6]);
        wallModelGuide.modelT([10,4]);
        wallModelGuide.modelZ([11,6]);

        wallModelGuide.modelC([1,10]);
        wallModelGuide.modelT([4,10]);
        wallModelGuide.modelZ([6,10]);
        wallModelGuide.modelI([9,10]);
        wallModelGuide.modelH([11,10]);

    },
    model2: function() {
        wallModelGuide.modelZ([1,0]);
        wallModelGuide.modelC([5,0]);
        wallModelGuide.modelT([10,0]);
    
        wallModelGuide.modelC([1,5]);
        wallModelGuide.modelZ([10,5]);
    
        wallModelGuide.modelZ([1,10]);
        wallModelGuide.modelC([5,10]);
        wallModelGuide.modelT([10,10]);
    },
    model3: function() {
        wallModelGuide.modelH([1,0]);
        wallModelGuide.modelZ([5,0]);
        wallModelGuide.modelT([9,0]);
        wallModelGuide.modelI([11,0]);

        wallModelGuide.modelZ([1,4]);
        wallModelGuide.modelC([3,4]);
        wallModelGuide.modelT([10,4]);
        wallModelGuide.modelZ([11,6]);
        wallModelGuide.modelI([11,3]);

        wallModelGuide.modelZ([1,8]);
        wallModelGuide.modelI([1,12]);
        wallModelGuide.modelC([5,10]);
        wallModelGuide.modelT([10,10]);
    },
    model4: function() {
        wallModelGuide.modelZ([1,0]);
        wallModelGuide.modelH([4,0]);
        wallModelGuide.modelZ([6,0]);
        wallModelGuide.modelT([9,0]);
        wallModelGuide.modelZ([11,0]);

        wallModelGuide.modelC([1,4]);
        wallModelGuide.modelC([1,6]);

        wallModelGuide.modelI([9,4]);
        wallModelGuide.modelC([8,6]);
        wallModelGuide.modelZ([10,8]);
        wallModelGuide.modelZ([11,6]);

        wallModelGuide.modelC([1,10]);
        wallModelGuide.modelT([4,10]);
        wallModelGuide.modelZ([6,10]);
        wallModelGuide.modelI([9,10]);
        wallModelGuide.modelH([11,10]);
    }
}

// function drawRandomWalls(walls) {
//     for(let i = 0; i < parseInt(walls); i++) {
//         let randomModel = randomNumber(0, 3);
//         let randomCords = [randomNumber(1, parseInt((mapSize / 2) + 1)), randomNumber(1, parseInt((mapSize / 2) + 1))];
//         console.log('randomCords', randomCords);

//         switch (randomModel) {
//             case 0:
//                 wallModelGuide.modelT(randomCords);
//                 break;
//             case 1:
//                 wallModelGuide.modelC(randomCords);
//                 break;
//             case 2:
//                 wallModelGuide.modelZ(randomCords);
//                 break;
//             default:
//                 wallModelGuide.modelI(randomCords);
//                 break;
//         }
//     }
// }

let ninjamanCords;

let ghostsCords = {
    'bluey': {
        x: -1,
        y: -1
    },
    'pinky': {
        x: -1,
        y: -1
    },
    'pumpky': {
        x: -1,
        y: -1
    },
    'red': {
        x: -1,
        y: -1
    }
}

// Static

let ghostsHouseCords = [
    [centerBlock - 1, centerBlock],
    [centerBlock, centerBlock - 1],
    [centerBlock, centerBlock],
    [centerBlock, centerBlock + 1],
];

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRow(min, max) {
    let row = [];
    let sushiCounter = 0;

    for(let column = 0; column < mapSize; column++) {
        // First and Last Column : Wall
        if(column === 0 || column === mapSize - 1) {
            row.push(1);
        } else {
            let currentColumnElement;
            
            // If: Previous/Next Block is Sushi or Onigiri -> Current Block Onigiri
            if(row[column + 1] === 2 || row[column + 1] === 3) {
                currentColumnElement = 3;
            } else {
                currentColumnElement = randomNumber(min, max);

                if(currentColumnElement === 1) {
                    row[column - 1] === 3;
                    row[column + 1] === 3; 
                }
                
                if(currentColumnElement === 2) {
                    if(sushiCounter < mapSize / 4) {
                        sushiCounter++;
                    } else {
                        currentColumnElement = 3;
                    }
                }
            }

            row.push(currentColumnElement);
        }
    }

    return row;
}

function mapGenerator() {
    let temporalMap = [];

    for(let i = 0; i < mapSize; i++) {
        if(i === 0 || i === mapSize - 1) {
            // First and Last Row : Wall
            temporalMap.push(randomRow(1, 1));
        } else {
            temporalMap.push(randomRow(2, 3));
        }
    }

    // Clear Ninjaman Start Position
    temporalMap[1][1] = 0;
    temporalMap[1][2] = 3;
    temporalMap[2][1] = 3;

    map = temporalMap;
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

// X = Rows -> Move Up & Down | Y = Columns -> Move Left & Right
function spawnCharacter() {
    ninjaman.style.top = `${ninjamanCords.x * boxSize}px`;
    ninjaman.style.left = `${ninjamanCords.y * boxSize}px`;
}

// To-Do: Refactor - Dynamic?
function drawGhostsHouse() {
    // Top-top
    map[centerBlock - 2][centerBlock - 3] = 3;
    map[centerBlock - 2][centerBlock - 2] = 3;
    map[centerBlock - 2][centerBlock - 1] = 3;
    map[centerBlock - 2][centerBlock] = 3;
    map[centerBlock - 2][centerBlock + 1] = 3;
    map[centerBlock - 2][centerBlock + 2] = 3;
    map[centerBlock - 2][centerBlock + 3] = 3;

    // Top
    map[centerBlock - 1][centerBlock - 3] = 3;
    map[centerBlock - 1][centerBlock - 2] = 1;
    map[centerBlock - 1][centerBlock - 1] = 1;
    map[centerBlock - 1][centerBlock] = 4;
    map[centerBlock - 1][centerBlock + 1] = 1;
    map[centerBlock - 1][centerBlock + 2] = 1;
    map[centerBlock - 1][centerBlock + 3] = 3;
    
    // Center
    map[centerBlock][centerBlock - 3] = 3;
    map[centerBlock][centerBlock - 2] = 1;
    map[centerBlock][centerBlock - 1] = 4;
    map[centerBlock][centerBlock] = 4;
    map[centerBlock][centerBlock + 1] = 4;
    map[centerBlock][centerBlock + 2] = 1;
    map[centerBlock][centerBlock + 3] = 3;

    // Bottom
    map[centerBlock + 1][centerBlock - 3] = 3;
    map[centerBlock + 1][centerBlock - 2] = 1;
    map[centerBlock + 1][centerBlock - 1] = 1;
    map[centerBlock + 1][centerBlock] = 1;
    map[centerBlock + 1][centerBlock + 1] = 1;
    map[centerBlock + 1][centerBlock + 2] = 1;
    map[centerBlock + 1][centerBlock + 3] = 3;

    // Bottom-Bottom
    map[centerBlock + 2][centerBlock - 3] = 3;
    map[centerBlock + 2][centerBlock - 2] = 3;
    map[centerBlock + 2][centerBlock - 1] = 3;
    map[centerBlock + 2][centerBlock] = 3;
    map[centerBlock + 2][centerBlock + 1] = 3;
    map[centerBlock + 2][centerBlock + 2] = 3;
    map[centerBlock + 2][centerBlock + 3] = 3;
}

function setGhostCords(ghost, index) {
    ghostsCords[ghost].x = ghostsHouseCords[index][0];
    ghostsCords[ghost].y = ghostsHouseCords[index][1];
}

function spawnGhost(ghost) {
    document.getElementById(`${ghost}`).style.top = `${ghostsCords[ghost].x * boxSize}px`;
    document.getElementById(`${ghost}`).style.left = `${ghostsCords[ghost].y * boxSize}px`;
}

// Cords ✔
function isMoveValid(nextMove, e) {
    if(ninjamanCords.hasMove) {
        // LEFT || RIGHT
        if(e.keyCode == 37 || e.keyCode == 39) {
            if(map[ninjamanCords.x][nextMove] !== 1 && map[ninjamanCords.x][nextMove] !== 4) {
                return true;
            }
            return false;
        } 
        // UP || DOWN
        else if (e.keyCode == 38 || e.keyCode == 40) {
            if(map[nextMove][ninjamanCords.y] !== 1 && map[nextMove][ninjamanCords.y] !== 4) {
                return true;
            }
            return false;
        }
    }
}

function isMapBlank() {
    let onigiri = Array.from(document.querySelectorAll('.onigiri'));
    let sushi = Array.from(document.querySelectorAll('.sushi'));
    console.log(onigiri.length, sushi.length);

    if(onigiri.length + sushi.length === 0) { // onkeydown = +1 move
        isGameOver = true;
        ninjamanCords.hasMove = false;
        alert('WIN');
    }
}

// Cords ✔
function eat(nextMove, e) {
    let data = {};

    if(e.keyCode == 37 || e.keyCode == 39) {
        data.element = map[ninjamanCords.x][nextMove];
        data.direction = 'horizontal';
    } else if(e.keyCode == 38 || e.keyCode == 40) {
        data.element = map[nextMove][ninjamanCords.y];
        data.direction = 'vertical';
    }

    if(Object.keys(data).length > 0) {    
        if(data.direction === 'vertical') {
            map[nextMove][ninjamanCords.y] = 0;
        } else if(data.direction === 'horizontal') {
            map[ninjamanCords.x][nextMove] = 0;
        }

        if(data.element === 2) {
            score += 10;
        } else if (data.element === 3) {
            score += 5;
        }
    }

    scoreContainer.querySelector('span').innerHTML = score;
}

function moveNinjaman(e) {
    // LEFT : Move between Columns
    if(e.keyCode == 37) {
        let nextMove = ninjamanCords.y - 1;
        ninjaman.style.transform = 'scale(-1, 1)';
        
        if(isMoveValid(nextMove, e)) {
            ninjamanCords.y--;
            eat(nextMove, e);
        }
    }
    // TOP : Move between Rows
    else if(e.keyCode == 38) {
        let nextMove = ninjamanCords.x - 1;
        ninjaman.style.transform = 'rotate(270deg)';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.x--;
            eat(nextMove, e);
        }
    }
    // RIGHT : Move between Columns
    else if (e.keyCode == 39) {
        let nextMove = ninjamanCords.y + 1;
        ninjaman.style.transform = '';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.y++;
            eat(nextMove, e);
        } 		
    }
    // DOWN : Move between Rows
    else if (e.keyCode == 40) {
        let nextMove = ninjamanCords.x + 1;
        ninjaman.style.transform = 'rotate(90deg)';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.x++;
            eat(nextMove, e);
        }
    }

    drawMap();
    spawnCharacter();
    if(!isGameOver) {
        isMapBlank();
    }
}

function selectRandomMap() {
    let randomModel = randomNumber(0, Object.keys(mapModels).length);

    switch (randomModel) {
        case 0:
            mapModels.model1();
            break;
        case 1:
            mapModels.model2();
            break;
        case 2:
            mapModels.model3();
            break;
        default:
            mapModels.model4();
            break;
    }
}

function start() {
    // Reset Score
    score = 0;
    scoreContainer.querySelector('span').innerHTML = score;

    // Reset Ninjaman Position
    ninjamanCords = {
        x: 1,
        y: 1,
        currentDirection: 39,
        hasMove: true,
    }

    mapGenerator();
    // Too High = Enclosed items
    // drawRandomWalls(mapSize);
    selectRandomMap()
    drawGhostsHouse();
    drawMap(); // Final Map
    spawnCharacter();

    // Reset Ninja Direction
    ninjaman.style.transform = '';

    Object.keys(ghostsCords).forEach((key, index) => {
        setGhostCords(key, index);
        spawnGhost(key);
    });
}

start();

document.onkeydown = function(e) {
    moveNinjaman(e);
}

btnRefresh.addEventListener('click', function() {
    start();
});