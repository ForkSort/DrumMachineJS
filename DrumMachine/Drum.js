/**
 * Drum class,
 * @param {*} props {element: dom-element for this instance, audioContext: the audiocontext instance, audioOutput: audio output destination, soundUrl: url to the soundfile}
 */
export default class Drum {
    constructor(props) {
        const {element, audioContext, audioOutput, audioBuffer} = props;

        this.element = element;
        this.audioContext = audioContext;
        this.audioBuffer = audioBuffer;
        this.primaryGainControl = this.audioContext.createGain();
        this.primaryGainControl.gain.setValueAtTime(0.8, 0);
        this.primaryGainControl.connect(audioOutput);
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