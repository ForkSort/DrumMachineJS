import DrumMachine from "./DrumMachine.js";

const audioContext = new AudioContext();
const buffer = audioContext.createBuffer(2, 22050, 44100); // create a buffer with 2 channels at 22kHz bitrate per channel
/**
 * Instantiate the drum machine with custom drums.
 * @param parent - the DOM element to render the drum-machine at
 * @param audioContext - the audioContext instance
 * @param audioOutput - audio output destination
 * @param drumKit - array of objects with custom drum params. ('key' is the keyboard-mapping key, 'id' is a name-identifier)
 */
const drumMachine = new DrumMachine({
    parent: document.getElementById("root"),
    audioContext: audioContext,
    audioOutput: audioContext.destination,
    drumKit: [
        {soundUrl: "./sounds/clap.wav", id: "clap", key: 8},
        {soundUrl: "./sounds/hihat.wav", id: "hihat", key: 9},
        {soundUrl: "./sounds/kick.wav", id: "kick", key: 4},
        {soundUrl: "./sounds/openhat.wav", id: "openhat", key: 5},
        {soundUrl: "./sounds/ride.wav", id: "ride", key: 6},
        {soundUrl: "./sounds/snare.wav", id: "snare", key: 1},
        {soundUrl: "./sounds/tink.wav", id: "tink", key: 2},
        {soundUrl: "./sounds/tom.wav", id: "tom", key: 3}
    ]
})
