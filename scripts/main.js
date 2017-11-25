		//initialisation	
		let keylist = new Array();
		let entities = new Array();
		let floors = new Array();
		let world = {
		    entitylist: entities,
		    floorlist: floors
		};
		let player = {};

		//event listener
		window.addEventListener("keydown", keypress, false);
		window.addEventListener("keyup", keyup, false);


		//initalisation
		function init() {
		    stage = new PIXI.Container();
		    renderer = PIXI.autoDetectRenderer(
		        1024,
		        512, {
		            view: document.getElementById("game-canvas")
		        }
		    );
		    loadWorld();


		    let floortextures = {};
		    let spacetexture = PIXI.Texture.fromImage("assets/images/environment/space.png");
		    space = new PIXI.Sprite(spacetexture);
		    space.position.x = 0;
		    space.position.y = 0;
		    stage.addChild(space);

		    let playertexture = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");
		    playersprite = new PIXI.Sprite(playertexture);
		    playersprite.position.x = 0;
		    playersprite.position.y = 0;
		    stage.addChild(playersprite);

		    	
  		    for (i = 0; i < 1000; i++) {
		        let startex = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");  
			star = new PIXI.Sprite(startex);	   	 
			star.position.x = Math.random()*1024;
		   	 star.position.y = Math.random()*512;
		    	  	stage.addChild(star);
		    }
		    for (i = 0; i < floors.length; i++) {
		        let cfloor = floors[i];
		        let panel = PIXI.Texture.fromImage("assets/images/environment/" + cfloor.texture + ".png");
		        panelsprite = new PIXI.Sprite(panel);
		        panelsprite.position.x = cfloor.x;
		        panelsprite.position.y = cfloor.y;
		        stage.addChild(panelsprite);
		    }
		    requestAnimationFrame(update);
		}


		function update() {

		    //input
		    keycheck();
		    //world update
		    worldUpdates();

		    //physics
		    physicsUpdate();


		    //RENDER
			//console.log("rendering");
			render();



		    renderer.render(stage);
		    requestAnimationFrame(update);
		}
