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