const canvas = document.querySelector("canvas");
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// load tileset
const tileset = document.querySelector("#tileset");

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

function renderGrid(x, y) {
    for (let [col, row] of allCellsIterator(x, y)) {
        drawBox(row, col);
    }
}

function renderCharacter(x, y) {    
    renderTileById(132, x, y);
}

function renderTileById(id, posX, posY){
    let tileX = id % TILES_PER_ROW;
    let tileY = Math.floor(id / TILES_PER_ROW);
    drawTile(tileset, tileX, tileY, posX, posY);
}


function renderMap(map) {
    const y = character.posX - VIEWPORT_OFFSET; 
    const x = character.posY - VIEWPORT_OFFSET;

    for(let i = 0; i < VIEWPORT_SIZE; ++i){
        for(let j = 0; j < VIEWPORT_SIZE; ++j){
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
}

function renderOverlay(textData){   
    if(textData){
        const y = (character.posX - VIEWPORT_OFFSET) * -1; 
        const x = (character.posY - VIEWPORT_OFFSET) * -1;
    
        if(textData.length > 0)
        {
            const t = textData[0];
            drawTextWithBackground(t.text, (t.x + y) * SCALE, (t.y + x) * SCALE);
        }
    }    
}


function renderMapComplete(map, x, y) {
    for (let [col, row] of allCellsIterator(x, y)) {
        if (map[row] != undefined && map[row][col] != undefined) {
            let tile = map[row][col];
            renderTileById(tile, col, row);
        }
    }
}


function* allCellsIterator(x, y) {
    for (let row = 0; row < x; ++row) {
        for (let col = 0; col < y; ++col) {
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