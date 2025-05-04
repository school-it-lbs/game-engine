class World{

    reachableTiles = [
        -1, 0, 1, 2, 12, 13, 14, 24, 25, 26, 29, 36, 37, 38, 39, 40, 41, 42, 43,
        69, 74, 78, 85, 86, 87, 89, 90, 91, 93, 94, 95, 103, 105, 106, 107,
        109, 115, 116, 117, 118, 119, 123, 124, 127, 128, 129, 130, 131
    ];

    sceneList = [
        new Scene1(),
        new Scene2(),
        new Scene3(),
        new Scene4()
    ];

    statusText = []

    constructor(){        
        this.activeScene = this.sceneList[0];
        this.points = 0;
        this.gameOver = false;
        this.showGrid = false;
        this.inventory = "";
        this.sfx = document.querySelector("#sfx");

        this.statusPoints = new StatusText(10, 50, this.points);
        this.statusText = [this.statusPoints];
    }

    switchScene(sceneId){
        this.activeScene = this.sceneList[sceneId - 1];
    }

    scorePoint(){
        this.points++;
        this.statusPoints.text = this.points;
        this.sfx.play();

        if(this.points == 4)
        {
            this.gameOver = true;
            this.statusPoints.text = "You Win!";
        }
    }
    
    addInventory(itemName){
        this.inventory = itemName;
        this.statusText.push(new StatusText(10, 700, itemName, "#ffff00"));
    }

    setKilled(){
        this.gameOver = true;
        this.statusPoints.text = "Game Over";
        this.statusPoints.color = "#ff0000";
    }
}
