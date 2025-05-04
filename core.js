const TILE_SIZE = 16;       // fixed value defined by tileset
const TILE_GAP = 0;         // gap between tiles
const TILES_PER_ROW = 12;   // also defined by tileset (we ignore row number)

const USE_FIXED_VIEW = false;

const CANVAS_SIZE = 720;

const FPS = 20;

const VIEWPORT_SIZE = USE_FIXED_VIEW ? 16 : 15;
const VIEWPORT_OFFSET = Math.floor(VIEWPORT_SIZE / 2);
const SCALE = CANVAS_SIZE / VIEWPORT_SIZE;



const character = {
    posX: 0,
    posY: 0,

    moveLeft: function(){
        if(this.posX > 0){
            this.posX -= 1;
        }
    },

    moveRight: function(){
        if(this.posX < world.currentLevel.mapSizeY - 1){
            this.posX += 1;
        }
    },

    moveUp: function(){
        if(this.posY > 0){
            this.posY -= 1;
        }
    },

    moveDown: function(){        
        if(this.posY < world.currentLevel.mapSizeX - 1){
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


const isCharacterNear = function(character, npcX, npcY){
    return isNear(character.posX, character.posY, npcX, npcY); 
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

class Scene{
    background = [];
    main = [];

    get mapSizeX(){
        return this.main.length;
    };

    get mapSizeY(){
        return this.main[0].length;
    }

    teleport(character){}

    animation() {}

    interact(character) {}

    overlay() {}

}