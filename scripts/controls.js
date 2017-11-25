
	function keypress(evt){
		var keyCode = evt.which;
		
		keylist.push(keyCode);
		
	}
	function keyup(evt){
		var keyCode = evt.which;
		while(keylist.indexOf(keyCode) > -1){
			keylist.splice(keylist.indexOf(keyCode),1);
		}
		
	}
	function keycheck(){

		if(keylist.includes(87)){
			jump();
		}	
		if(keylist.includes(65)){
			//console.log("left");
			move(-1);
		}
		if(keylist.includes(68)){
			//console.log("right");
			move(1);
		}		
	}	

function onTheGround(xloc, yloc){	
              //  console.log(xloc+","+yloc+" floors:"+world.floorlist);
		var toreturn = checkCollision(xloc,yloc,player.width,1,world.floorlist);
	//	console.log(toreturn);

		return toreturn;
	}
	function jump(){
		if(justdamaged==0){
		if(onTheGround(player.x,player.y+player.height+1)){
			//console.log("jump");
			player.yvel=-15 	;
		}
		}
	}
	var speed = 10;
	function move(side){
		if(justdamaged==0){
		if(Math.abs(player.xvel)<=5){
			player.xvel = side*speed;
		}
		}
	}
