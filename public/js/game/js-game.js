import random from '../utils/random.js';
import BaseGame from './base-game.js';


export default class JsGame extends BaseGame {


	initState () {
		super.initState();
		const state = this.state;

		for (let i = 0; i < state.maxUnits; i++) {
			state.units.push({
				x: random(0, this.width),
				y: random(0, this.height)
			});
		}

		state.addBarrier(100, 100, 20, 100);
		state.addBarrier(480, 400, 20, 100);
		state.addBarrier(400, 100, 100, 20);
		state.addBarrier(100, 480, 100, 20);
	}
}
