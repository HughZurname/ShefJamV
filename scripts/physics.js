
function whatCollided(xloc, yloc,ewidth,eheight,currentfloorlist){

		for(var f=0;f<currentfloorlist.length;f++){
			var currentfloor = currentfloorlist[f];
			var basex = currentfloor.x;
			var basey = currentfloor.y;
			var width  = currentfloor.width;
			var height = currentfloor.height;
			if((xloc>=basex || xloc+ewidth>=basex)  && (xloc<=basex+width || xloc+ewidth<=basex+width)
				&& (yloc>=basey || yloc+eheight>=basey) && (yloc<=basey+height||yloc+eheight<=basey+height)){
				return currentfloor;
			}		
		}
	}	
	function checkCollision(xloc, yloc,ewidth,eheight,currentfloorlist){

		for(var f=0;f<currentfloorlist.length;f++){
			var currentfloor = currentfloorlist[f];
			var basex = currentfloor.x;
			var basey = currentfloor.y;
			var width  = currentfloor.width;
			var height = currentfloor.height;
			if((xloc>=basex || xloc+ewidth>=basex)  && (xloc<=basex+width || xloc+ewidth<=basex+width)
				&& (yloc>=basey || yloc+eheight>=basey) && (yloc<=basey+height||yloc+eheight<=basey+height)){
				return true;
			}		
		}

		return false;
	}
		


	 function physicsUpdate(){
		for(var e = 0; e<entities.length; e++){
			entity = entities[e];

			//physics
			//gravity
			if(entity.yvel<=10){
				entity.yvel+=0.98;
			}
			//friction
			entity.xvel*=0.9;
			
			//collision
			var floorlist = world.floorlist;
			if(checkCollision(entity.x+entity.xvel,entity.y+entity.yvel,entity.width,entity.height,floorlist)){
							
				if(checkCollision(entity.x+entity.xvel,entity.y,entity.width,entity.height,floorlist)){
					entity.xvel = 0;
					//console.log(player.xvel);
					if(checkCollision(entity.x,entity.y+entity.yvel,entity.width,entity.height,floorlist)){
						entity.yvel = 0;
					}else{
						entity.y += entity.yvel;
					}
				}else{	
					entity.yvel = 0;
					entity.x += entity.xvel;
				}	
			}else{
				entity.x += entity.xvel;
				entity.y += entity.yvel;
				
			}

			//
			
			if(entity.entitytype == "player"){
				playersprite.position.x = entity.x;
				playersprite.position.y = entity.y;
			}

			
		} 

	 }
