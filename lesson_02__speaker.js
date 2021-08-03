const mic = require('mic');
const Speaker = require('speaker');

const audioConfig = {
    rate: 16000,
    channels: 1,
    bitDepth: 16
}

const micInstance = mic({
    rate: audioConfig.rate,
    channels: audioConfig.channels,
    bitwidth: audioConfig.bitDepth,
    debug: false,
    exitOnSilence: 6
});

const speaker = new Speaker({
    sampleRate: audioConfig.rate,
    channels: audioConfig.channels,
    bitDepth: audioConfig.bitDepth
  });

const micInputStream = micInstance.getAudioStream();
micInputStream.pipe(speaker);

micInstance.start();