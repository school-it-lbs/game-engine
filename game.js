const CANVAS_SIZE = 720;

const VIEWPORT_SIZE = 15;
const VIEWPORT_OFFSET = Math.floor(VIEWPORT_SIZE / 2);
const SCALE = CANVAS_SIZE / VIEWPORT_SIZE;

// load sound
const sfx = document.querySelector("#sfx");


const tileset = new Tileset("#tileset", 16, 0, 12);
const painter = new CanvasPainter("canvas", CANVAS_SIZE, CANVAS_SIZE, tileset);

const player = new Sprite(VIEWPORT_OFFSET, VIEWPORT_OFFSET, 132);

const gameLoop = new Loop();


const world = new World();



function render() {
    painter.clearCanvas();
    world.activeScene.interaction(player);

    if (world.activeScene.useFixedView) {
        painter.renderMapComplete(world.activeScene.background, VIEWPORT_SIZE, VIEWPORT_SIZE);
        painter.renderMapComplete(world.activeScene.main, VIEWPORT_SIZE, VIEWPORT_SIZE);
        painter.renderPlayer(player, player.posX, player.posY);

    } else {
        painter.renderMap(world.activeScene.background);
        painter.renderMap(world.activeScene.main);
        painter.renderPlayer(player, VIEWPORT_OFFSET, VIEWPORT_OFFSET);
    }

    if (world.showGrid) {
        painter.renderGrid(world.activeScene.mapSizeX, world.activeScene.mapSizeY);
    }

    world.activeScene.sprites.forEach(sprite => {
        sprite.animate();
        painter.renderSprite(sprite);
    });
    
    world.activeScene.speechBubbles.forEach(speech => {        
        if(speech.isVisible){
            painter.renderOverlay(speech);
        }
    });

    world.statusText.forEach(s => {
        painter.drawText(s.text, s.posX, s.posY, s.color);
    });
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
        if(player.posY < world.activeScene.mapSizeX - 1){
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
        if(player.posX < world.activeScene.mapSizeY - 1){
            player.moveRight();
        }        
    }

    if (e.code == 'KeyE') {
        player.isInteracting = true;
    }

    // collision detection
    const nextTile = world.activeScene.main[player.posY][player.posX];
    if (!world.reachableTiles.includes(nextTile)) {
        player.move(previousPositionX, previousPositionY);        
    }
});


gameLoop.start(render);