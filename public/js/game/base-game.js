import Bus from '../bus.js';
import { START_GAME, STATE_CHANGED } from './events.js';
import Scene from './scene.js';
import State from './state.js';


export default class BaseGame extends Bus {
	/**
	 * @param {'js' | 'golang' | 'wasm'} mode
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} width
	 * @param {number} height
	 */

	constructor (mode, {ctx, width, height}) {
		super();
		this.mode = mode;
		this.state = new State;

		this.width = width;
		this.height = height;

		this.scene = new Scene(ctx, width, height);
	}

	initState () {
		const state = this.state;

		state.maxUnits = 500;
		state.setTarget(
			300, 300
		);

		state.width = this.width;
		state.height = this.height;
	}

	initGame () {
		this.initState();
		this.scene.setState(this.state);

		this.on(STATE_CHANGED, function (state) {
			this.state = state;
			this.scene.setState(this.state);
		}.bind(this));
	}

	start () {
		this.initGame();
		this.scene.start();

		this.emit(START_GAME);
	}
}
