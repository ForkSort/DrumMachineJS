import DrumMachine from "./DrumMachine/DrumMachine.js";

// root element:
const rootElement = document.getElementById("root");

// loading screen elements:
let loadingElement = document.createElement("h1");
loadingElement.style = "position: absolute; left: 40%; top: 50%; color: #fea;"
loadingElement.textContent = "Loading assets.";
rootElement.appendChild(loadingElement);

// Setup the audio-context instance
const audioContext = new AudioContext();
const buffer = audioContext.createBuffer(2, 22050, 44100); // create a buffer with 2 channels at 22kHz bitrate per channel

/**
 * Fetches audio-file from a url and decodes it so AudioContext can use it.
 * @param {*} soundUrl - url to audio file
 * @returns audioBuffer - A decoded audioBuffer object
 */
async function fetchAudio(soundUrl) {
    const response = await fetch(soundUrl);
    const responseBuffer = await response.arrayBuffer();
    let audioBuffer = await audioContext.decodeAudioData(responseBuffer);
    loadingElement.textContent += ".";
    return audioBuffer;
}

async function loadAssets() {

    /**
     * Instantiate the drum machine with custom drums.
     * @param parent - the DOM element to render the drum-machine at
     * @param audioContext - the audioContext instance
     * @param audioOutput - audio output destination
     * @param drumKit - contains array of objects with custom drum params. {
     *          audioBuffer: decoded & buffered audio-data
     *          id: is a name-identifier
     *          key: is the keyboard-mapping key   
     */
    const drumMachine = new DrumMachine({
        parent: rootElement,
        audioContext: audioContext,
        audioOutput: audioContext.destination,
        drumKit: [
            {audioBuffer: await fetchAudio("./sounds/clap.wav"), id: "clap", key: 8},
            {audioBuffer: await fetchAudio("./sounds/hihat.wav"), id: "hihat", key: 9},
            {audioBuffer: await fetchAudio("./sounds/kick.wav"), id: "kick", key: 4},
            {audioBuffer: await fetchAudio("./sounds/openhat.wav"), id: "openhat", key: 5},
            {audioBuffer: await fetchAudio("./sounds/ride.wav"), id: "ride", key: 6},
            {audioBuffer: await fetchAudio("./sounds/snare.wav"), id: "snare", key: 1},
            {audioBuffer: await fetchAudio("./sounds/tink.wav"), id: "tink", key: 2},
            {audioBuffer: await fetchAudio("./sounds/tom.wav"), id: "tom", key: 3}
        ]
    })
    rootElement.removeChild(loadingElement);
    loadingElement = undefined;

}
loadAssets();