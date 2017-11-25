const velGen = n => (Math.sin(n)-1)

	const stars = Array(100).fill().map(e => e = {
		x:Math.random()*1024,
		y:Math.random()*512,
		xvel: velGen(Math.random() * 2),
		yvel: velGen(Math.random() * 2),
		size: Math.random() * 2
	});	

function loadWorld(spawnx,spawny,filename) {
	console.log("Loaded map: "+filename);
	player = {
		x: spawnx,
		y: spawny,
		xvel: 0,
		yvel: 0,
		width: 32,
		height: 32,
		entitytype: "player"
	};
	entities.push(player);
	loadFromFile(world,filename,true);

	//defaultWorld();
}

function defaultWorld() {
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

function calculateDistance(playerX,playerY,entityX,entityY)
{
	var horizontalDis = playerX - entityX;
	var verticalDis = playerY - entityY;

	var realDistance = Math.sqrt(Math.pow(horizontalDis, 2) + Math.pow(verticalDis,2));
	return realDistance;
}


function worldUpdates() {
	for(let m = 0; m<world.interacts.length;m++){
		let interactable = world.interacts[m];
		if(rawCollide(player.x,player.y,player.width,player.height,interactable.x,interactable.y,interactable.width,interactable.height)){
			if(interactable.type == "exit"){
				loadFromFile(world,interactable.level,false);
				player.x = interactable.spawnx;
				player.y = interactable.spawny;
			}
		}
	}

	for(let m = 0; m<world.entitylist.length;m++){
		let entity = world.entitylist[m];
		if (entity.entitytype == "enemy"){
//			Use object atributes istead of variable names
			var distanceFrom = calculateDistance(player.x, player.y, entity.x, entity.y);
			console.log("Distance from bug = " + distanceFrom);
		}
		
	}
}
