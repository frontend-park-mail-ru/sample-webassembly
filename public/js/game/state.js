export default class State {
	constructor (state = {}) {
		this.units = [];
		this.barriers = [];
		this.rawbarriers = [];
		this.target = {
			x: 0,
			y: 0,
			damage: 0
		};
		this.maxUnits = 0;
		this.spawnPoints = [];
		this.width = 0;
		this.height = 0;

		Object.assign(this, state);
	}

	addSpawn (x, y) {
		this.spawnPoints.push({
			x, y
		});
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
