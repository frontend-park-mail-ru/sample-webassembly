import Scene from './scene.js';


export default class Game {
	/**
	 *
	 * @param {'js' | 'golang' | 'wasm'} mode
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} width
	 * @param {number} height
	 */

	constructor (mode, {ctx, width, height}) {
		this.mode = mode;

		this.scene = new Scene(ctx, width, height);
	}

	start() {
		this.scene.start();
	}
}
