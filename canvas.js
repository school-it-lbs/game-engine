const canvas = document.querySelector("canvas");
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// load tileset
const tileset = document.querySelector("#tileset");

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTile(imageSrc, tileX, tileY, posX, posY) {
    ctx.drawImage(imageSrc, tileX * (TILE_SIZE + TILE_GAP), tileY * (TILE_SIZE  + TILE_GAP), TILE_SIZE, TILE_SIZE, posX * SCALE, posY * SCALE, SCALE, SCALE);
}

function drawBox(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = '#f00';  // some color/style
    ctx.lineWidth = 2;         // thickness
    ctx.strokeRect(SCALE * x, SCALE * y, SCALE, SCALE);
    ctx.closePath();
}

function renderGrid() {
    for (let [col, row] of allCellsIterator()) {
        drawBox(row, col);
    }
}

function renderCharacter() {    
    renderTileById(132, 2, 2);
}

function renderTileById(id, posX, posY){
    let tileX = id % TILES_PER_ROW;
    let tileY = Math.floor(id / TILES_PER_ROW);
    drawTile(tileset, tileX, tileY, posX, posY);
}


function renderMap(map) {
    const y = character.posX - 2; //change depending on number of tiles
    const x = character.posY - 2;

    

    // renderTileById(map[x][y], 0, 0);
    // renderTileById(map[x+1][y], 0, 1);
    // renderTileById(map[x+2][y], 0, 2);

    for(let i = 0; i < 5; ++i){
        for(let j = 0; j < 5; ++j){
            let tile = -1;

            let col = map[x+j];
            
            if(col != undefined){
                let row = col[y+i];
                if(row != undefined){
                    tile = row;
                }
            }
            
            renderTileById(tile, i, j);
        }
    }


    // for (let [col, row] of allCellsIterator()) {
    //     if (map[row] != undefined && map[row][col] != undefined) {
    //         let tile = map[row][col];
    //         renderTileById(tile, col, row);
    //     }
    // }
}

function* allCellsIterator() {
    for (let row = 0; row < NUMBER_OF_TILES; ++row) {
        for (let col = 0; col < NUMBER_OF_TILES; ++col) {
            yield [col, row];
        }
    }
}

function drawText(text, posX, posY, color){
    ctx.save();
    ctx.font = "48px serif";
    ctx.fillStyle = color;
    ctx.fillText(text, posX, posY);
    ctx.restore();
}


function drawTextWithBackground(text, posX, posY) {    
    ctx.save();
    ctx.font = "20px serif";
    ctx.textBaseline = 'top';    
    ctx.fillStyle = '#fff';
    
    /// get width of text
    var width = ctx.measureText(text).width;

    /// draw background rect assuming height of font
    ctx.fillRect(posX, posY, width, parseInt(ctx.font, 10));
        
    ctx.fillStyle = '#000';
    ctx.fillText(text, posX, posY);
    ctx.restore();
}

function tileAnimation(delayInSeconds){
    let previousTime = performance.now();

    this.animate = function(callback){
        let deltaTime = performance.now() - previousTime;
        if(deltaTime > delayInSeconds){
            callback();
            previousTime = performance.now();;
        }   
    }
}