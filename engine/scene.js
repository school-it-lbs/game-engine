class Scene{
    background = [];
    main = [];
    npcList = [];

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