	let weapon = 1;
	function keypress(evt){
		var keyCode = evt.which;
		keylist.push(keyCode);
		
	}
	
	function recalculateMouse(){
		
		var offsetx = player.x+player.width/2-512;
		var offsety = player.y+player.height/2-400;
		mousex = screenmx+offsetx;
		mousey = screenmy+offsety;
	}
	function mousemove(evt){
		screenmx = evt.offsetX;
		screenmy = evt.offsetY;
		
	}	
	function keyup(evt){
		var keyCode = evt.which;
		while(keylist.indexOf(keyCode) > -1){
			keylist.splice(keylist.indexOf(keyCode),1);
		}
		
	}
	function shoot(){
		if(weapon==2){  
		let diffx =  (mousex-player.x);
		let diffy =  (mousey-player.y);
		let ratio = diffy/diffx;
		let speed = 100;
		let k = Math.sqrt(speed/(Math.pow((diffx),2)+Math.pow(diffy,2)));
		var mousxvel = k*diffx;
		 var mousyvel = k*diffy;
		 let bullettexture = PIXI.Texture.fromImage("assets/images/Shittybullet.png");
		    bulletsprite = new PIXI.Sprite(bullettexture);
		   bulletsprite.position.x = 0;
		    bulletsprite.position.y = 0;
		    stage.addChild(bulletsprite);
			let bullet = {x:player.x+player.width/2, y:player.y+player.height/2,xvel:mousxvel,yvel:mousyvel,type:"bullet",
			width:1,height:1,sprite:bulletsprite};
			world.projectiles.push(bullet);
		}
		if(weapon==3){  
		let diffx =  (mousex-player.x);
		let diffy =  (mousey-player.y);
		let ratio = diffy/diffx;
		let speed = 500;
		let k = Math.sqrt(speed/(Math.pow((diffx),2)+Math.pow(diffy,2)));
		var mousxvel = k*diffx;
		 var mousyvel = k*diffy;
		 let bullettexture = PIXI.Texture.fromImage("assets/images/Shittybullet.png");
		    bulletsprite = new PIXI.Sprite(bullettexture);
		   bulletsprite.position.x = 0;
		    bulletsprite.position.y = 0;
		    stage.addChild(bulletsprite);
			let bullet = {x:player.x+player.width/2, y:player.y+player.height/2,xvel:mousxvel,yvel:mousyvel,type:"noisemaker",
			width:1,height:1,sprite:bulletsprite};
			world.projectiles.push(bullet);
		}
	}
	function clickm(evt){
		if(gamestate=="menu"){
			let buttonx = 400;
			let buttony = 300;
			let width = 200;
			let height = 200;
			if(evt.offsetX>buttonx && evt.offsetX<buttonx+width && evt.offsetY>buttony && evt.offsetY<buttony+height){
				gamestate = "running";	
				displayDialogue();
			}
		}else{
			shoot();
		}
	}
	function switchWeapon(wnumber){
	//1 = torch //2 = revolver //3 = flaregun //4=noisemaker
	weapon = wnumber;
	}
	
	function use(){}
	
	function keycheck(){

		if(keylist.includes(32)){
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
		if(keylist.includes(68)){
			//console.log("right");
			move(1);
		}	
		if(keylist.includes(49)){//1
			switchWeapon(1);
			keylist.splice(keylist.indexOf(49),1);
		}		
		if(keylist.includes(50)){//2
			switchWeapon(2);
			keylist.splice(keylist.indexOf(50),1);
		}	
		if(keylist.includes(51)){//3
			switchWeapon(3);
			keylist.splice(keylist.indexOf(51),1);
		}	
		if(keylist.includes(52)){//4
			switchWeapon(2);
			keylist.splice(keylist.indexOf(52),1);
		}	
		if(keylist.includes(87)){//use
			use();
		}
		if(keylist.includes(71)){//use
			gamestate = "menu";
		}	
		if(keylist.includes(72)){//use
			playList[3].play();
		}		
		if(keylist.includes(74)){//use
			//playList[3].pause();
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
			player.yvel=-17;
		}
		}
	}
	var speed = 10;
	function move(side){
		if(justdamaged==0){
			if(Math.abs(player.xvel)<=5){
				player.xvel = side*speed;
				
			}
			cnoise = {x:player.x,y:player.y};
			world.noise.push(cnoise);
		}
	}
