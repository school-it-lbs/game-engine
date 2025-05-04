const USE_FIXED_VIEW = false;
const CANVAS_SIZE = 720;

const VIEWPORT_SIZE = USE_FIXED_VIEW ? 16 : 15;
const VIEWPORT_OFFSET = Math.floor(VIEWPORT_SIZE / 2);
const SCALE = CANVAS_SIZE / VIEWPORT_SIZE;

// load sound
const sfx = document.querySelector("#sfx");

const level1 = new Scene1();
const level2 = new Scene2();
const level3 = new Scene3();

const tileset = new Tileset("#tileset", 16, 0, 12);
const painter = new CanvasPainter("canvas", CANVAS_SIZE, CANVAS_SIZE, tileset);

const player = new Sprite(VIEWPORT_OFFSET, VIEWPORT_OFFSET, 132);

const gameLoop = new Loop();

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
    world.currentLevel.interaction(player);

    if (USE_FIXED_VIEW) {
        painter.renderMapComplete(world.currentLevel.background, VIEWPORT_SIZE, VIEWPORT_SIZE);
        painter.renderMapComplete(world.currentLevel.main, VIEWPORT_SIZE, VIEWPORT_SIZE);
        painter.renderPlayer(player, player.posX, player.posY);

    } else {
        painter.renderMap(world.currentLevel.background);
        painter.renderMap(world.currentLevel.main);
        painter.renderPlayer(player, VIEWPORT_OFFSET, VIEWPORT_OFFSET);
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

    const previousPositionX = player.posX;
    const previousPositionY = player.posY;

    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        if(player.posY > 0){
            player.moveUp();
        }        
    }

    if (e.code == 'KeyS' || e.code == 'ArrowDown') {
        if(player.posY < world.currentLevel.mapSizeX - 1){
            player.moveDown();
        }        
    }

    if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
        if(player.posX > 0)
        {
            player.moveLeft();
        }        
    }

    if (e.code == 'KeyD' || e.code == 'ArrowRight') {
        if(player.posX < world.currentLevel.mapSizeY - 1){
            player.moveRight();
        }        
    }

    if (e.code == 'KeyE') {
        player.isInteracting = true;
    }

    // collision detection
    const nextTile = world.currentLevel.main[player.posY][player.posX];
    if (!world.reachable.includes(nextTile)) {
        player.posX = previousPositionX;
        player.posY = previousPositionY;
    }
});


gameLoop.start(render);