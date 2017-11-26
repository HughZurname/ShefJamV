
function readTextFile(filename,continueornot)
{
   var xhr = new XMLHttpRequest();
	xhr.open("GET", filename, true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
	    if (xhr.status === 200) {
	      console.log(xhr.responseText);
		  loadLevel(xhr.responseText,continueornot);
	    } else {
	      console.error(xhr.statusText);
	    }
	  }
	};
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(null);
}
function loadLevel(fileitem,continueornot){
	let entities = new Array();
		let floors = new Array();
		let backgrounds = new Array();
		let inters = new Array();
		let ps = new Array();
		let ls = new Array();
		let n = new Array();
		
	entities.push(player);
	world.floorlist = floors;
	world.interacts = inters;
	world.entitylist = entities;
	world.projectiles = ps;
	world.lights = ls;
	world.noise = n;
	if(typeof entitycontainer !== 'undefined'){
  		entitycontainer.destroy();
	}
	entitycontainer = new PIXI.Container();
	let lines = fileitem.split("\n");
	for(let l = 0; l<lines.length; l++){
		if(lines[l].charAt(0)=="~"){
			
			let currentline = lines[l];
			let components = currentline.split(" ");
			let sxcoordGrid = parseInt(components[1]);
			let sycoordGrid = 7-parseInt(components[2]);
			
			let excoordGrid = parseInt(components[3]);
			let eycoordGrid = 7-parseInt(components[4]);
			
			let text = components[5];
			for(var xcoordGrid = sxcoordGrid;xcoordGrid<=excoordGrid;xcoordGrid++){
				for(var ycoordGrid = sycoordGrid;ycoordGrid<=eycoordGrid;ycoordGrid++){
					let finalX = ((64*xcoordGrid));
					let finalY = ((64*ycoordGrid));
					console.log(finalX+" "+finalY);
					let currentfloor = {x: finalX, y: finalY,width:64,height:64,texture:text};
					backgrounds.push(currentfloor);
				}
			}
		}
		if(lines[l].charAt(0)!="#"){
			let currentline = lines[l];
			let components = currentline.split(" ");
			let xcoordGrid = parseInt(components[0]);
			let ycoordGrid = 7-parseInt(components[1]);
			let type = components[2];
			let text = components[3];
			if(type=="solid"){
				let sx = 0;
				let sy = 0;
				let w = 64;
				let h = 64;
				if(components.length>=5){
					sx = components[4];
					sy = components[5];
					w = components[6];
					h = components[7];	
				}
				let finalX = ((64*xcoordGrid)+parseInt(sx));
				let finalY = ((64*ycoordGrid)+parseInt(sy));
				console.log(finalX+" "+finalY);
				let currentfloor = {x: finalX, y: finalY,width:w,height:h,texture:text};
				world.floorlist.push(currentfloor);
			}	
			if(type=="background"){
				let sx = 0;
				let sy = 0;
				let w = 64;
				let h = 64;
				if(components.length>=5){
					sx = components[4];
					sy = components[5];
					w = components[6];
					h = components[7];	
				}
				let finalX = ((64*xcoordGrid)+parseInt(sx));
				let finalY = ((64*ycoordGrid)+parseInt(sy));
				console.log(finalX+" "+finalY);
				let currentfloor = {x: finalX, y: finalY,width:w,height:h,texture:text};
				backgrounds.push(currentfloor);
			}if(type=="boss"){
				let finalX = (64*xcoordGrid);
				let finalY = (64*ycoordGrid);
				boss = {x:finalX,y:finalY, width:128, height:128};
				
			}
			if(type=="exit"){
				let sx = parseInt(components[4]);
				let sy = 7-parseInt(components[5]);
				sx*=64;sy*=64;
				sy-=64;
				let exit = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"exit",level:text,spawnx:sx,spawny:sy, 
				texture:"assets/images/Shittybullet.png"};
				console.log("added interact");				
				world.interacts.push(exit);
			}if(type=="spike"){
				let spike = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"spike",level:text, texture:"assets/images/environment/spike.png"};
				console.log("added interact");				
				world.interacts.push(spike);
			}if(type=="key"){
				let key = {x: 64*xcoordGrid+16, y: 64*ycoordGrid+16,width:32,height:32,type:"key",sambob:100, texture:"assets/images/hud/keycard-pickup.png"};
				console.log("added interact");				
				world.interacts.push(key);
			}if(type=="door"){
				let door = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"door", texture:text};
				console.log("added interact");	
				let lowerfloor = {x: 64*xcoordGrid+16, y: 64*ycoordGrid,width:64,height:64,texture:"assets/images/environment/door-bottom.png"};
				let higherfloor = {x: 64*xcoordGrid+16, y: 64*(ycoordGrid-1),width:64,height:64,texture:"assets/images/environment/door-top.png"};
				door.floors = new Array(2);
				door.floors[0] = lowerfloor;world.floorlist.push(lowerfloor);
				door.floors[1] = higherfloor;world.floorlist.push(higherfloor);
				world.interacts.push(door);
			}if(type=="light"){
				let light = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"level",texture:"assets/images/light.png"};			
				world.lights.push(light);
			}
			if(type=="music"){
				let sx = parseInt(components[4]);
				let sy = 7-parseInt(components[5]);
				sx*=64;sy*=64 	
				let music = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"music",source:text};
				console.log("added music");				
				world.interacts.push(music);
			}
			if(type=="chain"){
				let chain = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"chain",texture:text};				
				world.interacts.push(chain);
			}
			if(type=="pipe"){
				let pipe = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"pipe",texture:text};				
				world.interacts.push(chain);
			}
			if(type=="enemy"){
					let textureArray = [];
					if(components.length>6){
						let texture2 = PIXI.Texture.fromImage(components[6]);
						textureArray.push(texture2);
					}
					let texture = PIXI.Texture.fromImage(text);
					textureArray.push(texture);
					console.log(textureArray[0]);
				  //  let texturesprite = new PIXI.Sprite(texture);
				  texturesprite = new PIXI.extras.AnimatedSprite(textureArray);
					texturesprite.speed = 0.00001;
					texturesprite.play();
				   texturesprite.position.x = 0;
				    texturesprite.position.y = 0;
				    entitycontainer.addChild(texturesprite);
					var h = 10;
					if(components.length>4){
						h = parseInt(components[4]);
					}
				let enemy = {x: 64*xcoordGrid, y: 64*ycoordGrid-1,width:64,height:64,xvel:0,yvel:0,entitytype:"enemy",sprite:texturesprite,health:h};
				
					if(components.length>5){
						enemy.ai = components[5];
						enemy.aitarget = {x:0,y:0};
						enemy.aitime = 0;
					}
				
				console.log("added enemy");				
				world.entitylist.push(enemy);
			}
		}
	}
	//render 

	stage.addChild(entitycontainer);
	if(typeof floorcontainer !== 'undefined'){
  		floorcontainer.destroy();
	}
	floorcontainer = new PIXI.Container();
	for (let i = 0; i < backgrounds.length; i++) {
		        let cfloor = backgrounds[i];
		        let panel = PIXI.Texture.fromImage(cfloor.texture);
		        panelsprite = new PIXI.Sprite(panel);
		        panelsprite.position.x = cfloor.x;
		        panelsprite.position.y = cfloor.y;
				panelsprite.width = cfloor.width;
				panelsprite.height = cfloor.height;
				 cfloor.sprite = panelsprite;
		        floorcontainer.addChild(panelsprite);
	}
	for (let i = 0; i < floors.length; i++) {
		        let cfloor = floors[i];
		        let panel = PIXI.Texture.fromImage(cfloor.texture);
		        panelsprite = new PIXI.Sprite(panel);
		        panelsprite.position.x = cfloor.x;
		        panelsprite.position.y = cfloor.y;
			panelsprite.width = cfloor.width;
			panelsprite.height = cfloor.height;
			cfloor.sprite = panelsprite;
		        floorcontainer.addChild(panelsprite);
	}
	for (let i = 0; i < world.interacts.length; i++) {
		        let cfloor = world.interacts[i];
				if(world.interacts[i].type == "chain" || world.interacts[i].type == "pipe"|| world.interacts[i].type == "spike"|| world.interacts[i].type == "key"){
					let panel = PIXI.Texture.fromImage(cfloor.texture);
					panelsprite = new PIXI.Sprite(panel);
					panelsprite.position.x = cfloor.x;
					panelsprite.position.y = cfloor.y;
					panelsprite.width = cfloor.width;
					panelsprite.height = cfloor.height;
					cfloor.sprite = panelsprite;
					floorcontainer.addChild(panelsprite);
				}
	}
	stage.addChild(floorcontainer);
	console.log(continueornot);
	if(continueornot){
		console.log("continuing load");
		continueLoad();
	}
	loadspri.alpha = 0;
	document.getElementById("textSpace").innerHTML = ""
	displayDialogue();
}
function loadFromFile(world, levelname,continueornot){
	console.log(continueornot);
	readTextFile(levelname,continueornot);	
}
