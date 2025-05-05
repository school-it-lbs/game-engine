class CanvasPainter {

    constructor(canvasSelector, sizeX, sizeY, tileset) {
        this.canvas = document.querySelector(canvasSelector);
        this.canvas.width = sizeX;
        this.canvas.height = sizeY;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.tileset = tileset;
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

    drawTile(tileX, tileY, posX, posY) {
        this.ctx.drawImage(this.tileset.image, tileX * (this.tileset.tileSize + this.tileset.gapSize), tileY * (this.tileset.tileSize + this.tileset.gapSize), this.tileset.tileSize, this.tileset.tileSize, posX * SCALE, posY * SCALE, SCALE, SCALE);
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

    renderPlayer(character, posX, posY) {        
        this.renderTileById(character.tileId, posX, posY);
    }

    renderTileById(id, posX, posY) {
        let tileX = id % this.tileset.tilesPerRow;
        let tileY = Math.floor(id / this.tileset.tilesPerRow);
        this.drawTile(tileX, tileY, posX, posY);
    }

    renderMap(map) {
        const x = player.posX - VIEWPORT_OFFSET;
        const y = player.posY - VIEWPORT_OFFSET;

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
        const width = this.ctx.measureText(text).width;

        /// draw background rect assuming height of font
        this.ctx.fillRect(posX, posY, width, parseInt(this.ctx.font, 10));

        this.ctx.fillStyle = '#000';
        this.ctx.fillText(text, posX, posY);
        this.ctx.restore();
    }

    renderSprite(sprite) {
        if (sprite) {
            let offsetX = (player.posX  - VIEWPORT_OFFSET) * -1;
            let offsetY = (player.posY - VIEWPORT_OFFSET) * -1;
        
            if (world.activeScene.useFixedView) {
                offsetX = 0;
                offsetY = 0;
            }
            
            this.renderPlayer(sprite, sprite.posX + offsetX, sprite.posY + offsetY);
        }
    }

    renderOverlay(speechBubble) {
        if (speechBubble) {
            let offsetX = (player.posX - VIEWPORT_OFFSET) * -1;
            let offsetY = (player.posY - VIEWPORT_OFFSET) * -1;

            if (world.activeScene.useFixedView) {
                offsetX = 0;
                offsetY = 0;
            }
            
            this.drawTextWithBackground(speechBubble.text, (speechBubble.posX + offsetX) * SCALE, (speechBubble.posY + offsetY) * SCALE);            
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

    renderMask(){
        const m = world.activeScene.mask;
        if(m && m.isActive)
        {
            this.ctx.save();
            this.ctx.globalAlpha = m.alpha;
            this.ctx.drawImage(m.imgSrc, 0, 0, m.imgSize, m.imgSize, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
            this.ctx.restore();
        }        
    }
}



