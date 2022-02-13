import Drum from "./Drum.js";
import Oscillator from "./Oscillator.js";
/**
 * DrumMachine class, creates DOM-elements and instantiates the Drum-instances, and an Oscillator.
 * @param {*} props {parent: parent-DOM element to render at, audioContext: the audioContext instance, audioOutput: audio output destination, drumKit: array[{audioBuffer: object, id: a name, key: keyboard-mapping key}]}
 */
export default class DrumMachine {
    constructor(props) {
        const {parent, audioContext, audioOutput, drumKit} = props;

        /** Helper function to create elements. 
         * Parses parameters through document.createElement, and returns a DOM (if children param is specified, then with the children appended).
         * @param {string} type type of html-element
         * @param {*} props element properties and attributes, ie: className: "wrapper", textContent: "sometext"
         * @param  {...array} children same format: ["type", {props}, [...children]] 
         * @returns DOM object
         */
        function createElement(type, props, ...children) {
            const createEl = document.createElement(type); 
            for (const [key, value] of Object.entries(props)) {
                createEl[key] = value;
            }
            for (const child of children.flat()) {
                createEl.appendChild(createElement(...child));
            }
            
            return createEl;
        }

        // append component stylesheet to the page
        document.head.appendChild(createElement(
            "link", {rel: "stylesheet", type: "text/css", href: `${import.meta.url.substring(0, import.meta.url.lastIndexOf('/'))}/style.css`}));

        this.drums = {};
        this.audioContext = audioContext;
        this.primaryGainControl = this.audioContext.createGain();
        this.primaryGainControl.gain.setValueAtTime(0.8, 0);
        this.primaryGainControl.connect(audioOutput);

        /* create the drum-machine root element */
        const drumMachineElement = createElement(
            "div", {className: "drum-machine"}, [
                ["div", {className: "title", textContent: "DRUM"}, [
                        ["br", {}], 
                        ["span", {textContent: "MACHINE"}],
                        ["canvas", {className: "oscilloscope"}]
                    ]],
                ]
        );
        /* loop through the drumkit, instantiate the drum-instances and attach eventlisteners*/
        for (const drum of drumKit) {
            
            const drumElement = createElement(
                "button", {textContent: drum.id}, [
                    ["p", {textContent: "HOTKEY: "}, [
                        ["span", {textContent: drum.key}]
                    ]]
                ]
            );
            this.drums[drum.key] = new Drum({
                element: drumElement,
                audioContext: this.audioContext, 
                audioOutput: this.primaryGainControl, 
                audioBuffer: drum.audioBuffer
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
        // const {element, audioContext, audioInput} = props; 
        this.oscillator = new Oscillator({
            element: drumMachineElement.querySelector(".oscilloscope"),
            audioContext: this.audioContext,
            audioInput: this.primaryGainControl
        })
    }
    
}