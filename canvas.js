const canvas = document.querySelector("canvas");
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// load tileset
const tileset = document.querySelector("#tileset");
const characterImage = document.querySelector("#character");

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

function renderTile(tileX, tileY, posX, posY) {
    drawTile(tileset, TILE_SIZE * tileX, TILE_SIZE * tileY, posX, posY);
}

function renderCharacter() {
    drawTile(characterImage, 0, 0, character.posX, character.posY);
}

function renderMap(map) {
    for (let [col, row] of allCellsIterator()) {
        if (map[row] != undefined && map[row][col] != undefined) {
            let tile = map[row][col];

            let tileX = tile % TILES_PER_ROW;
            let tileY = Math.floor(tile / TILES_PER_ROW);

            renderTile(tileX, tileY, col, row);
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

function drawText(text){
    ctx.font = "48px serif";
    ctx.fillText(text, 10, 50);
}