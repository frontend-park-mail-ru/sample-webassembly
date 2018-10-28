import BaseGame from './base-game.js';
import { START_GAME, STATE_CHANGED } from './events.js';
import next from './js-stategy/strategy.js';
import State from './state.js';


export default class JsGame extends BaseGame {
	initState () {
		super.initState();
		const state = this.state;

		state.addBarrier(100, 100, 20, 100);
		state.addBarrier(480, 400, 20, 100);
		state.addBarrier(400, 100, 100, 20);
		state.addBarrier(100, 480, 100, 20);

		state.addSpawn(50, 50);
		state.addSpawn(550, 50);
		state.addSpawn(50, 550);
		state.addSpawn(550, 550);
	}

	loopIteration () {
		const state = JSON.parse(JSON.stringify(this.state));
		const inputState = {
			units: state.units,
			barriers: state.barriers,
			target: state.target,
			maxUnits: state.maxUnits,
			spawnPoints: state.spawnPoints
		};

		const outputState = next(inputState);

		const newState = new State(this.state);
		newState.units = outputState.units;
		newState.target.damage = outputState.target.damage;
		this.emit(STATE_CHANGED, newState);
	}

	initGame () {
		super.initGame();

		const loop = this.loopIteration.bind(this);

		this.on(START_GAME, function () {
			setInterval(function () {
				loop();
			}, 1000);
		});
	}
}
