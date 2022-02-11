import Drum from "./Drum.js";
/**
 * DrumMachine class, it just creates DOM-elements for each drum-instance and instantiates the Drum-instances.
 */
export default class DrumMachine {
    constructor(props) {
        const {element, drumKit} = props;
        this.element = element;
        this.drums = [];

        /* create a document-fragment for the drums, then loop through the drumkit props, create the DOM elements, and instantiate Drum-instances */
        const fragment = document.createDocumentFragment();
        for (const drum of drumKit.drums) {
            const drumElement = this.createElement(
                "button", {}, [
                    ["h3", {textContent: drum.id}],
                    ["p", {textContent: "HOTKEY: "}, [
                        ["span", {textContent: drum.key}]]
                    ]
                ]
            );
            this.drums.push(new Drum({
                element: drumElement, soundFolder: drumKit.soundFolder, fileName: drum.fileName, key: drum.key
            }));
            fragment.appendChild(drumElement);
        }
        this.element.appendChild(fragment);
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
