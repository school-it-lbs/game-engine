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
    ctx.drawImage(imageSrc, tileX, tileY, TILE_SIZE, TILE_SIZE, posX * SCALE, posY * SCALE, SCALE, SCALE);
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
    renderTileById(132, character.posX, character.posY);
}

function renderTileById(id, posX, posY){
    let tileX = id % TILES_PER_ROW;
    let tileY = Math.floor(id / TILES_PER_ROW);
    drawTile(tileset, TILE_SIZE * tileX, TILE_SIZE * tileY, posX, posY);
}


function renderMap(map) {
    for (let [col, row] of allCellsIterator()) {
        if (map[row] != undefined && map[row][col] != undefined) {
            let tile = map[row][col];
            renderTileById(tile, col, row);
        }
    }
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