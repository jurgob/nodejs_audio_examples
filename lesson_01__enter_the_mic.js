const mic = require('mic');
const fs = require('fs');

const audioConfig = {
    rate: '16000',
    channels: '1'
}

const micInstance = mic({
    rate: audioConfig.rate,
    channels: audioConfig.channels,
    debug: false,
    exitOnSilence: 6
});

const micInputStream = micInstance.getAudioStream();

const fileName = 'output.raw'
const outputFileStream = fs.WriteStream(fileName);

micInputStream.pipe(outputFileStream);

micInputStream.on('startComplete', function() {
    console.log("Start recording");
    setTimeout(function() {
            micInstance.pause();
            console.log(`Record Completed`)
            console.log(`To listen it run: `)
            console.log(`play -b 16 -e signed -c ${audioConfig.channels} -r ${audioConfig.rate} ${fileName} `)
            process.exit(0)
            
    }, 15000);
});

micInstance.start();


