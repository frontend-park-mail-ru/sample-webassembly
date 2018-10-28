const fps = document.createElement('code');
fps.id = 'fps';

document.body.appendChild(fps);

const times = [];

function refreshLoop () {
	window.setTimeout(() => {
		const now = performance.now();
		while (times.length > 0 && times[ 0 ] <= now - 1000) {
			times.shift();
		}
		times.push(now);
		fps.textContent = `${times.length} FPS`;
		refreshLoop();
	}, 10);
}

refreshLoop();
