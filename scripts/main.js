		//initialisation
		let justdamaged = 0;
		let keylist = new Array();
		let entities = new Array();
		let floors = new Array();
		let inters = new Array();
		let world = {
			entitylist: entities,
			floorlist: floors,
			interacts: inters
		};
		let player = {};
		let drawnstars = new Array(1000);
		//event listener
		window.addEventListener("keydown", keypress, false);
		window.addEventListener("keyup", keyup, false);
		window.addEventListener("mousemove", mousemove, false);
		let health = 100;
		let heartsprites = {};
		function continueLoad() {
			let floortextures = {};
					


			
		    let playertexture = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");
		    playersprite = new PIXI.Sprite(playertexture);
		    playersprite.position.x = 0;
		    playersprite.position.y = 0;
		    stage.addChild(playersprite); 
			 let te = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");
		    test = new PIXI.Sprite(te);
		    test.position.x = 0;
		    test.position.y = 0;
		    stage.addChild(test);
		//HUD
			HUDcontainer = new PIXI.Container();
			for(let h = 0; h<5; h++){
			    let hearts = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");
			    heartsprites[h] = new PIXI.Sprite(hearts);
			    heartsprites[h].position.x = 40*h;
			    heartsprites[h].position.y = 15;
			    HUDcontainer.addChild(heartsprites[h]);
			}
	
			let loadingte = PIXI.Texture.fromImage("assets/images/environment/space.png"); 
			loadspri = new PIXI.Sprite(loadingte);
			loadspri.position.x = 0;
			loadspri.position.y = 0;
			loadspri.width = 1024;
			loadspri.height = 512;
			loadspri.alpha = 0;
			HUDcontainer.addChild(loadspri);

			stage.addChild(HUDcontainer);

		    requestAnimationFrame(update);
		}
		//initalisation
		function init() {
			stage = new PIXI.Container();
			renderer = PIXI.autoDetectRenderer(
				1024,
				512, {
					view: document.getElementById("game-canvas")
				}
			);
			starcontainer = new PIXI.ParticleContainer();
			for (i = 0; i < 100; i++) {
				let startex = PIXI.Texture.fromImage("assets/images/environment/star-0.png");
				drawnstars[i] = new PIXI.Sprite(startex);
				drawnstars[i].position.x = Math.random() * 1024;
				drawnstars[i].position.y = Math.random() * 512;
				starcontainer.addChild(drawnstars[i]);
			}
			stage.addChild(starcontainer);
			loadWorld(80, 300, "levels/level1.txt");
		}
		let mousex = 0;
		let mousey = 0;
		let screenmx = 0;
		let screenmy = 0;
		function update() {
		    //input
		    keycheck();
		    recalculateMouse();
			test.position.x = mousex;
			test.position.y = mousey;
		    //world update
		    worldUpdates();
		    //logic
			if(justdamaged>0){justdamaged-=1;}
			playersprite.alpha = 1-((justdamaged%10)/10);
		    //physics
		    physicsUpdate();
			//RENDER
			//console.log("rendering");
			render();
			


			renderer.render(stage);
			requestAnimationFrame(update);
		}
