const USE_FIXED_VIEW = false;
const CANVAS_SIZE = 720;

const VIEWPORT_SIZE = USE_FIXED_VIEW ? 16 : 15;
const VIEWPORT_OFFSET = Math.floor(VIEWPORT_SIZE / 2);
const SCALE = CANVAS_SIZE / VIEWPORT_SIZE;

// load sound
const sfx = document.querySelector("#sfx");


const tileset = new Tileset("#tileset", 16, 0, 12);
const painter = new CanvasPainter("canvas", CANVAS_SIZE, CANVAS_SIZE, tileset);

const player = new Sprite(VIEWPORT_OFFSET, VIEWPORT_OFFSET, 132);

const gameLoop = new Loop();


class World{

    reachableTiles = [
        -1, 0, 1, 2, 12, 13, 14, 24, 25, 26, 29, 36, 37, 38, 39, 40, 41, 42, 43,
        69, 74, 78, 85, 86, 87, 89, 90, 91, 93, 94, 95, 103, 105, 106, 107,
        109, 115, 116, 117, 118, 119, 123, 124, 127, 128, 129, 130, 131
    ];

    sceneList = [
        new Scene1(),
        new Scene2(),
        new Scene3(),
        new Scene4()
    ];

    constructor(){        
        this.activeScene = this.sceneList[0];
        this.points = 0;
        this.gameOver = false;
        this.showGrid = false;
        this.inventory = "";
    }

    switchScene(sceneId){
        this.activeScene = this.sceneList[sceneId - 1];
    }

    scorePoint(){
        this.points++;
        sfx.play();
    }
}

const world = new World();




// render
// -------------------------------------------------------------------
function renderText() {
    let text = world.points;
    if (world.gameOver) {
        text = "GAME OVER";
    }
    else if (world.points == 4) {
        text = "You win!";
    }

    painter.drawText(text, 10, 50, "#ffffff");
    painter.drawText(world.inventory, 10, 700, "#ffffff");
}


function render() {
    painter.clearCanvas();
    world.activeScene.interaction(player);

    if (USE_FIXED_VIEW) {
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