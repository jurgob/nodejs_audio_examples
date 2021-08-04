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

const tau = 2 * Math.PI
const sin = (t, freq) => Math.sin(tau * t * freq)
/* music effects*/
const whiteNoise = (t) => Math.random() * (1 - -1) + -1;
const sinWaveSingle = (t) => sin(t, 400)
const sinWaves2ofThem = (t) => sin(t, 400) + sin(t, 404);
const startYourEngine = (t) => {
    if(!startYourEngine.n)
        startYourEngine.n = 0
    const x = Math.sin(t * 262 + Math.sin(startYourEngine.n));
    startYourEngine.n += Math.sin(t);
    return x;
}
const musicList = [whiteNoise, sinWaveSingle, sinWaveSingle, sinWaves2ofThem, startYourEngine]
const musicIdx = process.argv[2] || 0
const musicSelected = musicList[musicIdx]

console.log(`Music Selected: ${musicSelected.name}`)

const music = baudio(musicSelected);  
music.pipe(speaker)