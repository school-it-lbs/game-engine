const TILE_SIZE = 16;       // fixed value defined by tileset
const TILE_GAP = 0;         // gap between tiles
const TILES_PER_ROW = 12;   // also defined by tileset (we ignore row number)

const CANVAS_SIZE = 900;//640;
const NUMBER_OF_TILES = 16;//16; //8: zoom in

const FPS = 20;

//const SCALE = CANVAS_SIZE / NUMBER_OF_TILES;
const VIEWPORT_SIZE = 12;
const VIEWPORT_OFFSET = Math.floor(VIEWPORT_SIZE / 2);
const SCALE = CANVAS_SIZE / VIEWPORT_SIZE;



const character = {
    posX: 4,
    posY: 4,

    moveLeft: function(){
        if(this.posX > 0){
            this.posX -= 1;
        }
    },

    moveRight: function(){
        if(this.posX < NUMBER_OF_TILES - 1){
            this.posX += 1;
        }
    },

    moveUp: function(){
        if(this.posY > 0){
            this.posY -= 1;
        }
    },

    moveDown: function(){        
        if(this.posY < NUMBER_OF_TILES - 1){
            this.posY += 1;
        }
    },

    move: function(x, y){
        this.posX = x;
        this.posY = y;
    },
}

const isNear = function(characterX, characterY, npcX, npcY){
    return npcX -1 <= characterX 
        && characterX <= npcX + 1 
        && npcY -1 <= characterY 
        && characterY <= npcY + 1;    
}


const isCharacterNear = function(character, row, col){
    return isNear(character.posX, character.posY, col, row); //note that row / col are switched
}


const fps = function(n) {
    return 1000 / n;
}

const isFullAnimationSec = function(frame){
    return frame % (FPS/1) == 0;
}

const isHalfAnimationSec = function(frame){
    return frame % (FPS/2) == 0;
}

const isQuarterAnimationSec = function(frame){
    return frame % (FPS/4) == 0;
}

function startGameLoop(callback){
    let previousTimestamp = performance.now();
    function gameloop(timestamp) {
        let deltaTime = timestamp - previousTimestamp;
    
        if (deltaTime > fps(FPS)) {
            previousTimestamp = timestamp;
            callback();
        }
    
        requestAnimationFrame(gameloop);
    }
    
    requestAnimationFrame(gameloop);
}