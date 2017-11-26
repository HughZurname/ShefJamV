function rawCollide(xloc, yloc, ewidth, eheight, basex, basey, width, height) {
	if ((xloc >= basex || xloc + ewidth >= basex) && (xloc <= basex + width || xloc + ewidth <= basex + width) &&
		(yloc >= basey || yloc + eheight >= basey) && (yloc <= basey + height || yloc + eheight <= basey + height)) {
		return true;
	}
	return false;
}

function whatCollided(xloc, yloc, ewidth, eheight, currentfloorlist) {

	for (let f = 0; f < currentfloorlist.length; f++) {
		let currentfloor = currentfloorlist[f];
		let basex = currentfloor.x;
		let basey = currentfloor.y;
		let width = currentfloor.width;
		let height = currentfloor.height;
		if ((xloc >= basex || xloc + ewidth >= basex) && (xloc <= basex + width || xloc + ewidth <= basex + width) &&
			(yloc >= basey || yloc + eheight >= basey) && (yloc <= basey + height || yloc + eheight <= basey + height)) {
			return currentfloor;
		}
	}

}

function intersectingEntity(entity1, entity2) {
	return rawCollide(entity1.x, entity1.y, entity1.width, entity1.height, entity2.x, entity2.y, entity2.width, entity2.height);
}

function checkCollision(xloc, yloc, ewidth, eheight, currentfloorlist) {

	for (let f = 0; f < currentfloorlist.length; f++) {
		let currentfloor = currentfloorlist[f];
		let basex = currentfloor.x;
		let basey = currentfloor.y;
		let width = currentfloor.width;
		let height = currentfloor.height;
		if ((xloc >= basex || xloc + ewidth >= basex) && (xloc <= basex + width || xloc + ewidth <= basex + width) &&
			(yloc >= basey || yloc + eheight >= basey) && (yloc <= basey + height || yloc + eheight <= basey + height)) {
			return true;
		}
	}

	return false;
}



function physicsUpdate() {
	for(let p = 0; p<world.projectiles.length;p++){

		let currentprojectile = world.projectiles[p];
			for(let m = 0; m<world.interacts.length;m++){

				let interactable = world.interacts[m];
				if(rawCollide(currentprojectile.x,currentprojectile.y,currentprojectile.width,currentprojectile.height,
					interactable.x,interactable.y,interactable.width,interactable.height)){
					if(interactable.type == "chain"){
						let floortodrop = whatCollided(interactable.x+32,interactable.y+96,interactable.width,interactable.height,world.floorlist);
						world.floorlist.splice(world.floorlist.indexOf(floortodrop),-1);
						let fallingblock = {x:floortodrop.x,y:floortodrop.y,width:floortodrop.width,height:floortodrop.height,xvel:0,yvel:1,type:"fallingblock",sprite:floortodrop.sprite};
						world.projectiles.push(fallingblock);
					}
				}


			}
		if(checkCollision(currentprojectile.x + currentprojectile.xvel, currentprojectile.y + currentprojectile.yvel, currentprojectile.width, currentprojectile.height, floorlist)){
			world.projectiles.splice(world.projectiles.indexOf(currentprojectile),1);
			p--;
			//remove
		}else{
			currentprojectile.x += currentprojectile.xvel;
			currentprojectile.y += currentprojectile.yvel;
		}
		currentprojectile.sprite.position.x = currentprojectile.x;
		currentprojectile.sprite.position.y = currentprojectile.y;
		
	}
	for (let e = 0; e < entities.length; e++) {
		entity = entities[e];

		//physics
		//gravity
		if (entity.yvel <= 10) {
			//console.log("Applying gravity: "+entity.y);
			entity.yvel += 0.98;
		}
		//friction
		entity.xvel *= 0.5;

		//collision
		let floorlist = world.floorlist;
		if (checkCollision(entity.x + entity.xvel, entity.y + entity.yvel, entity.width, entity.height, floorlist)) {

			if (checkCollision(entity.x + entity.xvel, entity.y, entity.width, entity.height, floorlist)) {
				entity.xvel = 0;
				//console.log(player.xvel);
				if (checkCollision(entity.x, entity.y + entity.yvel, entity.width, entity.height, floorlist)) {
					entity.yvel = 0;
				} else {
					entity.y += entity.yvel;
				}
			} else {
				entity.yvel = 0;
				entity.x += entity.xvel;
			}
		} else {
			entity.x += entity.xvel;
			entity.y += entity.yvel;

		}

		//

		if (entity.entitytype == "player") {
			playersprite.position.x = entity.x;
			playersprite.position.y = entity.y;
		}


	}

}
