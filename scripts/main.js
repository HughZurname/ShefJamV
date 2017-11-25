		//initialisation

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