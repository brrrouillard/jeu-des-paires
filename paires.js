class Card {
    constructor(domElement, imgSrc) {
        this._domElement = domElement;
        this._visible = false;
        this._imgSrc = "/img/" + imgSrc;
        this.addImgSrc();
        console.log(this._domElement);
    }
    reveal() {
        this._visible = true;
    }
    hide() {
        this._visible = false;
    }
    addImgSrc() {
        let path = `url('${this._imgSrc}")`;
        this._domElement.style.backgroundImage = path;
    }
}
let card1 = new Card(document.getElementById("1"), "anehihan.jpg");
