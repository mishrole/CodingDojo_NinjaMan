const worldContainer = document.getElementById('world');
const character = document.getElementById("ninjaman");

const boxSize = 40;
let leftValue = boxSize, topValue = boxSize;

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 2, 2, 0, 0, 1, 2, 0, 1], 
    [1, 2, 1, 0, 1, 1, 1, 1, 2, 1], 
    [1, 2, 0, 2, 0, 1, 1, 1, 0, 1], 
    [1, 1, 0, 2, 0, 0, 1, 0, 0, 1],
    [1, 2, 1, 0, 0, 2, 1, 2, 0, 1], 
    [1, 0, 1, 0, 2, 0, 1, 0, 1, 1],
    [1, 2, 0, 2, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const mapGuide = {
    0: 'blank',
    1: 'wall',
    2: 'sushi'
}

let characterCords = {
    x: 1,
    y: 1
} 

function mapGenerator() {
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
    character.style.top = `${characterCords.y * boxSize}px`;
    character.style.left = `${characterCords.x * boxSize}px`;
}

function isMoveValid(nextMove, e) {
    if(e.keyCode == 37 || e.keyCode == 39) { // LEFT || RIGHT
        // console.log(`Current/Next Column: ${nextMove} | Current/Next Element Type: ${map[characterCords.y][nextMove]}`);
        // map[row][column]
        if(map[characterCords.y][nextMove] !== 1) {
            return true;
        }
        return false;
    } else if (e.keyCode == 38 || e.keyCode == 40) { // UP // DOWN
        // console.log(`Current/Next Row: ${nextMove} | Current/Next Element Type: ${map[nextMove][characterCords.x]}`);
        // map[row][column]
        if(map[nextMove][characterCords.x] !== 1) {
            return true;
        }
        return false;
    }
}

function move(e) {
    if(e.keyCode == 37) { // LEFT
        let nextMove = characterCords.x - 1;
        character.style.transform = 'scale(-1, 1)';
        
        if(isMoveValid(nextMove, e)) {
            characterCords.x--;
        }
    }
    else if(e.keyCode == 38) { // TOP;
        let nextMove = characterCords.y - 1;
        character.style.transform = 'rotate(270deg)';

        if(isMoveValid(nextMove, e)) {
            characterCords.y--;
        }
    }
    else if (e.keyCode == 39) { // RIGHT
        let nextMove = characterCords.x + 1;
        character.style.transform = '';

        if(isMoveValid(nextMove, e)) {
            characterCords.x++;
        } 		
    }
    else if (e.keyCode == 40) { // DOWN
        let nextMove = characterCords.y + 1;
        character.style.transform = 'rotate(90deg)';

        if(isMoveValid(nextMove, e)) {
            characterCords.y++;
        }
    }

    spawnCharacter();
}

mapGenerator();
spawnCharacter();

document.onkeydown = function(e) {
    move(e);
}
