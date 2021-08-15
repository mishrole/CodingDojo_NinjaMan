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

function isMoveValid(move) {
    let max = map.length * boxSize, min = 0;
    let currentMove = move * boxSize;

    if(currentMove >= min && currentMove < max) {
        return true;
    }

    return false;
}

function move(e) {
    if(e.keyCode == 37) { // LEFT
        let move = characterCords.x - 1;
        
        if(isMoveValid(move)) {
            character.style.transform = 'scale(-1, 1)';
            characterCords.x = characterCords.x - 1;
        }
    }
    else if(e.keyCode == 38) { // TOP;
        let move = characterCords.y - 1;

        if(isMoveValid(move)) {
            character.style.transform = 'rotate(270deg)';
            characterCords.y = characterCords.y - 1;
        }
    }
    else if (e.keyCode == 39) { // RIGHT
        let move = characterCords.x + 1;

        if(isMoveValid(move)) {
            character.style.transform = '';
            characterCords.x = characterCords.x + 1;
        } 		
    }
    else if (e.keyCode == 40) { // DOWN
        let move = characterCords.y + 1;

        if(isMoveValid(move)) {
            character.style.transform = 'rotate(90deg)';
            characterCords.y = characterCords.y + 1;
        }
    }

    spawnCharacter();
}

mapGenerator();
spawnCharacter();

document.onkeydown = function(e) {
    move(e);
}
