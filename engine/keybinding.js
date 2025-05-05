class KeyBinding {

    keyDownDelay = 0;
    previousPositionX = 0;
    previousPositionY = 0;

    constructor(world, player)
    {
        this.world = world;
        this.player = player;
    }

    register() {
        
        document.addEventListener('keydown', (e) => {
            if (e.repeat) {
                if (performance.now() - this.keyDownDelay < 100) {
                    return;
                }
            }

            this.keyDownDelay = performance.now();

            if (e.code == 'Space') {
                this.world.showGrid = !this.world.showGrid;
                return;
            }

            this.previousPositionX = this.player.posX;
            this.previousPositionY = this.player.posY;

            if (e.code == 'KeyW' || e.code == 'ArrowUp') {
                if (this.player.posY > 0) {
                    this.player.moveUp();
                }
            }

            if (e.code == 'KeyS' || e.code == 'ArrowDown') {
                if (this.player.posY < this.world.activeScene.mapSizeX - 1) {
                    this.player.moveDown();
                }
            }

            if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
                if (this.player.posX > 0) {
                    this.player.moveLeft();
                }
            }

            if (e.code == 'KeyD' || e.code == 'ArrowRight') {
                if (this.player.posX < this.world.activeScene.mapSizeY - 1) {
                    this.player.moveRight();
                }
            }

            if (e.code == 'KeyE') {
                this.player.isInteracting = true;
            }

            // collision detection
            const nextTile = this.world.activeScene.main[this.player.posY][this.player.posX];
            if (!this.world.reachableTiles.includes(nextTile)) {
                this.player.move(this.previousPositionX, this.previousPositionY);
            }
        });
    }
}