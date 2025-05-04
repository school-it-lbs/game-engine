class Scene{
    background = [];
    main = [];
    sprites = [];
    speechBubbles = [];
    useFixedView = false;

    get mapSizeX(){
        return this.main.length;
    };

    get mapSizeY(){
        return this.main[0].length;
    }

    interaction(player){}
}