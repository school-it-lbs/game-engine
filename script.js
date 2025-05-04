// load sound
const sfx = document.querySelector("#sfx");

const level1 = new Scene1();
const level2 = new Scene2();
const level3 = new Scene3();

const tileset = new Tileset("#tileset", 16, 0, 12);
const painter = new CanvasPainter("canvas", CANVAS_SIZE, CANVAS_SIZE, tileset);

const character = new Sprite(VIEWPORT_OFFSET, VIEWPORT_OFFSET, 132);

const game = new Game();

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
    

    showGrid: false,
    toggleGrid: function () {
        this.showGrid = !this.showGrid;
    },

    gameOver: false,

    collectItem: function(){
        this.collectedItems++;
        sfx.play();
    }
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

    painter.drawText(text, 10, 50, "#ffffff");
}


function render() {
    painter.clearCanvas();
    world.currentLevel.interaction(character);

    if (USE_FIXED_VIEW) {
        painter.renderMapComplete(world.currentLevel.background, VIEWPORT_SIZE, VIEWPORT_SIZE);
        painter.renderMapComplete(world.currentLevel.main, VIEWPORT_SIZE, VIEWPORT_SIZE);
        painter.renderCharacter(character, character.posX, character.posY);

    } else {
        painter.renderMap(world.currentLevel.background);
        painter.renderMap(world.currentLevel.main);
        painter.renderCharacter(character, VIEWPORT_OFFSET, VIEWPORT_OFFSET);
    }

    if (world.showGrid) {
        painter.renderGrid(world.currentLevel.mapSizeX, world.currentLevel.mapSizeY);
    }

    world.currentLevel.sprites.forEach(sprite => {
        sprite.animate();
        painter.renderSprite(sprite);
    });
    
    world.currentLevel.speechBubbles.forEach(speech => {        
        if(speech.isVisible){
            painter.renderOverlay(speech);
        }
    });


    renderText();
}


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
        if(character.posY > 0){
            character.moveUp();
        }        
    }

    if (e.code == 'KeyS' || e.code == 'ArrowDown') {
        if(character.posY < world.currentLevel.mapSizeX - 1){
            character.moveDown();
        }        
    }

    if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
        if(character.posX > 0)
        {
            character.moveLeft();
        }        
    }

    if (e.code == 'KeyD' || e.code == 'ArrowRight') {
        if(character.posX < world.currentLevel.mapSizeY - 1){
            character.moveRight();
        }        
    }

    if (e.code == 'KeyE') {
        character.isInteracting = true;
    }

    // collision detection
    const nextTile = world.currentLevel.main[character.posY][character.posX];
    if (!world.reachable.includes(nextTile)) {
        character.posX = previousPositionX;
        character.posY = previousPositionY;
    }
});


game.start(render);