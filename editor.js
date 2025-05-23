let selectedTile = -1;

const SCALE = 45;

let mapSizeX = document.querySelector("#map-size-x").value;
let mapSizeY = document.querySelector("#map-size-y").value;
const tileset = new Tileset("#tileset", 16, 0, 12);
const painter = new CanvasPainter("canvas", mapSizeY * SCALE, mapSizeX * SCALE, tileset);

const tileSelection = document.querySelector("#tileset");



function populateArray(initialValue){
    const newArray = [];
    
    for(let i=0; i < mapSizeX; ++i){
        const innerArray = [];
        
        for(let j=0; j < mapSizeY; ++j){
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


const storeBackground = localStorage.getItem("background");
if(storeBackground){	
	background = JSON.parse(storeBackground);	
}

const mainStorage = localStorage.getItem("main");
if(mainStorage){
	main = JSON.parse(mainStorage);	
}


const scaleFactor = 2;
const computedStyleTileSet = getComputedStyle(tileSelection);
tileSelection.style.width = (computedStyleTileSet.width.replace("px","") * scaleFactor) + "px";

tileSelection.addEventListener("click", (e) => {
    const selectedX = Math.floor(e.offsetX / tileset.scaledTileSize(scaleFactor));
    const selectedY = Math.floor(e.offsetY / tileset.scaledTileSize(scaleFactor));    

    // console.log(selectedX + "|" + selectedY);

    selectedTile = selectedX + (selectedY * tileset.tilesPerRow);
});


document.querySelector("button#load").addEventListener("click", () => {    
    background = JSON.parse(backgroundTextarea.value);
    main = JSON.parse(mainTextarea.value);
    mapSizeX = main.length;
    mapSizeY = main[0].length;
    render();
});

function outputFormat(arrayName){
    return JSON.stringify(arrayName).replaceAll("],", "],\n");
}

function output(){
    backgroundTextarea.value = outputFormat(background);
    mainTextarea.value = outputFormat(main);
		
	localStorage.setItem("background", JSON.stringify(background));
	localStorage.setItem("main", JSON.stringify(main));
}



function render() {
    painter.clearCanvas();
    painter.renderMapComplete(background, mapSizeX, mapSizeY);            
    painter.renderMapComplete(main, mapSizeX, mapSizeY);  
    painter.renderGrid(mapSizeY, mapSizeX);
    output();
}

let isMouseDown = false;
const canvas = document.querySelector("canvas");

canvas.addEventListener('mousedown', (e) => {
	isMouseDown = true;
});

canvas.addEventListener('mouseup', (e) => {
	isMouseDown = false;
});

canvas.addEventListener('click', (e) => {
	drawTile(e);
});

canvas.addEventListener('mousemove', (e) => {
	if(!isMouseDown) return;
	drawTile(e);
});

function drawTile(e){
	const row = Math.floor(e.offsetX / SCALE);
    const col = Math.floor(e.offsetY / SCALE);

    //console.log(row + "|" + col);

    const map = document.querySelector('input[name="layer"]:checked').value == "background" ? background : main;

    map[col][row] = e.shiftKey ? -1 : selectedTile;
    render();
}

document.querySelector("button#update").addEventListener("click", () => {
	localStorage.clear();
	
    mapSizeX = document.querySelector("#map-size-x").value;
    mapSizeY = document.querySelector("#map-size-y").value;
    painter.resize(mapSizeY * SCALE, mapSizeX * SCALE);

    background = populateArray(0);
    main = populateArray(-1);
    render();
});

render();