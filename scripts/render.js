function render(){
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
}
