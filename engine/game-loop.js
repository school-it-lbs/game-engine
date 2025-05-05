class GameLoop{
    FPS = 20;

    render() {
        painter.clearCanvas();
        world.activeScene.interaction(player);
    
        if (world.activeScene.useFixedView) {
            painter.renderMapComplete(world.activeScene.background, VIEWPORT_SIZE, VIEWPORT_SIZE);
            painter.renderMapComplete(world.activeScene.main, VIEWPORT_SIZE, VIEWPORT_SIZE);
            painter.renderPlayer(player, player.posX, player.posY);
    
        } else {
            painter.renderMap(world.activeScene.background);
            painter.renderMap(world.activeScene.main);
            painter.renderPlayer(player, VIEWPORT_OFFSET, VIEWPORT_OFFSET);
        }
    
        if (world.showGrid) {
            painter.renderGrid(world.activeScene.mapSizeX, world.activeScene.mapSizeY);
        }
    
        world.activeScene.sprites.forEach(sprite => {
            sprite.animate();
            painter.renderSprite(sprite);
        });
        
        world.activeScene.speechBubbles.forEach(speech => {        
            if(speech.isVisible){
                painter.renderOverlay(speech);
            }
        });

        painter.renderMask();
    
        world.statusText.forEach(s => {
            painter.drawText(s.text, s.posX, s.posY, s.color);
        });
    }
    

    start(){
        let previousTimestamp = performance.now();
        const that = this;
        
        function gameloop(timestamp) {
            let deltaTime = timestamp - previousTimestamp;
        
            if (deltaTime > 1000 / that.FPS) {
                previousTimestamp = timestamp;                
                that.render();
            }
        
            requestAnimationFrame(gameloop);
        }
        
        requestAnimationFrame(gameloop);
    }
}