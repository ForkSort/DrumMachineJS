import Drum from "./Drum.js";
/**
 * DrumMachine class, creates DOM-elements for each drum-instance and instantiates the Drum-instances.
 * @param {*} props {parent: parent-DOM element to render at, audioContext: the audioContext instance, audioOutput: audio output destination, drumKit: array[{soundUrl: url, id: a name, key: keyboard-mapping key}]}
 */
export default class DrumMachine {
    constructor(props) {
        const {parent, audioContext, audioOutput, drumKit} = props;

        this.drums = {};
        this.audioContext = audioContext;
        this.primaryGainControl = this.audioContext.createGain();
        this.primaryGainControl.gain.setValueAtTime(0.8, 0);
        this.primaryGainControl.connect(audioOutput);

        /* create the drum-machine root element */
        const drumMachineElement = this.createElement(
            "div", {className: "drum-machine"}, [
                ["div", {}, [
                    ["h1", {textContent: "DRUM"}, [
                        ["br", {}], 
                        ["span", {textContent: "MACHINE"}]
                    ]],
                    //["canvas", {id: "oscilloscope"}]
                ]]
            ]
        );
        /* loop through the drumkit, instantiate the drum-instances and attach eventlisteners*/
        for (const drum of drumKit) {
            
            const drumElement = this.createElement(
                "button", {}, [
                    ["h3", {textContent: drum.id}],
                    ["p", {textContent: "HOTKEY: "}, [
                        ["span", {textContent: drum.key}]
                    ]]
                ]
            );
            this.drums[drum.key] = new Drum({
                element: drumElement,
                audioContext: this.audioContext, 
                audioOutput: this.primaryGainControl, 
                soundUrl: drum.soundUrl
            });
            drumElement.addEventListener('touchstart', (event) => {
                this.drums[drum.key].play();
                event.preventDefault();
            });
            drumElement.addEventListener('mousedown', (event) => {
                this.drums[drum.key].play();
                event.preventDefault();
            });
            drumMachineElement.appendChild(drumElement);
        }
        parent.appendChild(drumMachineElement);

        document.addEventListener('keydown', (event) => {
            if (this.drums[event.key] === undefined || event.repeat) return;
            this.drums[event.key].play();
            event.preventDefault();
        });  
    }
    /**
     * Parses parameters through document.createElement, and returns a DOM (if children param is specified, then with the children appended).
     * @param {string} type type of html-element
     * @param {*} props element properties and attributes, ie: className: "wrapper", textContent: "sometext"
     * @param  {...array} children same format: ["type", {props}, [...children]] 
     * @returns DOM object
     */
    createElement(type, props, ...children) {
        const createEl = document.createElement(type); 
        for (const [key, value] of Object.entries(props)) {
            createEl[key] = value;
        }
        for (const child of children.flat()) {
            createEl.appendChild(this.createElement(...child));
        }
        
        return createEl;
    }
}
