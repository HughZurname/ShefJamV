		//initialisation
		let justdamaged = 0;
		let keylist = new Array();
		let entities = new Array();
		let floors = new Array();
		let inters = new Array();
		let ps = new Array();
		let world = {
			entitylist: entities,
			floorlist: floors,
			interacts: inters,
			projectiles:ps
		};
		let player = {};
		let drawnstars = new Array(100);
		//event listener
		window.addEventListener("keydown", keypress, false);
		window.addEventListener("keyup", keyup, false);
		window.addEventListener("mousemove", mousemove, false);
		window.addEventListener("click", clickm, false);
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
			
			 let blackfront = PIXI.Texture.fromImage("assets/images/hud/blackbox.png");
			    blackdrop = new PIXI.Sprite(blackfront);
			    blackdrop.position.x = 0;
			    blackdrop.position.y = 0;
			    blackdrop.width = 1024;
			    blackdrop.height = 512;
		            blackdrop.alpha = 0.6;
			    HUDcontainer.addChild(blackdrop);

			thing = new PIXI.Graphics();
			thing2 = new PIXI.Graphics();
			//bottom
			thing.beginFill();
			thing.moveTo(0,512);	
			thing.lineTo(1024,512);
			thing.closePath();
			thing.endFill();
			//thing.drawCircle(0,0,300);
			//

			stage.addChild(thing);
			
			blackdrop.mask = thing;	

			for(let h = 0; h<5; h++){
			    let background = PIXI.Texture.fromImage("assets/images/hud/battery-empty.png");
			    heartspr = new PIXI.Sprite(background);
			    heartspr.position.x = 40*h;
			    heartspr.position.y = 15;
			    HUDcontainer.addChild(heartspr);
			    let hearts = PIXI.Texture.fromImage("assets/images/hud/battery-full.png");
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

		    update();//requestAnimationFrame(update);
		}
		let gamestate = "menu";
		//initalisation
		function init() {
			stage = new PIXI.Container();
			renderer = PIXI.autoDetectRenderer(
				1024,
				512, {
					view: document.getElementById("game-canvas")
				}
			);
			
			
				
			
			
			/*
			let bigstart = PIXI.Texture.fromImage("assets/images/environment/star-3.png");
			bigstar = new PIXI.Sprite(bigstart);
			bigstar.position.x = 512;
			bigstar.position.y = 512;	
			let bigstart2 = PIXI.Texture.fromImage("assets/images/environment/star-3.png");
			bigstar2 = new PIXI.Sprite(bigstart);
			bigstar2.position.x = 512;
			bigstar2.position.y = 512;
			var blurf = new PIXI.filters.BlurFilter();
			blurf.blur =200;
			bigstar.filters = [blurf];
			var blurf2 = new PIXI.filters.BlurFilter();
			blurf2.blur = 100;
			bigstar2.filters = [blurf];
			stage.addChild(bigstar);
			stage.addChild(bigstar2);
			
			*/
		
			starcontainer = new PIXI.ParticleContainer();
			for (i = 0; i < 100; i++) {
				let startex = PIXI.Texture.fromImage("assets/images/environment/star-0.png");
				drawnstars[i] = new PIXI.Sprite(startex);
				drawnstars[i].position.x = Math.random() * 1024;
				drawnstars[i].position.y = Math.random() * 512;
				starcontainer.addChild(drawnstars[i]);
			}
			stage.addChild(starcontainer);
			menucontainer = new PIXI.Container();
			let menubackground = PIXI.Texture.fromImage("assets/images/hud/blackbox.png");
			menu = new PIXI.Sprite(menubackground);
			
			menu.width = 1024;
			menu.height = 512;
			menucontainer.addChild(menu);
				
			startGame();
		}
		function startGame(){
			//gamestate = "running";
			//
			loadWorld(80, 300, "levels/level1.txt");
		}
		let mousex = 0;
		let mousey = 0;
		let screenmx = 0;
		let screenmy = 0;
		let screenpx = 0;
		let screenpy = 0;
		function playeractual(){
			
			screenpx = -player.width/2+512;
			screenpy = -player.height/2+400;
		}
		function update() {
		    //input
		    keycheck();
		    recalculateMouse();
			playeractual();
				test.position.x = mousex-5;
				test.position.y = mousey-5;
				test.width = 10;
				test.height = 10;
				
			if(gamestate=="running"){
				if(weapon==1){
					let viewtrianglex0 = screenpx;
					let viewtriangley0 = screenpy;
					let viewtrianglex1 = screenpx+300;
					let viewtriangley1 = screenpy-50;
					let viewtrianglex2 = screenpx+300;
					let viewtriangley2 = screenpy+50;
				
					thing.destroy();	
					thing = new PIXI.Graphics();
					thing.position.x = screenpx;
					thing.position.y = screenpy;
					thing.pivot.x = screenpx;
					thing.pivot.y = screenpy;
					if(screenmx-screenpx == 0){
						if(screenmy-screenpy>0){
							thing.rotation = Math.PI/2;
						}else{
							thing.rotation = -Math.PI/2;
						}
					}else{
					
						thing.rotation = Math.atan((screenmy-screenpy)/(screenmx-screenpx));
						if(screenmx<screenpx){
							thing.rotation +=Math.PI;
						}
					}
					
					thing.beginFill()
					.drawPolygon([-10000,-10000,10240,-10000,10240,10000,-10000,10000])
					.drawPolygon([viewtrianglex0 ,viewtriangley0,viewtrianglex1 ,viewtriangley1,viewtrianglex2 ,viewtriangley2] )
					.addHole();
					HUDcontainer.addChild(thing);
					blackdrop.mask = thing;	
				}else{
					let blackfront = PIXI.Texture.fromImage("assets/images/hud/blackbox.png");
					blackdrop.destroy();
					blackdrop = new PIXI.Sprite(blackfront);
					blackdrop.position.x = 0;
					blackdrop.position.y = 0;
					blackdrop.width = 1024;
					blackdrop.height = 512;
						blackdrop.alpha = 0.6;
					HUDcontainer.addChild(blackdrop);
			}


			stage.removeChild(playersprite);
			stage.addChild(playersprite);
			stage.removeChild(HUDcontainer);
			stage.addChild(HUDcontainer);

		    //world update
		    worldUpdates();
			
		    //logic
			if(justdamaged>0){justdamaged-=1;}
			playersprite.alpha = 1-((justdamaged%10)/10);
		    //physics
		    physicsUpdate();
			//RENDER
			//console.log("rendering");
			
			
			}
			
			render();
			if(gamestate == "menu"){
				stage.removeChild(HUDcontainer);
				stage.removeChild(menucontainer);
				stage.addChild(menucontainer);
				stage.removeChild(starcontainer);
				stage.addChild(starcontainer);
			}else{
				if(typeof menucontainer !== 'undefined'){
					menucontainer.destroy();
				}
			}
			renderer.render(stage);
			requestAnimationFrame(update);
		}
