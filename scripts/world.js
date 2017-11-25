function loadWorld() {
	loadFromFile(world, "levels/level1.txt");

	defaultWorld();
}

function defaultWorld() {
	player = {
		x: 50,
		y: 50,
		xvel: 0,
		yvel: 0,
		width: 32,
		height: 32,
		entitytype: "player"
	};
	entities.push(player);
	for (i = 0; i < 5; i++) {
		var testfloor = {
			x: 0 + 192 * i,
			y: 200,
			width: 64,
			height: 64,
			texture: "panel-1"
		};
		floors.push(testfloor);
		testfloor = {
			x: 64 + 192 * i,
			y: 200,
			width: 64,
			height: 64,
			texture: "panel-2"
		};
		floors.push(testfloor);
		testfloor = {
			x: 128 + 192 * i,
			y: 200,
			width: 64,
			height: 64,
			texture: "panel-3"
		};
		floors.push(testfloor);
	}
	var testfloor = {
		x: 192,
		y: 136,
		width: 64,
		height: 64,
		texture: "panel-1"
	};
	floors.push(testfloor);

}

const velGen = n => Math.sinh(n)

const stars = Array(1000).fill().map(e => e = {
	xvel: velGen(Math.random() * 10),
	yvel: velGen(Math.random() * 10),
	size: Math.random() * 2
});

function worldUpdates() {

}