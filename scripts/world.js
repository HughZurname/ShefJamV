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
		height: 64,
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
		if(interactable.type == "key"){
			interactable.sambob+=1;
			interactable.sambob=interactable.sambob%100;
			interactable.sprite.position.y=interactable.y+(Math.cos(interactable.sambob*Math.PI/50)*10);
		}
		if(rawCollide(player.x,player.y,player.width,player.height,interactable.x,interactable.y,interactable.width,interactable.height)){
			if(interactable.type == "exit"){
				loadspri.alpha = 1;
				loadFromFile(world,interactable.level,false);
				player.x = interactable.spawnx;
				player.y = interactable.spawny;
			}
			if(interactable.type == "music"){
				if(interactable.source=="stop"){
					stopMusic();
				}else{
					music(interactable.source,playList[songList.indexOf(interactable.source)]);
				}
			}
			if(interactable.type == "spike"){
				player.damagedeath = 100;
				player.health -= 100;
			}			
			if(interactable.type == "key"){
				interactable.sprite.destroy();
				world.interacts.splice(m,1);
				m--;
				keycardcount+=1;
				console.log("Keycard picked up");
			}
			if(interactable.type == "door"){
					if(keylist.includes(87)){//use
						if(keycardcount>=1){
							keycardcount-=1;
							toremove1 = interactable.floors[0];
							toremove2 = interactable.floors[1];
							toremove1.sprite.alpha = 0.2;
							toremove2.sprite.alpha = 0.2;
							world.floorlist.splice(world.floorlist.indexOf(toremove1),1);
							world.floorlist.splice(world.floorlist.indexOf(toremove2),1);
						}
					}
			}
		}
	}
	
	for(let m = 0; m<world.entitylist.length;m++){
		let entity = world.entitylist[m];
		entityBehavior(entity);
		if (entity.entitytype == "enemy"){
//			Use object atributes istead of variable names
			var distanceFrom = calculateDistance(player.x, player.y, entity.x, entity.y);
			// console.log("Distance from bug = " + distanceFrom);
			if (distanceFrom < 150){
				//console.log("Sound of bug plays!");
			}
			if(typeof entity.damagedeath !== 'undefined'){
				entity.damagedeath-=1;
				if(entity.damagedeath<=0){
					world.entitylist.splice(world.entitylist.indexOf(entity),1);
					m--;
				}
				entity.sprite.alpha = (entity.damagedeath%10)/10;
			}
		}
		
	}
	world.noise = new Array();
}
