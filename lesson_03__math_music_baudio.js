const baudio = require('baudio');
const Speaker = require('speaker');

const audioConfig = {
    rate: 16000,
    channels: 1,
    bitDepth: 16
}

const speaker = new Speaker({
    sampleRate: audioConfig.rate,
    channels: audioConfig.channels,
    bitDepth: audioConfig.bitDepth
  });

  

let nMusic1 = 0;
function startYourEngine(t) {
    const x = Math.sin(t * 262 + Math.sin(nMusic1));
    nMusic1 += Math.sin(t);
    return x;
}

const tau = 2 * Math.PI
const sin = (t, freq) => Math.sin(tau * t * freq)

function sinWaveSingle(t) {
    const x = sin(t, 400);
    return x
}


function sinWaves2ofThem(t) {
    const x = sin(t, 400) + sin(t, 404);
    return x
}

function whiteNoise(t) {
    return Math.random() * (1 - -1) + -1;
}

const musicList = [whiteNoise, startYourEngine, sinWaveSingle, sinWaveSingle, sinWaves2ofThem]

const musicIdx = process.argv[2] || 0
const musicSelected = musicList[musicIdx]

console.log(`Music Selected: ${musicSelected.name}`)


const music = baudio(musicSelected);
  
music.pipe(speaker)