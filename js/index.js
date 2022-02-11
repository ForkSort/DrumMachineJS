import Drum from "./Drum.js";
import DrumMachine from "./DrumMachine.js";

/**
 * Instantiate the drum machine with custom drums.
 * @param element - the DOM element holding the drum-machine
 * @param drumKit - Object with custom drumkit params. ('key' is the keyboard-mapping key, 'id' is a name-identifier)
 */
const drumMachine = new DrumMachine({
    element: document.querySelector(".drum-machine"),
    drumKit: {
        soundFolder: "./sounds/", 
        drums: [
            {fileName: "clap.wav", id: "clap", key: 8},
            {fileName: "hihat.wav", id: "hihat", key: 9},
            {fileName: "kick.wav", id: "kick", key: 4},
            {fileName: "openhat.wav", id: "openhat", key: 5},
            {fileName: "ride.wav", id: "ride", key: 6},
            {fileName: "snare.wav", id: "snare", key: 1},
            {fileName: "tink.wav", id: "tink", key: 2},
            {fileName: "tom.wav", id: "tom", key: 3}
        ]
    }
})