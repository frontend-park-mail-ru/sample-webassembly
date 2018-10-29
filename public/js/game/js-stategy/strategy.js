function name (x, y) {
	return `${x}-${y}`;
}


let nodes = null;
let w = 0;
let h = 0;

function round (x, y) {
	const arr = [];
	if (x > 0) {
		const n = nodes.get(name(x - 1, y));
		if (n) {
			arr.push(n);
		}
	}
	if (x < w - 1) {
		const n = nodes.get(name(x + 1, y));
		if (n) {
			arr.push(n);
		}
	}
	if (y > 0) {
		const n = nodes.get(name(x, y - 1));
		if (n) {
			arr.push(n);
		}
	}
	if (y < h - 1) {
		const n = nodes.get(name(x, y + 1));
		if (n) {
			arr.push(n);
		}
	}
	return arr;
}

export default function next (inputState) {
	console.log({nodes});

	if (!nodes) {
		console.log({nodes});
		console.time('nodes');
		nodes = new Map();
		w = inputState.width;
		h = inputState.height;
		for (let x = 0; x < inputState.width; x++) {
			for (let y = 0; y < inputState.height; y++) {
				const nodeId = name(x, y);
				const node = {
					x,
					y,
					distance: Infinity,
					unit: false
				};
				nodes.set(nodeId, node);
			}
		}
		inputState.barriers.forEach(function ({x, y}) {
			nodes.delete(name(x, y));
		});


		const target = inputState.target;
		const targetId = name(target.x, target.y);
		const targetNode = nodes.get(targetId);
		targetNode.distance = 0;
		let temp = [targetNode];

		while (temp.length > 0) {
			const current = temp.shift();
			const neighbors = round(current.x, current.y);
			neighbors.forEach(function (neighbor) {
				if (neighbor.distance > current.distance + 1) {
					neighbor.distance = current.distance + 1;

					temp.push(neighbor);
				}
			});
		}

		console.timeEnd('nodes');

		window.nodes = nodes;
	}


	inputState.units.map(function (unit) {
		const {x, y} = unit;
		const node = graph.getNode(name(x, y));
		debugger;
		return {
			x, y, node,
		}
	});

	return inputState;
}


