const TILE_SIZE = 16;       // fixed value defined by tileset
const TILES_PER_ROW = 12;   // also defined by tileset (we ignore row number)

const CANVAS_SIZE = 640;
const NUMBER_OF_TILES = 16; //8

const SCALE = CANVAS_SIZE / NUMBER_OF_TILES;


const character = {
    posX: 1,
    posY: 1,

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


const fps = function(n) {
    return 1000 / n;
}