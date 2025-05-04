class Sprite {
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

    isNear(otherSprite) {
        return otherSprite.posX - 1 <= this.posX
            && this.posX <= otherSprite.posX + 1
            && otherSprite.posY - 1 <= this.posY
            && this.posY <= otherSprite.posY + 1;
    }

    hasCollided(otherSprite){
        return otherSprite.posX == this.posX
        && this.posX == otherSprite.posX
        && otherSprite.posY == this.posY
        && this.posY == otherSprite.posY;
    }

    setAnimation(delayInSec, callback){
        this.animation = new AnimationDelay(delayInSec, () => callback(this));           
    }

    animate(){
        if(!this.animation) return;
        this.animation.animate();
    }
}