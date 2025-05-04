class Scene{
    background = [];
    main = [];
    sprites = [];

    get mapSizeX(){
        return this.main.length;
    };

    get mapSizeY(){
        return this.main[0].length;
    }

    teleport(character){}

    animation() {}

    interact(character) {}

    overlay() {}

}