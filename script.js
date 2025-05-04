// load sound
const sfx = document.querySelector("#sfx");

const level1 = new Scene1();
const level2 = new Scene2();
const level3 = new Scene3()

// world variables
// -------------------------------------------------------------------
const world = {
    levels: [level1, level2, level3],

    currentLevel: level1,

    jumpToLevel: function (levelId) {
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
    toggleGrid: function () {
        this.showGrid = !this.showGrid;
    },

    gameOver: false
}



// render
// -------------------------------------------------------------------
function renderText() {
    let text = world.collectedItems;
    if (world.gameOver) {
        text = "GAME OVER";
    }
    else if (world.collectedItems == 4) {
        text = "You win!";
    }

    drawText(text, 10, 50, "#ffffff");
}


function render() {
    clearCanvas();
    world.currentLevel.animation();

    if (USE_FIXED_VIEW) {
        renderMapComplete(world.currentLevel.background, VIEWPORT_SIZE, VIEWPORT_SIZE);
        renderMapComplete(world.currentLevel.main, VIEWPORT_SIZE, VIEWPORT_SIZE);
        renderCharacter(character.posX, character.posY);

    } else {
        renderMap(world.currentLevel.background);
        renderMap(world.currentLevel.main);
        renderCharacter(VIEWPORT_OFFSET, VIEWPORT_OFFSET);
    }

    if (world.showGrid) {
        renderGrid(world.currentLevel.mapSizeX, world.currentLevel.mapSizeY);
    }

    renderOverlay(world.currentLevel.overlay());
    renderText();
}


// input events
// -------------------------------------------------------------------
document.addEventListener('click', (e) => {
    if (world.showGrid) {
        const scaledX = Math.floor(e.offsetX / SCALE);
        const scaledY = Math.floor(e.offsetY / SCALE);
        console.log(`offsetX:${e.offsetX} | offsetY:${e.offsetY} | scaled offsetX:${scaledX} | scaled offsetY:${scaledY}`);
    }
});

let keyDownDelay;

document.addEventListener('keydown', (e) => {
    if (e.repeat) {
        if (performance.now() - keyDownDelay < 100) {
            return;
        }
    }

    keyDownDelay = performance.now();

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

    if (e.code == 'KeyE') {
        world.currentLevel.interact(character);
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

character.move(VIEWPORT_OFFSET, VIEWPORT_OFFSET); // starting position
startGameLoop(render);