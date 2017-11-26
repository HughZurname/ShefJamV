
function readTextFile(filename,continueornot)
{
   var xhr = new XMLHttpRequest();
	xhr.open("GET", filename, true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
	    if (xhr.status === 200) {
	      console.log(xhr.responseText);
		return loadLevel(xhr.responseText,continueornot);
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
		let inters = new Array();
		let ps = new Array();
	entities.push(player);
	world.floorlist = floors;
	world.interacts = inters;
	world.entitylist = entities;
	world.projectiles = ps;
	if(typeof entitycontainer !== 'undefined'){
  		entitycontainer.destroy();
	}
	entitycontainer = new PIXI.Container();
	let lines = fileitem.split("\n");
	for(let l = 0; l<lines.length; l++){
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
			if(type=="exit"){
				let sx = parseInt(components[4]);
				let sy = 7-parseInt(components[5]);
				sx*=64;sy*=64
				let exit = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"exit",level:text,spawnx:sx,spawny:sy};
				console.log("added interact");				
				world.interacts.push(exit);
			}
			if(type=="chain"){
				let chain = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,type:"chain"};				
				world.interacts.push(chain);
			}
			if(type=="enemy"){
				let texture = PIXI.Texture.fromImage(text);
				    texturesprite = new PIXI.Sprite(texture);
				   texturesprite.position.x = 0;
				    texturesprite.position.y = 0;
				    entitycontainer.addChild(texturesprite);
				let enemy = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,xvel:0,yvel:0,entitytype:"enemy",sprite:texturesprite};
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
	stage.addChild(floorcontainer);
	console.log(continueornot);
	if(continueornot){
		console.log("continuing load");
		continueLoad();
	}
	loadspri.alpha = 0;
}
function loadFromFile(world, levelname,continueornot){
	console.log(continueornot);
	let fileitem = readTextFile(levelname,continueornot);	
}
