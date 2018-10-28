export default class State {
	constructor () {
		this.units = [];
		this.barriers = [];
		this.rawbarriers = [];
		this.target = {
			x: 0,
			y: 0,
			damage: 0
		};
	}

	addBarrier (x, y, w, h) {
		this.rawbarriers.push({x, y, w, h});
		for (let px = x; px <= x + w; px++) {
			for (let py = y; py <= y + h; py++) {
				this.barriers.push({
					x: px,
					y: py
				});
			}
		}
	}

	setTarget (x, y) {
		this.target = {
			x, y, damage: 0
		};
	}
}
