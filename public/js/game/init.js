import random from '../utils/random.js';
import Game from './game.js';
import State from './state.js';


const canvas = document.createElement('canvas');
canvas.id = 'canvas';

document.body.appendChild(canvas);

const width = canvas.width = 600;
const height = canvas.height = 600;


const GAME_MODE = window.GAME_MODE;

console.log(`Started game in ${GAME_MODE} mode`);

/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
const game = new Game(GAME_MODE, {ctx, width, height});

const state = new State;

for (let i = 0; i < 500; i++) {
	state.units.push({
		x: random(0, width),
		y: random(0, height)
	});
}

state.addBarrier(100, 100, 20, 100);
state.addBarrier(480, 400, 20, 100);
state.addBarrier(400, 100, 100, 20);
state.addBarrier(100, 480, 100, 20);

state.setTarget(
	300, 300
);

game.scene.setState(state);

game.start();
