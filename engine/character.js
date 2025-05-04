class Character{        
    constructor(startX, startY){
        this.posX = startX;
        this.posY = startY;
    }

    moveLeft(){
        if(this.posX > 0){
            this.posX -= 1;
        }
    }

    moveRight(){
        if(this.posX < world.currentLevel.mapSizeY - 1){
            this.posX += 1;
        }
    }

    moveUp(){
        if(this.posY > 0){
            this.posY -= 1;
        }
    }

    moveDown(){
        if(this.posY < world.currentLevel.mapSizeX - 1){
            this.posY += 1;
        }
    }

    move(x, y){
        this.posX = x;
        this.posY = y;
    }

    isNear(npcX, npcY){
        return npcX -1 <= this.posX 
            && this.posX <= npcX + 1 
            && npcY -1 <= this.posY 
            && this.posY <= npcY + 1;    
    }    
}