import JsGame from './js-game.js';


const canvas = document.createElement('canvas');
canvas.id = 'canvas';

document.body.appendChild(canvas);

const width = canvas.width = 600;
const height = canvas.height = 600;


const GAME_MODE = window.GAME_MODE;

console.log(`Started game in ${GAME_MODE} mode`);
const GameConstructors = {
	'js': JsGame
};

/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
/**
 * @type {BaseGame}
 */
const game = new GameConstructors[ GAME_MODE ](GAME_MODE, {ctx, width, height});

game.start();
