class Card {
    constructor(domElement, imgSrc) {
        this._domElement = domElement;
        this._imgSrc = "img/" + imgSrc;
        this._found = false;
        this.addImgSrc();
        this.hide();
    }
    // PUBLIC
    reveal() {
        this._visible = true;
        this._domElement.style.backgroundSize = "cover";
    }
    hide() {
        this._visible = false;
        this._domElement.style.backgroundSize = "0% 0%";
    }
    // PRIVATE
    addImgSrc() {
        let path = "url(" + this._imgSrc + " )";
        this._domElement.style.backgroundImage = path;
    }
    // GETTERS
    get visible() {
        return this._visible;
    }
    get found() {
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
    static clickOnCard(event) {
        let cardId = event.target.id;
        let selectedCard = arr[cardId - 1]; // Select the card the player just clicked on
        console.log(selectedCard);
        if (selectedCard.visible && !selectedCard.found) { // If the card is already shown
            selectedCard.hide();
            Game._activeCardsCount--;
            Game._currentCards.pop();
        }
        else if (!selectedCard.visible && Game._activeCardsCount < 2) {
            selectedCard.reveal();
            Game._activeCardsCount++;
            Game._currentCards.push(selectedCard);
            if (Game._activeCardsCount > 1) {
                if (Game.areEquals(Game._currentCards[0], Game._currentCards[1])) { // If both cards are equals
                    Game._currentCards[0].found = true;
                    Game._currentCards[1].found = true;
                    Game._pairFound++;
                }
            }
        }
        Game.updateStatus();
    }
    static areEquals(first, second) {
        return first.imgSrc == second.imgSrc;
    }
    static updateStatus() {
        document.getElementById("pair-found").innerHTML = "Pair founds : " + Game._pairFound;
    }
}
Game._pairFound = 0;
Game._activeCardsCount = 0;
Game._currentCards = [];
let arr = []; // Arrays of 14 items containing each card
for (let i = 1; i <= 14; i++) {
    let id = i.toString();
    arr.push(new Card(document.getElementById(id), "anehihan.jpg"));
    arr[i - 1]._domElement.addEventListener("click", Game.clickOnCard); // Hide on click
}
