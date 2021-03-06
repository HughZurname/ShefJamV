function render(){
	var offsetx = player.x+player.width/2-512;
	var offsety = player.y+player.height/2-400;
	stage.pivot.x = offsetx;
	stage.pivot.y = offsety;
	HUDcontainer.pivot.x = -offsetx;
	HUDcontainer.pivot.y = -offsety;
	if(gamestate == "menu"){
		menucontainer.pivot.x = -offsetx;
		menucontainer.pivot.y = -offsety;
	}
	starcontainer.pivot.x = -offsetx;
	starcontainer.pivot.y = -offsety;


	
	for(var s = 0; s<stars.length; s++){
		stars[s].x +=stars[s].xvel;
		stars[s].y +=stars[s].yvel;
		if(stars[s].x<0){stars[s].x=1024;}
		if(stars[s].x>1024){stars[s].x=0;}
		if(stars[s].y>512){stars[s].y=0;}
		if(stars[s].y<0){stars[s].y=512;}
		drawnstars[s].position.x = stars[s].x;
		drawnstars[s].position.y = stars[s].y;
	}
	for(let e = 0; e<world.entitylist.length; e++){
		let ce = world.entitylist[e];
		if(typeof ce.sprite !== 'undefined'){
			ce.sprite.position.x = ce.x;
			ce.sprite.position.y = ce.y;
		}
	}
	
	if(health<=80){
		heartsprites[4].alpha = 0;
	}if(health<=60){
		heartsprites[3].alpha = 0;
	}if(health<=40){
		heartsprites[2].alpha = 0;
	}if(health<=20){
		heartsprites[1].alpha = 0;
	}if(health<=0){
		heartsprites[0].alpha = 0;
	}
	if(health>80){
		heartsprites[4].alpha = 1;
	}if(health>60){
		heartsprites[3].alpha = 1;
	}if(health>40){
		heartsprites[2].alpha = 1;
	}if(health>20){
		heartsprites[1].alpha = 1;
	}if(health>0){
		heartsprites[0].alpha = 1;
	}
}
