// load sound
const sfx = document.querySelector("#sfx");


// world variables
// -------------------------------------------------------------------
const world = {
    levels:[level1, level2, level3],

    currentLevel: level1,

    jumpToLevel: function(levelId){
        this.currentLevel = this.levels[levelId - 1];
    },

    collectedItems: 0,

    reachable: [
        -1, 0, 1, 2, 12, 13, 14, 24, 25, 26, 29, 36, 37, 38, 39, 40, 41, 42, 43,
        69, 74, 78, 85, 86, 87, 89, 90, 91, 93, 94, 95, 103, 105, 106, 107,
        109, 115, 116, 117, 118, 119, 123, 124, 127, 128, 129, 130, 131
    ],

    collectable: [94],

    showGrid: false,
    toggleGrid: function() {
        this.showGrid = !this.showGrid;
    }
}



// render
// -------------------------------------------------------------------
function renderText(){
    drawText(world.collectedItems == 4 ? "You win!" : world.collectedItems, 10, 50, "#ffffff");
}


function render(frame) {
    clearCanvas();
    world.currentLevel.animation(frame);
    renderMap(world.currentLevel.background);
    renderMap(world.currentLevel.main);
    renderCharacter();
    if(world.showGrid){
        renderGrid();
    }
    renderText();
}


// input events
// -------------------------------------------------------------------
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
    
    world.currentLevel.teleport(character);
});


// game loop
// -------------------------------------------------------------------
let previousTimestamp = performance.now();
function gameloop(timestamp) {
    let deltaTime = timestamp - previousTimestamp;

    if (deltaTime > fps(FPS)) {
        previousTimestamp = timestamp;        
        const frame = Math.floor((timestamp % 1000) / fps(FPS));            
        render(frame);
    }

    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
