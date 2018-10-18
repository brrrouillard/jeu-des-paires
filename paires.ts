class Card {
    _domElement: any;
    _visible: boolean;
    _imgSrc: string;
    constructor(domElement: any, imgSrc: string){
        this._domElement = domElement;
        this._visible = false;
        this._imgSrc = "/img/" + imgSrc;
        this.addImgSrc();
        console.log(this._domElement);
    }

    reveal(): void {
        this._visible = true;
    }
    hide(): void {
        this._visible = false;
    }

    
    addImgSrc(): void {
        let path = `url('${this._imgSrc}")`;
        this._domElement.style.backgroundImage = path;
    }
}

let card1 = new Card(document.getElementById("1"), "anehihan.jpg");