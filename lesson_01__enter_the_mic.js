

const mic = require('mic');

const fs = require('fs');
 
const micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 6
});

const micInputStream = micInstance.getAudioStream();

const outputFileStream = fs.WriteStream('output.raw');

micInputStream.on('startComplete', function() {
    console.log("Got SIGNAL startComplete");
    setTimeout(function() {
            micInstance.pause();
    }, 5000);
});

micInstance.start();


