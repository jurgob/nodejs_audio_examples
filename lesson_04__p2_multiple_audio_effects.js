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

const effectIdx = process.argv[2] || 0

//checkout https://h3manth.com/2009/01/08/sox-sound-exchange-2
const effects = [
    {
        name: 'reverb',
        params: [80]
    },
    {
        name: 'echo',
        params: ['0.8', '0.88', '60', '0.4']
    },
    {
        name: 'chorus',
        params: ['0.7', '0.9', '55', '0.4', '0.25', '2', '-t']
    },
    {
        name: 'chorus',
        params: ["0.5", "0.9", "50", "0.4", "0.25", "2", "-t", "60", "0.32", "0.4", "2.3", "-t", "40", "0.3", "0.3", "1.3", "-s"]
    }
]
const selectedEffect = effects[effectIdx]

console.log(`apply the effects: ${selectedEffect.name} ${selectedEffect.params}`)
soxCommand.addEffect(selectedEffect.name,selectedEffect.params ) 
micInstance.start();
soxCommand.run();