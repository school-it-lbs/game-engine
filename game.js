const CANVAS_SIZE = 720;
const VIEWPORT_SIZE = 15;
const VIEWPORT_OFFSET = Math.floor(VIEWPORT_SIZE / 2);
const SCALE = CANVAS_SIZE / VIEWPORT_SIZE;

const tileset = new Tileset("#tileset", 16, 0, 12);
const painter = new CanvasPainter("canvas", CANVAS_SIZE, CANVAS_SIZE, tileset);
const player = new Sprite(VIEWPORT_OFFSET, VIEWPORT_OFFSET, 132);
const world = new World();
const keybinding = new KeyBinding(world, player);
keybinding.register();
new GameLoop().start();