/**
* Drum class, extends the HTML-Audio class. Each instance controls its own events.
*/
export default class Drum extends Audio {

   constructor(props) {
       const {element, soundFolder, fileName, key} = props;

       super(`${soundFolder}${fileName}`);
       this.load();
       this.key = key;

       this.keyDown = this.keyDown.bind(this);
       document.addEventListener('keydown', this.keyDown);
       this.keyUp = this.keyUp.bind(this);
       document.addEventListener('keyup', this.keyUp);
       this.clickDrum = this.clickDrum.bind(this);
       this.element = element;
       this.element.addEventListener("click", this.clickDrum);
   }
   hit() {
       this.pause();
       this.currentTime = 0;
       this.play();
   }
   keyDown(event) {
       if (event.key != this.key) return;
       this.element.classList.add("down");
       this.hit();
   }
   keyUp(event) {
       this.element.classList.remove("down");
   }
   clickDrum(event) {
       this.hit();
   }
}
