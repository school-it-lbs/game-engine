// load sound
const sfx = document.querySelector("#sfx");

const world = {
    currentLevel: level1,

    collectedItems: 0,

    reachable: [
        -1, 0, 1, 2, 12, 13, 14, 24, 25, 26, 29, 36, 37, 38, 39, 40, 41, 42, 43,
        69, 74, 78, 85, 86, 87, 89, 90, 91, 93, 94, 95, 103, 105, 106, 107,
        109, 115, 116, 117, 118, 119, 123, 124, 127, 128, 129, 130, 131
    ],

    collectable: [94],

    teleport: function(character){
        this.currentLevel.teleport(character);

        if (this.currentLevel == level1 && character.posX == 0 && character.posY == 0) {
            this.currentLevel = level2;
        }
		
		if (this.currentLevel == level1 && character.posX == 1 && character.posY == 0) {
            this.currentLevel = level3;
        }
		
		if (this.currentLevel == level2 && character.posX == 4 && character.posY == 4) {
            this.currentLevel = level1;
        }
    },

    showGrid: false,
    toggleGrid: function() {
        this.showGrid = !this.showGrid;
    }
}


function render() {
    clearCanvas();
    renderMap(world.currentLevel.background);
    renderMap(world.currentLevel.main);
    renderCharacter();
    if(world.showGrid){
        renderGrid();
    }
    drawText(world.collectedItems == 4 ? "You win!" : world.collectedItems);
}


document.addEventListener('click', (e) => {    
    console.log(Math.floor(e.offsetX / SCALE));
    console.log(Math.floor(e.offsetY / SCALE));
});


document.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    if (e.code == 'Space') {
        world.toggleGrid();
        return;
    }

    const previousPositionX = character.posX;
    const previousPositionY = character.posY;

    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        character.moveUp();
    }

    if (e.code == 'KeyS' || e.code == 'ArrowDown') {
        character.moveDown();
    }

    if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
        character.moveLeft();
    }

    if (e.code == 'KeyD' || e.code == 'ArrowRight') {
        character.moveRight();
    }

    // collision detection
    const nextTile = world.currentLevel.main[character.posY][character.posX];
    if (!world.reachable.includes(nextTile)) {
        character.posX = previousPositionX;       
        character.posY = previousPositionY;
    }

    if (world.collectable.includes(nextTile)) {
        world.currentLevel.main[character.posY][character.posX] = -1;
        world.collectedItems++;
        sfx.play();
    }
    
    world.teleport(character);
});



let previousTimestamp = performance.now();
let previousAnimation = previousTimestamp;

function gameloop(timestamp) {
    let deltaTime = timestamp - previousTimestamp;

    if (deltaTime > fps(30)) {
        previousTimestamp = timestamp;

        if (timestamp - previousAnimation > fps(2)) {
            previousAnimation = timestamp;
            world.currentLevel.animation();
        }

        render();
    }

    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
