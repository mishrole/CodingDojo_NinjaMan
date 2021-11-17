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
        x: 7,
        y: 8
    },
    'pinky': {
        x: 8,
        y: 7
    },
    'pumpky': {
        x: 8,
        y: 8
    },
    'red': {
        x: 8,
        y: 9
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
    // console.log(`ghost ${ghost} [${ghostsHouseCords[index][0]}, ${ghostsHouseCords[index][1]}]`)
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

function isAutoMoveValid(nextMove, ghost, direction) {
    if(direction === 37 || direction === 39) {
        if(map[ghostsCords[ghost].x][nextMove] !== 1 && map[ghostsCords[ghost].x][nextMove] !== 4) {
            return true;
        }
        return false;
    } else if (direction === 38 || direction === 40) {
        if(map[nextMove][ghostsCords[ghost].y] !== 1 && map[nextMove][ghostsCords[ghost].y] !== 4) {
            return true;
        }
        return false;
    }
}

function isMapBlank() {
    let onigiri = Array.from(document.querySelectorAll('.onigiri'));
    let sushi = Array.from(document.querySelectorAll('.sushi'));
    //console.log(onigiri.length, sushi.length);

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
            ninjamanCords.currentDirection = 37;
            ninjamanCords.y--;
            eat(nextMove, e);
        }
    }
    // TOP : Move between Rows
    else if(e.keyCode == 38) {
        let nextMove = ninjamanCords.x - 1;
        ninjaman.style.transform = 'rotate(270deg)';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.currentDirection = 38;
            ninjamanCords.x--;
            eat(nextMove, e);
        }
    }
    // RIGHT : Move between Columns
    else if (e.keyCode == 39) {
        let nextMove = ninjamanCords.y + 1;
        ninjaman.style.transform = '';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.currentDirection = 39;
            ninjamanCords.y++;
            eat(nextMove, e);
        } 		
    }
    // DOWN : Move between Rows
    else if (e.keyCode == 40) {
        let nextMove = ninjamanCords.x + 1;
        ninjaman.style.transform = 'rotate(90deg)';

        if(isMoveValid(nextMove, e)) {
            ninjamanCords.currentDirection = 40;
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

    // Set Ghosts coords X    -  Const cords
    Object.keys(ghostsCords).forEach((key, index) => {
        setGhostCords(key, index);
        spawnGhost(key);
    });


    /*
        - ¿Cuál va a ser la dirección de su primer movimiento?
        - ¿Cómo se va a elegir esa dirección?

        1. Determinar a qué direcciones SÍ se puede ir
            Probar en todas las direcciones y guardar las que no sean pared ni la casa
        2. Determinar cuál es la dirección más cercana a ninjaman
            Con las direcciones permitidas:
                Determinar si mi posición es mayor o menor en [x, y] con respecto a ninjaman
                    Si ghost.x > ninjaman.x entonces resto ghost.x - 1 y se mueve hacia arriba (row - 1)
                    Si ghost.y > ninjaman.y entonces resto ghost.y - 1 y se mueve hacia la izquierda (column - 1)
                    Si ghost.x < ninjaman.x entonces sumo ghost.x + 1 y se mueve hacia abajo (row + 1)
                    Si ghost.y < ninjaman.y entonces sumo ghost.y + 1 y se mueve hacia la derecha (column + 1)
                Determinar cuál de estas sumas o restas en [x, y] me da el resultado más cercano al ninjaman
        3. Si tiene más de una dirección posible y la misma distancia, elegir con random
    */

    // ¿Cuál es la dirección actual del Ninja?
    function currentNinjaDirection(ghost) {
        let ninjaX, ninjaY;
        // Comparar cada X con cada X y cada Y con cada Y para encontrar las 4 posibilidades y filtrar la mejor

        if (ghostsCords[ghost].x === ninjamanCords.x && ghostsCords[ghost].y === ninjamanCords.y) {
            // Están en el mismo lugar
            ninjaX = 'same';
            ninjaY = 'same';
        } else {
            // if(ghostsCords[ghost].x === ninjamanCords.x) {
            //     // Están en el mismo lugar
            //     ninjaX = 'same';
            // }
    
            // if(ghostsCords[ghost].y === ninjamanCords.y) {
            //     // Están en el mismo lugar
            //     ninjaY = 'same';
            // }

            // Cuando ambos son mayores, y cuando ambos son menores
            if(ghostsCords[ghost].x > ninjamanCords.x && ghostsCords[ghost].y > ninjamanCords.y) {
                // Fantasma está abajo y a la derecha del Ninja
                ninjaX = 'up';
                ninjaY = 'left';
            } else if(ghostsCords[ghost].x < ninjamanCords.x && ghostsCords[ghost].y < ninjamanCords.y) {
                // Fantasma está arriba y a la izquierda del Ninja
                ninjaX = 'down';
                ninjaY = 'right';
            }                // Cuando X es menor pero Y es mayor
            else if(ghostsCords[ghost].x < ninjamanCords.x && ghostsCords[ghost].y > ninjamanCords.y) {
                ninjaX = 'down';
                ninjaY = 'left';
                
            } else if(ghostsCords[ghost].x > ninjamanCords.x && ghostsCords[ghost].y < ninjamanCords.y) {
                // Cuando X es mayor y Y es menor
                ninjaX = 'up';
                ninjaY = 'right';
            } else {
                if(ghostsCords[ghost].x === ninjamanCords.x && ghostsCords[ghost].y !== ninjamanCords.y) {
                    // Cuando x es igual pero y no
                    if(ghostsCords[ghost].y < ninjamanCords.y) {
                        // Ninja está a la derecha de fantasma
                        ninjaX = 'same';
                        ninjaY = 'right'
                    } else if(ghostsCords[ghost].y > ninjamanCords.y) {
                        // Ninja está izquierda de fantasma
                        ninjaX = 'same';
                        ninjaY = 'left';
                    }
                } else if (ghostsCords[ghost].x !== ninjamanCords.x && ghostsCords[ghost].y === ninjamanCords.y) {
                    // Cuando x no es igual pero y sí
                    if(ghostsCords[ghost].x < ninjamanCords.x) {
                        // Ninja está abajo de fantasma
                        ninjaX = 'down';
                        ninjaY = 'same';
                    } else if(ghostsCords[ghost].x > ninjamanCords.x) {
                        // Ninja está arriba de fantasma
                        ninjaX = 'up';
                        ninjaY = 'same';
                    }
                } else {
                    console.error("NO ENTRA EN NADA 1");
                    console.warn('DATA', ghostsCords[ghost], ninjamanCords)
                }
            }
            
            
        }
        

        return [ninjaX, ninjaY];
    }


    // Dentro de la función Start se ejecuta el intervalo que moverá al fantasma cada medio segundo

    let ghostMoveInterval = setInterval(() => {
        if(isGameOver) {
            clearInterval(ghostMoveInterval);
        }

        // ¿A dónde sí puede ir?

        // OJO: NO ESTOY CONTROLANDO NEGATIVOS AL RESTAR
        let nextMoveUp = ghostsCords['bluey'].x - 1 >= 1 ? ghostsCords['bluey'].x - 1 : ghostsCords['bluey'].x;
        let nextMoveDown = ghostsCords['bluey'].x + 1 <= mapSize - 2 ? ghostsCords['bluey'].x + 1 : ghostsCords['bluey'].x;
        let nextMoveLeft = ghostsCords['bluey'].y - 1 >= 1 ? ghostsCords['bluey'].y - 1 : ghostsCords['bluey'].y;
        let nextMoveRight = ghostsCords['bluey'].y + 1 <= mapSize - 2 ? ghostsCords['bluey'].y + 1 :  ghostsCords['bluey'].y;

        let moves = {
            up: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
            down: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
            left: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
            right: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
            upLeft: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
            upRight: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
            downLeft: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
            downRight: {
                isAvailable: false,
                possibleNextPosition: [],
                nextDistance: [],
                isBestPosition: false,
                currentGhostPosition: [],
                currentNinjaPosition: []
            },
        }

        // Difference between PossibleNextPosition & NinjaManCords

        // UP
        if(map[nextMoveUp][ghostsCords['bluey'].y] !== 1 && map[nextMoveUp][ghostsCords['bluey'].y] !== 4) {
            moves.up.isAvailable = true;
            moves.up.possibleNextPosition = [nextMoveUp, ghostsCords['bluey'].y];
            moves.up.nextDistance = [nextMoveUp - ninjamanCords.x, ghostsCords['bluey'].y - ninjamanCords.y];
            moves.up.currentGhostPosition = [ghostsCords['bluey'].x, ghostsCords['bluey'].y]
            moves.up.currentNinjaPosition = [ninjamanCords.x, ninjamanCords.y]
        } else {
            moves.up.isAvailable = false;
        }
        // DOWN
        if(map[nextMoveDown][ghostsCords['bluey'].y] !== 1 && map[nextMoveDown][ghostsCords['bluey'].y] !== 4) {
            moves.down.isAvailable = true;
            moves.down.possibleNextPosition = [nextMoveDown, ghostsCords['bluey'].y];
            moves.down.nextDistance = [nextMoveDown - ninjamanCords.x, ghostsCords['bluey'].y - ninjamanCords.y];
            moves.down.currentGhostPosition = [ghostsCords['bluey'].x, ghostsCords['bluey'].y]
            moves.down.currentNinjaPosition = [ninjamanCords.x, ninjamanCords.y]
        } else {
            moves.down.isAvailable = false;
        }

        // LEFT
        if(map[ghostsCords['bluey'].x][nextMoveLeft] !== 1 && map[ghostsCords['bluey'].x][nextMoveLeft] !== 4) {
            moves.left.isAvailable = true;
            moves.left.possibleNextPosition = [ghostsCords['bluey'].x, nextMoveLeft];
            moves.left.nextDistance = [ghostsCords['bluey'].x - ninjamanCords.x, nextMoveLeft - ninjamanCords.y];
            moves.left.currentGhostPosition = [ghostsCords['bluey'].x, ghostsCords['bluey'].y]
            moves.left.currentNinjaPosition = [ninjamanCords.x, ninjamanCords.y]
        } else {
            moves.left.isAvailable = false;
        }

        // RIGHT
        if(map[ghostsCords['bluey'].x][nextMoveRight] !== 1 && map[ghostsCords['bluey'].x][nextMoveRight] !== 4) {
            moves.right.isAvailable = true;
            moves.right.possibleNextPosition = [ghostsCords['bluey'].x, nextMoveRight];
            moves.right.nextDistance = [ghostsCords['bluey'].x - ninjamanCords.x, nextMoveRight - ninjamanCords.y];
            moves.right.currentGhostPosition = [ghostsCords['bluey'].x, ghostsCords['bluey'].y]
            moves.right.currentNinjaPosition = [ninjamanCords.x, ninjamanCords.y]
        } else {
            moves.right.isAvailable = false;
        }

        /*

        // UP + RIGHT
        if(map[nextMoveUp][nextMoveRight] !== 1 && map[nextMoveUp][nextMoveRight] !== 4) {
            moves.upRight.isAvailable = true;
            moves.upRight.possibleNextPosition = [nextMoveUp,nextMoveRight];
            moves.upRight.nextDistance = [nextMoveUp - ninjamanCords.x, nextMoveRight - ninjamanCords.y];
        } else {
            moves.upRight.isAvailable = false;
        }

        // UP + LEFT
        if(map[nextMoveUp][nextMoveLeft] !== 1 && map[nextMoveUp][nextMoveLeft] !== 4) {
            moves.upLeft.isAvailable = true;
            moves.upLeft.possibleNextPosition = [nextMoveUp, nextMoveLeft];
            moves.upLeft.nextDistance = [nextMoveUp - ninjamanCords.x, nextMoveLeft - ninjamanCords.y];
        } else {
            moves.upLeft.isAvailable = false;
        }


        // DOWN + RIGHT
        if(map[nextMoveDown][nextMoveRight] !== 1 && map[nextMoveDown][nextMoveRight] !== 4) {
            moves.downRight.isAvailable = true;
            moves.downRight.possibleNextPosition = [nextMoveDown, nextMoveRight];
            moves.downRight.nextDistance = [nextMoveDown - ninjamanCords.x, nextMoveRight - ninjamanCords.y];
        } else {
            moves.downRight.isAvailable = false;
        }

        // DOWN + LEFT
        if(map[nextMoveDown][nextMoveLeft] !== 1 && map[nextMoveDown][nextMoveLeft] !== 4) {
            moves.downLeft.isAvailable = true;
            moves.downLeft.possibleNextPosition = [nextMoveDown, nextMoveLeft];
            moves.downLeft.nextDistance = [nextMoveDown - ninjamanCords.x, nextMoveLeft - ninjamanCords.y];
        } else {
            moves.downLeft.isAvailable = false;
        } 
    */

        // console.log(moves);

        const asArray = Object.entries(moves);
        const filtered = Object.fromEntries(asArray.filter(([key, value]) => value.isAvailable));

        let selectedMove = {
            nextDirection: '',
            nextMove: []
        };

        let minCoords;

        let mishrole = {
            result: []
        };

        Object.keys(filtered).forEach((key, index) => {
            let ninjaDirection = currentNinjaDirection('bluey');

            let bestPosX, bestPosY;

            if(Object.keys(filtered).length > 1) {
                // Si ninguno de los dos es indefinido
                if(typeof ninjaDirection[0] !== 'undefined' && typeof ninjaDirection[1] !== 'undefined') {
                    // Si es 'same' en ambos
                    if (ninjaDirection[0] === 'same' && ninjaDirection[1] === 'same') {
                        // Se queda en la posición de Ninja en X y en Y
                        mishrole.result = [ninjamanCords.x, ninjamanCords.y];
                        bestPosX = ninjamanCords.x;
                        bestPosY = ninjamanCords.y;
                        // Si solo X es 'same'
                    } else if(ninjaDirection[0] === 'same' && typeof ninjaDirection[1] !== 'undefined') {
                        // Se queda en X de Ninja y toma Y de posible posición
                        if(Object.keys(filtered).find(elemento => elemento === ninjaDirection[1])) {
                            mishrole.result = [ninjamanCords.x, filtered[ninjaDirection[1]].possibleNextPosition[1]]
                            bestPosX = ninjamanCords.x;
                            bestPosY = filtered[ninjaDirection[1]].possibleNextPosition[1];
                            console.log('Dirección de Ninja [1]', ninjaDirection[1], 'Filtered', filtered);
                        }
                        // Si solo Y es 'same'
                    } else if(ninjaDirection[1] === 'same' && typeof ninjaDirection[0] !== 'undefined') {
                        // Se queda en Y de Ninja y toma la X de posible posición
                        if(Object.keys(filtered).find(elemento => elemento === ninjaDirection[0])) {
                            mishrole.result = [filtered[ninjaDirection[0]].possibleNextPosition[0] , ninjamanCords.y]
                            bestPosX = filtered[ninjaDirection[0]].possibleNextPosition[0];
                            bestPosY = ninjamanCords.y;
                        }
                    } else {
                        // Ninguna es 'same', se compara con las keys del objeto filtrado
                        // Si la key se encuentra en X o en Y
                        // if(key === ninjaDirection[0] && key === ninjaDirection[1]) {
                        //     mishrole.result = filtered[key].possibleNextPosition;
                        //     bestPosX = filtered[key].possibleNextPosition[0];
                        //     bestPosY = filtered[key].possibleNextPosition[1];
                        // } else if(key === ninjaDirection[0]) {
                        //     mishrole.result = [filtered[key].possibleNextPosition];
                        //     bestPosX = filtered[key].possibleNextPosition[0];
                        //     bestPosY = filtered[key].possibleNextPosition[1];
                        // } else {
                        //     console.log('PRUEBAAAAAA');
                        // }
                            // } else {
                        //     // [undefined, 'left'];
                        //     console.log("NO COINCIDE CON NADA")
                        //}
                        console.warn('No revisado', ninjaDirection);

                        // [UP, LEFT] ENTRA ACÁ


                        if(key === ninjaDirection[0] && key === ninjaDirection[1]) {
                            mishrole.result = filtered[key].possibleNextPosition;
                            bestPosX = filtered[key].possibleNextPosition[0];
                            bestPosY = filtered[key].possibleNextPosition[1];
                        } else if(key === ninjaDirection[0]) {
                            mishrole.result = [filtered[ninjaDirection[0]].possibleNextPosition];
                            bestPosX = filtered[ninjaDirection[0]].possibleNextPosition[0];
                            bestPosY = filtered[ninjaDirection[0]].possibleNextPosition[1];
                        } else if(key === ninjaDirection[1]) {
                            mishrole.result = [filtered[ninjaDirection[1]].possibleNextPosition];
                            bestPosX = filtered[ninjaDirection[1]].possibleNextPosition[0];
                            bestPosY = filtered[ninjaDirection[1]].possibleNextPosition[1];
                        } else {
                            // Acá está entrando en ocasiones
                            if(Object.keys(filtered).find(elemento => elemento === ninjaDirection[0]) &&
                            Object.keys(filtered).find(elemento => elemento === ninjaDirection[1])) {
                                mishrole.result = filtered[ninjaDirection[0]].possibleNextPosition;
                                bestPosX = filtered[ninjaDirection[0]].possibleNextPosition[0];
                                bestPosY = filtered[ninjaDirection[0]].possibleNextPosition[1];
                            } else {
                                mishrole.result = filtered[key].possibleNextPosition;
                                bestPosX = filtered[key].possibleNextPosition[0];
                                bestPosY = filtered[key].possibleNextPosition[1];
                                console.log("ENTRA EN ELSE NO REVISADO con key", key, "y direction ", ninjaDirection);
                            }


                        }
                          

                        

                        
                    }
                } else {
                    // Alguno es indefinido
                    if(typeof ninjaDirection[0] === 'undefined' && typeof ninjaDirection[1] === 'undefined') {
                        console.error("AMBOS SON UNDEFINED");
                    } else {
                        // Si solo X es indefinido
                        if (typeof ninjaDirection[0] === 'undefined') {
                            // Si la key es igual a Y
                            // console.warn('1: '+filtered[key].possibleNextPosition, `${ninjaDirection}`);
                            mishrole.result = filtered[key].possibleNextPosition;
                            bestPosX = filtered[key].possibleNextPosition[0];
                            bestPosY = filtered[key].possibleNextPosition[1];
                        // Si solo Y es indefinido
                        } else if (typeof ninjaDirection[1] === 'undefined') {
                            // console.warn('2: '+filtered[key].possibleNextPosition, `${ninjaDirection}`)
                            mishrole.result = filtered[key].possibleNextPosition;
                            bestPosX = filtered[key].possibleNextPosition[0];
                            bestPosY = filtered[key].possibleNextPosition[1];
                        }
                    }
                    
                }
            } else {
                mishrole.result = filtered[key].possibleNextPosition;
                bestPosX = filtered[key].possibleNextPosition[0];
                bestPosY = filtered[key].possibleNextPosition[1];
            }

            console.warn('DIRECCIÓN DEL NINJA, ¿EN CORRECTA?', ninjaDirection);
            console.log('RESULTADO', mishrole);
            // console.log('VAR BEST POS', bestPosX, bestPosY);
        });

        // Filter closest Move
        if(Object.keys(filtered).length > 0) {
            Object.keys(filtered).forEach((key, index) => {

                // ¿POr qué saco la siguiente distancia allá arriba? Las coordenadas del ninja cambian más rápido que esto
                // A veces x es menor pero Y es mayor, ese es el problema <----------------

                // Filtro la menor distancia

                if(index == 0) {
                    // console.log("entra a index 0")
                    minCoords = filtered[key].nextDistance;
                    selectedMove.nextDirection = key;
                    selectedMove.nextMove = filtered[key].possibleNextPosition;
                } else {
                    // console.log("entra a otro index");
                    // Si el próximo índice tiene menores coordenadas que el primer índice guardado, reemplazo

                   // Si la distancia tiene negativo, debe intentar ir positivo hacia distancia 0,0



                    if(filtered[key].nextDistance[0] <= minCoords[0] &&
                         filtered[key].nextDistance[1] <= minCoords[1]) {

                            // if(filtered[key].nextDistance[0] > 0 && filtered[key].nextDistance[1] > 0) {
                            //     minCoords = filtered[key].nextDistance // AQUÍ
                            //     selectedMove.nextDirection = key;
                            //     selectedMove.nextMove = filtered[key].possibleNextPosition;
                            // }

                            minCoords = filtered[key].nextDistance // AQUÍ

                            // Puede que X sea menor, o Y sea menor, o ambos sean menores
                            // Necesito saber cuál de estas posibles direcciones válidas es la mejor
                            
                            // En algún punto se están yendo a negativo (DIFERENCIA)

                            selectedMove.nextDirection = key;
                            selectedMove.nextMove = filtered[key].possibleNextPosition;


                            // Cuando x o y en movimientos mínimos es 0, debo elegir la mejor dirección
                            // if(filtered[key].nextDistance[0] === 0 && filtered[key].nextDistance[1] === 0) {
                                
                                
                            // }

                    }
                }

                console.log("Eligiendo")
                console.log('posibles:', filtered);
                console.log('distancia menor:', minCoords);
                console.log('posición de ninja', ninjamanCords);
                // console.log('posición de fantasma', ghostsCords);

            });
    
        }

        console.log('moves:', moves);
        console.log('selectedMove', selectedMove);
        console.log('----')

        // Update Ghost Position
        
        if(!isGameOver) {
            // console.log(filtered)
            // ghostsCords['bluey'].x = filtered[selectedMove.nextDirection].possibleNextPosition[0]
            // ghostsCords['bluey'].y = filtered[selectedMove.nextDirection].possibleNextPosition[1];

            ghostsCords['bluey'].x = mishrole.result[0]
            ghostsCords['bluey'].y = mishrole.result[1];
            
            if(ghostsCords['bluey'].x === ninjamanCords.x && ghostsCords['bluey'].y === ninjamanCords.y) {
                isGameOver = true;
                clearInterval(ghostMoveInterval);
            }

            spawnGhost('bluey'); // ¡Genial! ¡Se mueve!
        }

    }, 500);
}

start();

document.onkeydown = function(e) {
    if(!isGameOver) {
        moveNinjaman(e);
    }
}

btnRefresh.addEventListener('click', function() {
    isGameOver = false;
    start();
});