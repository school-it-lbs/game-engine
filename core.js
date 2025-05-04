const TILE_SIZE = 16;       // fixed value defined by tileset
const TILE_GAP = 0;         // gap between tiles
const TILES_PER_ROW = 12;   // also defined by tileset (we ignore row number)

const USE_FIXED_VIEW = false;

const CANVAS_SIZE = 720;



const VIEWPORT_SIZE = USE_FIXED_VIEW ? 16 : 15;
const VIEWPORT_OFFSET = Math.floor(VIEWPORT_SIZE / 2);
const SCALE = CANVAS_SIZE / VIEWPORT_SIZE;





