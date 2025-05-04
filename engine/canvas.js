class CanvasPainter {

    constructor(canvasSelector, sizeX, sizeY, tilesetSelector) {
        this.canvas = document.querySelector(canvasSelector);
        this.canvas.width = sizeX;
        this.canvas.height = sizeY;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.tileset = document.querySelector(tilesetSelector);
    }

    resize(sizeX, sizeY){
        this.canvas.width = sizeX;
        this.canvas.height = sizeY;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawTile(imageSrc, tileX, tileY, posX, posY) {
        this.ctx.drawImage(imageSrc, tileX * (TILE_SIZE + TILE_GAP), tileY * (TILE_SIZE + TILE_GAP), TILE_SIZE, TILE_SIZE, posX * SCALE, posY * SCALE, SCALE, SCALE);
    }

    drawBox(x, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#f00';  // some color/style
        this.ctx.lineWidth = 2;         // thickness
        this.ctx.strokeRect(SCALE * x, SCALE * y, SCALE, SCALE);
        this.ctx.closePath();
    }

    renderGrid(x, y) {
        for (let [col, row] of this.allCellsIterator(x, y)) {
            this.drawBox(row, col);
        }
    }

    renderCharacter(x, y) {
        //TODO: change value
        this.renderTileById(132, x, y);
    }

    renderTileById(id, posX, posY) {
        let tileX = id % TILES_PER_ROW;
        let tileY = Math.floor(id / TILES_PER_ROW);
        this.drawTile(tileset, tileX, tileY, posX, posY);
    }

    renderMap(map) {
        const x = character.posX - VIEWPORT_OFFSET;
        const y = character.posY - VIEWPORT_OFFSET;

        for (let i = 0; i < VIEWPORT_SIZE; ++i) {
            for (let j = 0; j < VIEWPORT_SIZE; ++j) {
                let tile = -1;

                let row = map[y + j];

                if (row != undefined) {
                    let col = row[x + i];
                    if (col != undefined) {
                        tile = col;
                    }
                }

                this.renderTileById(tile, i, j);
            }
        }
    }

    drawTextWithBackground(text, posX, posY) {
        this.ctx.save();
        this.ctx.font = "20px serif";
        this.ctx.textBaseline = 'top';
        this.ctx.fillStyle = '#fff';

        /// get width of text
        const width = ctx.measureText(text).width;

        /// draw background rect assuming height of font
        this.ctx.fillRect(posX, posY, width, parseInt(ctx.font, 10));

        this.ctx.fillStyle = '#000';
        this.ctx.fillText(text, posX, posY);
        this.ctx.restore();
    }

    renderOverlay(textData) {
        if (textData) {
            let offsetX = (character.posX - VIEWPORT_OFFSET) * -1;
            let offsetY = (character.posY - VIEWPORT_OFFSET) * -1;

            if (USE_FIXED_VIEW) {
                offsetX = 0;
                offsetY = 0;
            }

            if (textData.length > 0) {
                const t = textData[0];
                this.drawTextWithBackground(t.text, (t.x + offsetX) * SCALE, (t.y + offsetY) * SCALE);
            }
        }
    }

    renderMapComplete(map, x, y) {
        for (let [col, row] of this.allCellsIterator(x, y)) {
            if (map[row] != undefined && map[row][col] != undefined) {
                let tile = map[row][col];
                this.renderTileById(tile, col, row);
            }
        }
    }

    *allCellsIterator(x, y) {
        for (let row = 0; row < x; ++row) {
            for (let col = 0; col < y; ++col) {
                yield [col, row];
            }
        }
    }

    drawText(text, posX, posY, color) {
        this.ctx.save();
        this.ctx.font = "48px serif";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, posX, posY);
        this.ctx.restore();
    }

    tileAnimation(delayInSeconds) {


        this.animate = function (callback) {
            let deltaTime = performance.now() - previousTime;
            if (deltaTime > delayInSeconds) {
                callback();
                previousTime = performance.now();;
            }
        }
    }
}

class TileAnimation {
    previousTime = performance.now();

    constructor(delayInSeconds) {
        this.delayInSeconds = delayInSeconds;
    }

    animate(callback) {
        const deltaTime = performance.now() - this.previousTime;
        if (deltaTime > this.delayInSeconds) {
            callback();
            this.previousTime = performance.now();;
        }
    }
}


