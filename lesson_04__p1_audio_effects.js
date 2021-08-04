const mic = require('mic');
const Speaker = require('speaker');
var SoxCommand = require('sox-audio');

const audioConfig = {
    rate: 16000,
    channels: 1,
    bitDepth: 16,
    encoding: "signed"
}

const micInstance = mic({
    rate: audioConfig.rate,
    channels: audioConfig.channels,
    bitwidth: audioConfig.bitDepth,
    encoding: audioConfig.encoding,
    debug: false,
    exitOnSilence: 6,
})
const micInputStream = micInstance.getAudioStream();

const speaker = new Speaker({
    sampleRate: audioConfig.rate,
    channels: audioConfig.channels,
    bitDepth: audioConfig.bitDepth,
    signed: audioConfig.encoding === "signed"
  });
const soxCommand = SoxCommand();

soxCommand.input(micInputStream)
    .inputSampleRate(audioConfig.rate)
    .inputChannels(audioConfig.channels)
    .inputBits(audioConfig.bitDepth)
    .inputEncoding(audioConfig.encoding)    
    .inputFileType('raw')
soxCommand.output(speaker)
    .outputSampleRate(audioConfig.rate)
    .outputChannels(audioConfig.channels)
    .outputBits(audioConfig.bitDepth)
    .outputEncoding(audioConfig.encoding)
    .outputFileType('raw')

soxCommand.addEffect('reverb', [80]) 
micInstance.start();
soxCommand.run();