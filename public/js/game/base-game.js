import Scene from './scene.js';
import State from './state.js';


export default class BaseGame {
	/**
	 * @param {'js' | 'golang' | 'wasm'} mode
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} width
	 * @param {number} height
	 */

	constructor (mode, {ctx, width, height}) {
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
	}

	start () {
		this.initState();
		this.scene.setState(this.state);
		this.scene.start();
	}
}
