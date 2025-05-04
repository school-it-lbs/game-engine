class AnimationDelay {
    previousTime = performance.now();

    constructor(delayInSeconds) {
        this.delayInSeconds = delayInSeconds;
    }

    animate(callback) {
        const deltaTime = performance.now() - this.previousTime;
        if (deltaTime > this.delayInSeconds) {
            callback();
            this.previousTime = performance.now();;
        }
    }
}