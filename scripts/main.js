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

		let sadSam;
		let bossBattle;
		let evenSadderSam;
		let menuMusic;		
		
		function setup() {
			sadSam = sounds['./assets/audio/sadSam.wav']
			bossBattle = sounds['./assets/audio/bossBattle.wav']
			menuMusic = sounds['./assets/audio/menuMusic.wav']
			evenSadderSam = sounds['./assets/audio/evenSadderSam.wav']
		}
		sounds.load(['./assets/audio/sadSam.wav', './assets/audio/bossBattle.wav', './assets/audio/evenSadderSam.wav', './assets/audio/menuMusic.wav'], setup())
		sounds.whenLoaded = setup;

		function continueLoad() {
			let floortextures = {};
		    let playertexture = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");
		    playersprite = new PIXI.Sprite(playertexture);
		    playersprite.position.x = 0;
		    playersprite.position.y = 0;
		    stage.addChild(playersprite);
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
			for (i = 0; i < 100; i++) {
				let startex = PIXI.Texture.fromImage("assets/images/environment/star-0.png");
				drawnstars[i] = new PIXI.Sprite(startex);
				drawnstars[i].position.x = Math.random() * 1024;
				drawnstars[i].position.y = Math.random() * 512;
				stage.addChild(drawnstars[i]);
			}
			loadWorld(50, 50, "levels/level1.txt");

		}


		function update() {

<<<<<<< HEAD
		    //input
		    keycheck();
		    //world update
		    worldUpdates();
		    //logic
			if(justdamaged>0){justdamaged-=1;}
			playersprite.alpha = 1-((justdamaged%10)/10);
		    //physics
		    physicsUpdate();
=======
			//input
			keycheck();
			//world update
			worldUpdates();

			//physics
			physicsUpdate();
>>>>>>> b5e8f98c05fc4a20c65228c76bca0b3cce4a4765


			//RENDER
			//console.log("rendering");
			render();



			renderer.render(stage);
			requestAnimationFrame(update);
		}