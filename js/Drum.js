/**
 * Drum class,
 * @param {*} props {element: dom-element for this instance, audioContext: the audiocontext instance, audioOutput: audio output destination, soundUrl: url to the soundfile}
 */
export default class Drum {
    constructor(props) {
        const {element, audioContext, audioOutput, soundUrl} = props;

        this.element = element;
        this.audioContext = audioContext;
        this.audioOutput = audioOutput;
        this.audioBuffer;
        this.fetchAudio = this.fetchAudio.bind(this);
        this.fetchAudio(soundUrl);
        this.primaryGainControl = this.audioContext.createGain();
        this.primaryGainControl.gain.setValueAtTime(0.8, 0);
        this.primaryGainControl.connect(audioOutput);
    }
    async fetchAudio(soundUrl) {
        const response = await fetch(soundUrl);
        const responseBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.audioContext.decodeAudioData(responseBuffer);
    }
    play() {
        const audioSource = this.audioContext.createBufferSource();
        audioSource.buffer = this.audioBuffer;
        audioSource.connect(this.primaryGainControl);
        audioSource.start();

        this.element.animate(
            [
                { backgroundColor: '#fa0', borderColor: '#c99f35' },
                { backgroundColor: '#c99f35', borderColor: '#630' }
            ],
            {
                duration: 250,
                iterations: 1
            }
        ).play();
            
    }
 }
