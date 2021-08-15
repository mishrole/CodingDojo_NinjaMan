const character = document.getElementById("ninjaman");
const scoreContainer = document.getElementById("score");
const worldContainer = document.getElementById('world');

const boxSize = 40;
let leftValue = boxSize, topValue = boxSize;
let score = 0;

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 2, 3, 0, 0, 1, 2, 0, 1], 
    [1, 2, 1, 0, 1, 1, 1, 1, 3, 1], 
    [1, 2, 0, 2, 0, 1, 1, 1, 0, 1], 
    [1, 1, 0, 3, 0, 0, 1, 0, 0, 1],
    [1, 2, 1, 0, 0, 2, 1, 3, 0, 1], 
    [1, 0, 1, 0, 2, 0, 1, 0, 1, 1],
    [1, 2, 0, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 0, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const mapGuide = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri'
}

let characterCords = {
    x: 1,
    y: 1
} 

function mapGenerator() {

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
    character.style.top = `${characterCords.y * boxSize}px`;
    character.style.left = `${characterCords.x * boxSize}px`;
}

function isMoveValid(nextMove, e) {
    // LEFT || RIGHT
    if(e.keyCode == 37 || e.keyCode == 39) {
        if(map[characterCords.y][nextMove] !== 1) {
            return true;
        }
        return false;
    } 
    // UP || DOWN
    else if (e.keyCode == 38 || e.keyCode == 40) {
        if(map[nextMove][characterCords.x] !== 1) {
            return true;
        }
        return false;
    }
}

function eat(nextMove, e) {

    let data = {}

    if(e.keyCode == 37 || e.keyCode == 39) {
        data.element = map[characterCords.y][nextMove];
        data.direction = 'horizontal';
    } else if(e.keyCode == 38 || e.keyCode == 40) {
        data.element = map[nextMove][characterCords.x];
        data.direction = 'vertical';
    }

    if(Object.keys(data).length > 0) {
        if(data.element === 2) {
            score+=10;
        } else if (data.element === 3) {
            score+=5;
        }
    
        if(data.direction === 'vertical') {
            map[nextMove][characterCords.x] = 0;
        } else if(data.direction === 'horizontal') {
            map[characterCords.y][nextMove] = 0;
        }
    }

    scoreContainer.querySelector('span').innerHTML = score;
}

function move(e) {
    // LEFT
    if(e.keyCode == 37) {
        let nextMove = characterCords.x - 1;
        character.style.transform = 'scale(-1, 1)';
        
        if(isMoveValid(nextMove, e)) {
            characterCords.x--;
            eat(nextMove, e);
        }
    }
    // TOP
    else if(e.keyCode == 38) {
        let nextMove = characterCords.y - 1;
        character.style.transform = 'rotate(270deg)';

        if(isMoveValid(nextMove, e)) {
            characterCords.y--;
            eat(nextMove, e);
        }
    }
    // RIGHT
    else if (e.keyCode == 39) {
        let nextMove = characterCords.x + 1;
        character.style.transform = '';

        if(isMoveValid(nextMove, e)) {
            characterCords.x++;
            eat(nextMove, e);
        } 		
    }
    // DOWN
    else if (e.keyCode == 40) {
        let nextMove = characterCords.y + 1;
        character.style.transform = 'rotate(90deg)';

        if(isMoveValid(nextMove, e)) {
            characterCords.y++;
            eat(nextMove, e);
        }
    }

    mapGenerator();
    spawnCharacter();
}

mapGenerator();
spawnCharacter();

document.onkeydown = function(e) {
    move(e);
}
