import random from '../utils/random.js';


const unitSize = 4;
const targetSize = 32;

export default class Scene {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} width
	 * @param {number} height
	 */
	constructor (ctx, width, height) {
		this.ctx = ctx;
		this.width = width;
		this.height = height;

		/**
		 * @type {State}
		 */
		this.state = null;

		this.loopCallback = this.loopCallback.bind(this);

		/**
		 * @type {number}
		 */
		this.lastFrameTime = 0;

		this.unitGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, unitSize);
		this.unitGradient.addColorStop(0, '#005ff9ff');
		this.unitGradient.addColorStop(0.2, '#005ff9ff');
		this.unitGradient.addColorStop(1, '#005ff900');

		this.targetGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, targetSize);
		this.targetGradient.addColorStop(0, '#ff9e00ff');
		this.targetGradient.addColorStop(0.3, '#ff9e00ff');
		this.targetGradient.addColorStop(1, '#ff9e0000');
	}

	start() {
		this.lastFrameTime = performance.now();
		window.requestAnimationFrame(this.loopCallback);
	}

	/**
	 * @param {State} state
	 */
	setState (state) {
		this.state = state;
	}

	/**
	 * @param {number} frameDiff
	 */
	render (frameDiff) {
		const ctx = this.ctx;
		const width = this.width;
		const height = this.height;

		ctx.resetTransform();
		const current = {
			x: 0,
			y: 0,
		};

		ctx.fillStyle = this.unitGradient;

		for (const unit of this.state.units) {
			ctx.translate(unit.x - current.x, unit.y - current.y);
			current.x = unit.x;
			current.y = unit.y;
			ctx.beginPath();
			ctx.arc(0, 0, unitSize, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();
		}

		ctx.resetTransform();
		ctx.fillStyle = '#000000';

		for (const rawbarrier of this.state.rawbarriers) {
			ctx.fillRect(rawbarrier.x, rawbarrier.y, rawbarrier.w, rawbarrier.h);
		}

		ctx.translate(this.state.target.x, this.state.target.y);
		ctx.fillStyle = this.targetGradient;
		ctx.beginPath();
		ctx.arc(0, 0, targetSize, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	/**
	 * @private
	 */
	clear () {
		const ctx = this.ctx;
		ctx.resetTransform();
		ctx.clearRect(0, 0, this.width, this.height);
	}

	/**
	 * @private
	 * @param {number} frameTime
	 */
	loopCallback(frameTime) {
		const frameDiff = frameTime - this.lastFrameTime;
		this.lastFrameTime = frameTime;

		this.clear();
		this.render(frameDiff);

		window.requestAnimationFrame(this.loopCallback);
	}
}
