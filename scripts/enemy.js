function entityBehavior(entity){
//what enemies do
	if(entity!=player){
		if(intersectingEntity(player,entity)){
			console.log("DAMAGE");
			justdamaged = 50;
			var appliedx = (player.x+player.width/2-(entity.x+entity.width/2));
			var appliedy = (player.y+player.height/2-(entity.y+entity.height/2));
			var directionx = appliedx/Math.abs(appliedx);
			var directiony = appliedy/Math.abs(appliedy);
			player.xvel = directionx*50;
			player.yvel = -10;
		}
	}
	
}	
