class Tileset{
    constructor(tilesetSelector, tileSize, gapSize, tilesPerRow){
        this.image = document.querySelector(tilesetSelector);
        this.tileSize = tileSize;
        this.gapSize = gapSize;
        this.tilesPerRow = tilesPerRow;
    }

    scaledTileSize(scaleFactor){
        return (tileset.tileSize + tileset.gapSize) * scaleFactor;
    }
}