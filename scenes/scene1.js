class Scene1 extends Scene {

    constructor() {
        super();

        this.background = [
            [12, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        this.main = [
            [-1, -1, 13, 13, 14, -1, -1, -1, -1, -1, 96, 97, 97, 97, 98, 0],
            [24, 25, 40, 25, 26, -1, -1, -1, -1, -1, 108, 109, 109, 109, 110, 17],
            [36, 37, 37, 37, 38, -1, -1, -1, -1, -1, 108, 109, 109, 109, 110, -1],
            [-1, -1, 43, -1, -1, -1, -1, -1, -1, -1, 120, 121, 121, 121, 122, 0],
            [-1, -1, 43, -1, 1, -1, -1, -1, -1, -1, 125, 111, 112, 126, 126, 0],
            [-1, -1, 43, 43, -1, -1, -1, -1, -1, -1, 126, 123, 124, 125, 126, 0],
            [-1, -1, -1, 43, -1, -1, -1, -1, -1, -1, -1, 43, 43, -1, -1, 0],
            [-1, -1, -1, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, -1, -1, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0],
            [1, 1, -1, -1, 1, 2, -1, -1, 92, -1, -1, -1, -1, -1, -1, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, 104, -1, -1, -1, -1, -1, -1, 0],
            [-1, 52, 53, 55, 53, 54, -1, -1, -1, -1, -1, 44, 45, 45, 45, 46],
            [-1, 64, 65, 65, 67, 66, -1, -1, -1, -1, -1, 56, -1, -1, -1, 58],
            [-1, 72, 73, 84, -1, 75, -1, -1, -1, -1, -1, 56, -1, -1, -1, 58],
            [1, -1, -1, -1, -1, -1, -1, 6, 8, -1, -1, 68, 69, 45, 45, 70],
            [-1, -1, -1, -1, -1, -1, -1, 30, 32, -1, -1, -1, -1, -1, -1, 0],
        ];

        this.friendlyNpc = new Sprite(5, 9, 135);
        this.friendlyNpc.setAnimation(1000, (s) => { s.tileId = s.tileId === 136 ? 135 : 136; });        
        this.friendlyNpc.speech = new SpeechBubble("hi", this.friendlyNpc.posX, this.friendlyNpc.posY);

        const door = new Sprite(4, 13, 85);
        door.setAnimation(250, (s) => { s.tileId = s.tileId === 85 ? 74 : 85; });

        const bucket = new Sprite(9, 10, 131);
        bucket.setAnimation(500, (s) => { s.tileId = s.tileId === 131 ? -1 : 131; });

        this.portal1 = new Sprite(0, 0, 29);
        this.portal2 = new Sprite(1, 0, 29);
        this.portalTo4 = new Sprite(2, 0, 29);
        this.ladderDown = new Sprite(11, 2, 103);
        this.ladderUp1 = new Sprite(11, 5, -1);
        this.ladderUp2 = new Sprite(12, 5, -1);

        this.collectables = [
            new Sprite(15, 2, 94), 
            new Sprite(12, 13, 94), 
            new Sprite(14, 12, 94), 
            new Sprite(6, 3, 94)
        ];

        this.sprites = [
            this.friendlyNpc,
            door,
            bucket,
            this.portal1,
            this.portal2,
            this.portalTo4,
            this.ladderDown,
            this.ladderUp1,
            this.ladderUp2,
            ...this.collectables        
        ];

        const sb = new SpeechBubble("test", 10, 10);
        sb.isVisible = true;

        this.speechBubbles = [this.friendlyNpc.speech, sb];
    }

    interaction(player) {
        if (player.hasCollided(this.ladderUp1) || player.hasCollided(this.ladderUp2)) {
            player.move(11, 1);
        }

        if (player.hasCollided(this.ladderDown)) {
            player.move(11, 6);
        }

        if (player.hasCollided(this.portal1)) {
            world.switchScene(2);
        }

        if (player.hasCollided(this.portal2)) {
            world.switchScene(3);
        }

        if (player.hasCollided(this.portalTo4)) {
            world.switchScene(4);
            player.move(7,7);
        }

        this.collectables.forEach(c => {
            if (player.hasCollided(c)) {
                delete this.sprites[this.sprites.indexOf(c)];
                delete this.collectables[this.collectables.indexOf(c)];
                world.scorePoint();
            }
        });

        if(player.isInteracting){
            player.isInteracting = false;
            this.friendlyNpc.speech.isVisible = player.isNear(this.friendlyNpc);            
        }
    }
}

