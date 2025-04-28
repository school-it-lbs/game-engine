let selectedTile = -1;

function populateArray(initialValue){
    const newArray = [];
    
    for(let i=0; i < NUMBER_OF_TILES; ++i){
        const innerArray = [];
        
        for(let j=0; j < NUMBER_OF_TILES; ++j){
            innerArray.push(initialValue);

        }   
        newArray.push(innerArray);
    }

    return newArray;
}


let background = populateArray(0);
let main = populateArray(-1);

const backgroundTextarea = document.querySelector("#backgroundTextarea");
const mainTextarea = document.querySelector("#mainTextarea");

const tileSelection = document.querySelector("#tileset");
const scaleFactor = 2;
const computedStyleTileSet = getComputedStyle(tileSelection);
tileSelection.style.width = (computedStyleTileSet.width.replace("px","") * scaleFactor) + "px";

tileSelection.addEventListener("click", (e) => {
    const selectedX = Math.floor(e.offsetX / ((TILE_SIZE + TILE_GAP) * scaleFactor));
    const selectedY = Math.floor(e.offsetY / ((TILE_SIZE + TILE_GAP) * scaleFactor));    
    selectedTile = selectedX + (selectedY * TILES_PER_ROW);
});


document.querySelector("button").addEventListener("click", () => {    
    background = JSON.parse(backgroundTextarea.value);
    main = JSON.parse(mainTextarea.value);
    render();
});

function outputFormat(arrayName){
    return JSON.stringify(arrayName).replaceAll("],", "],\n");
}

function output(){
    backgroundTextarea.value = outputFormat(background);
    mainTextarea.value = outputFormat(main);
}

function render() {
    clearCanvas();
    renderMap(background);            
    renderMap(main);
    renderGrid();
    output();
}

document.querySelector("canvas").addEventListener('click', (e) => {    
    const row = Math.floor(e.offsetX / SCALE);
    const col = Math.floor(e.offsetY / SCALE);

    const map = document.querySelector('input[name="layer"]:checked').value == "background" ? background : main;

    map[col][row] = e.shiftKey ? -1 : selectedTile;
    render();
});



render();