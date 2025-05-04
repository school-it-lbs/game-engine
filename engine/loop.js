class Loop{
    static FPS = 20;

    start(renderCallback){
        let previousTimestamp = performance.now();
        function gameloop(timestamp) {
            let deltaTime = timestamp - previousTimestamp;
        
            if (deltaTime > 1000 / Loop.FPS) {
                previousTimestamp = timestamp;
                renderCallback();
            }
        
            requestAnimationFrame(gameloop);
        }
        
        requestAnimationFrame(gameloop);
    }
}