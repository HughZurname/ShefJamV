let songList = [
    'assets/audio/sadSam.wav', 
    'assets/audio/bossBattle.wav', 
    'assets/audio/evenSadderSam.wav', 
    'assets/audio/menuMusic.wav'
]
let playList;

sounds.load(songList)
sounds.whenLoaded = setup

function setup(sl = songList) {
    return playList = sl.map(s => sounds[s])
}
var playing = null;
function music(name,track){
	
	if(playing==null){
		globaltrack = track;
		globaltrack.loop = true;
		if(!globaltrack.playing){
			globaltrack.play();
		}else{
			globaltrack.restart(); 
			globaltrack.fadeIn(1,1);
		}
		
		playing = name;
	}else{
		if(playing!=name){
		globaltrack.fadeOut(3,3);
		if(playing!="pending"){
			playing = "pending";
			setTimeout(function(){
				playing=null;
				music(name,track);
				},3000);
			}
		}
	}
}
function continueMusic(){
	
	
}
function stopMusic(){
	globaltrack.fadeOut(2,2);
	//globaltrack.pause();
	//globaltrack.fadeIn(2,2);
	playing=null;
}