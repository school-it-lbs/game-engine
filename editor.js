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
tileSelection.addEventListener("click", (e) => {
    const selectedX = Math.floor(e.offsetX / 32);
    const selectedY = Math.floor(e.offsetY / 32);    
    selectedTile = selectedX + (selectedY * 12);
});

document.querySelector("button").addEventListener("click", () => {    
    background = JSON.parse(backgroundTextarea.value);
    main = JSON.parse(mainTextarea.value);
    render();
});

function output(){
    backgroundTextarea.value = JSON.stringify(background);
    mainTextarea.value = JSON.stringify(main);
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