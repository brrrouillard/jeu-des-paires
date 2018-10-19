class Card {
    _domElement: any;
    _visible: boolean;
    _found: boolean;
    _imgSrc: string;

    constructor(domElement: any, imgSrc: string){
        this._domElement = domElement;
        this._imgSrc = "img/" + imgSrc;
        this._found = false;
        this.addImgSrc();
        this.hide();
    }
    // PUBLIC
    public reveal(): void {
        this._visible = true;
        this._domElement.style.backgroundSize = "cover";
    }
    public hide(): void {
        this._visible = false;
        this._domElement.style.backgroundSize = "0% 0%";
    }
    // PRIVATE
    private addImgSrc(): void {
        let path = "url(" +  this._imgSrc + " )";
        this._domElement.style.backgroundImage = path;
    }
    // GETTERS
    get visible(): boolean {
        return this._visible;
    }
    get found(): boolean {
        return this._found;
    }
    get imgSrc() {
        return this._imgSrc;
    }
    // SETTERS
    set found(value) {
        this._found = value;
    }
}

class Game {
    static _pairFound = 0;
    static _activeCardsCount = 0;
    
    static _currentCards = []; 
    static clickOnCard(event) {   // Click handler
        let cardId = event.target.id;
        let selectedCard = arr[cardId-1]; // Select the card the player just clicked on
        console.log(selectedCard);
        console.log(Game._activeCardsCount);
        if (!selectedCard.visible && Game._activeCardsCount < 2){     
            selectedCard.reveal();
            Game._activeCardsCount++;
            Game._currentCards.push(selectedCard);
            if(Game._activeCardsCount == 2){ // If two cards are visible
                if( Game.areEquals(Game._currentCards[0], Game._currentCards[1])){ // If both cards are equals
                    console.log("trouvé");
                    Game._activeCardsCount = 0;                   
                    Game._currentCards[0].found = true;
                    Game._currentCards[1].found = true;
                    Game._currentCards = [];
                    Game._pairFound++;
                }
                else { // If they are different
                    console.log("Salut");
                    Game._activeCardsCount = 0;
                    console.log(Game._currentCards);  
                    let tempCurrentCards = [...Game._currentCards];
                    console.dir("1:", tempCurrentCards);
                    setTimeout(() => {
                        console.log(Game);
                        console.log("Cards : " + tempCurrentCards);
                        tempCurrentCards[0].hide();
                        tempCurrentCards[1].hide();
                    }, 1000);           
                    Game._currentCards = [];
                }
            }
        }
        Game.updateStatus();
    }

    static areEquals(first, second): boolean { // Tells if 2 cards are identical
        return first.imgSrc == second.imgSrc; 
    }
    static updateStatus(): void {
        document.getElementById("pair-found").innerHTML = "Pair founds : " + Game._pairFound;
    }
}
let baseArr = ["anehihan.jpg", "anehihan.jpg", "chatminou.jpg", "chatminou.jpg", "chientoutou.jpg", "chientoutou.jpg", "lamacrachat.jpg", "lamacrachat.jpg", "lapinscrottes.jpg", "lapinscrottes.jpg", "lionnegraou.jpg", "lionnegraou.jpg", "oursbaby.jpg", "oursbaby.jpg"];
let arr = []; // Arrays of 14 items containing each card
for (let i = 1; i <= 14; i++){
    let id = i.toString();
    let randImg = Math.floor(Math.random() * baseArr.length);
    let randImgSrc = baseArr[randImg];
    baseArr.splice(randImg, 1); // remove the image from the array when it's placed
    arr.push(new Card(document.getElementById(id),randImgSrc));
    arr[i-1]._domElement.addEventListener("click", Game.clickOnCard); // x
}
