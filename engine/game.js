class Game{
    static FPS = 20;

    start(renderCallback){
        let previousTimestamp = performance.now();
        function gameloop(timestamp) {
            let deltaTime = timestamp - previousTimestamp;
        
            if (deltaTime > 1000 / Game.FPS) {
                previousTimestamp = timestamp;
                renderCallback();
            }
        
            requestAnimationFrame(gameloop);
        }
        
        requestAnimationFrame(gameloop);
    }
}