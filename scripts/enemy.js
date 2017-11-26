function unalertStatus(entity){
					entity.ai = "unalerted";
}
function alertStatus(entity){
					entity.ai = "alerted";
					
					//console.log("BLIMP")
}
function entityBehavior(entity){
//what enemies do
	if(entity!=player){
		if(intersectingEntity(player,entity)){
			if(!(typeof entity.damagedeath !== 'undefined')){
				health -= 20;
				justdamaged = 50;
				var appliedx = (player.x+player.width/2-(entity.x+entity.width/2));
				var appliedy = (player.y+player.height/2-(entity.y+entity.height/2));
				var directionx = appliedx/Math.abs(appliedx);
				var directiony = appliedy/Math.abs(appliedy);
				player.xvel = directionx*50;
				player.yvel = -10;
			}
		}
		//AI
		if(typeof entity.ai !== 'undefined'){
			//if(entity.ai=="unalerted"){
				for(var n = 0; n<world.noise.length;n++){
					var currentnoise = world.noise[n];
					var distance = Math.sqrt(Math.pow(currentnoise.x-entity.x,2)+(Math.pow(currentnoise.y-entity.y,2)));
						//console.log("Alerted: "+distance);
					if(distance<500){
						alertStatus(entity);
						entity.aitarget.x = currentnoise.x;
						entity.aitarget.y = currentnoise.y;
						console.log(entity.ai);
						entity.aitime = 1000;
					}
				}
				
			//}
			if(entity.ai=="alerted"){
				if(typeof entity.aitarget !== 'undefined'){
					entity.aitime -= 1;
					if(entity.aitime <= 0){
						unalertStatus(entity);
					}else{
					var diffx = (entity.aitarget.x-entity.x);
					var speed = 5;
					entity.xvel = diffx*speed/Math.abs(diffx);
					//TODO jump
					}
				}else{
					unalertStatus(entity);
				}
			}
			//entity.sprite.position.x = entity.x;
			//entity.sprite.position.y = entity.y;
		}
	}
}	
