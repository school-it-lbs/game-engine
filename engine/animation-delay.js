class AnimationDelay {
    previousTime = performance.now();

    constructor(delayInSeconds, callback) {
        this.delayInSeconds = delayInSeconds;
        this.callback = callback;
    }

    animate() {
        const deltaTime = performance.now() - this.previousTime;
        if (deltaTime > this.delayInSeconds) {
            this.callback();
            this.previousTime = performance.now();
        }
    }
}