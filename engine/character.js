class Character {
    constructor(startX, startY, tileId) {
        this.posX = startX;
        this.posY = startY;
        this.tileId = tileId;
    }

    moveLeft() {
        this.posX -= 1;
    }

    moveRight() {
        this.posX += 1;
    }

    moveUp() {
        this.posY -= 1;
    }

    moveDown() {
        this.posY += 1;
    }

    move(x, y) {
        this.posX = x;
        this.posY = y;
    }

    isNear(npcX, npcY) {
        return npcX - 1 <= this.posX
            && this.posX <= npcX + 1
            && npcY - 1 <= this.posY
            && this.posY <= npcY + 1;
    }
}