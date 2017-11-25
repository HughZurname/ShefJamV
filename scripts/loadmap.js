
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
	entities.push(player);
	world.floorlist = floors;
	world.interacts = inters;
	world.entitylist = entities;
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
				let currentfloor = {x: 64*xcoordGrid, y: 64*ycoordGrid,width:64,height:64,texture:text};
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
		}
	}
	//render 
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
		        floorcontainer.addChild(panelsprite);
	}
	stage.addChild(floorcontainer);
	console.log(continueornot);
	if(continueornot){
		console.log("continuing load");
		continueLoad();
	}

}
function loadFromFile(world, levelname,continueornot){
	console.log(continueornot);
	let fileitem = readTextFile(levelname,continueornot);	
}
