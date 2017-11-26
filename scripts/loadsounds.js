let songList = [
    './assets/audio/sadSam.wav', 
    './assets/audio/bossBattle.wav', 
    './assets/audio/evenSadderSam.wav', 
    './assets/audio/menuMusic.wav'
]
let playList;

sounds.load(songList)
sounds.whenLoaded = setup

function setup(sl = songList) {
    return playList = sl.map(s => sounds[s])
}