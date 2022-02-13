/**
 * Oscilator class, draws an audio-oscilator in a canvas.
 * @param {*} props {element: an element to attach it to, audioContext: the audioContext instance, audioInput: the audioInput to draw the oscilator on}
 */
export default class Oscilator {

    constructor(props) {
        const {element, audioContext, audioInput} = props;

        this.element = element;
        this.audioContext = audioContext;
        this.audioInput = audioInput;

        this.analyser = audioContext.createAnalyser();
        this.analyser.fftSize = 128;
        audioInput.connect(this.analyser);

        this.waveform = new Float32Array(this.analyser.frequencyBinCount);
        this.analyser.getFloatTimeDomainData(this.waveform);

        this.updateWaveform = this.updateWaveform.bind(this);
        this.updateWaveform();
        this.drawOscilloscope = this.drawOscilloscope.bind(this);
        this.drawOscilloscope();
    }
    updateWaveform() {
        requestAnimationFrame(this.updateWaveform);
        this.analyser.getFloatTimeDomainData(this.waveform);
    }
    drawOscilloscope() {
        requestAnimationFrame(this.drawOscilloscope);
    
        const scopeCanvas = this.element;
        const scopeContext = scopeCanvas.getContext('2d');

        scopeContext.width  = scopeContext.offsetWidth;
        scopeContext.height = scopeContext.offsetHeight;
    
        scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height);
        scopeContext.beginPath();
    
        for(let i = 0; i < this.waveform.length; i += 1) {
            const x = i*4.5;
            const y = ( 0.5 + (this.waveform[i] / 1) ) * scopeCanvas.height;
    
            if(i == 0) {
                scopeContext.moveTo(x, y);
            } else {
                scopeContext.lineTo(x, y);
            }
        }
        scopeContext.stroke();
    }
}