const gameBoard = document.querySelector(".game-board");
const gameSize = 12; // later will be dynamic

function board() {
	const cardElement = document.createElement("div");
	const cardsArr = [];
	cardElement.classList.add("card");
	for (let i = 0; i < gameSize; i++) {
		const cardElement = document.createElement("div");
		cardElement.classList.add("card");
		cardElement.setAttribute("data-isFlip", "false");
		cardsArr[i] = cardElement;
	}
	getColors(cardsArr);
	shuffle(cardsArr);
	for (let i = 0; i < gameSize; i++) {
		gameBoard.appendChild(cardsArr[i]);
	}
}

function shuffle(cardsArr) {
	for (let i = gameSize - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[cardsArr[i], cardsArr[j]] = [cardsArr[j], cardsArr[i]];
	}
}
function getColors(cardsArr) {
	const colors = ["green", "red", "blue", "orange", "Aqua", "Aquamarine"];
	for (let i = 0; i < gameSize / 2; i++) {
		cardsArr[i].setAttribute("data-value", colors[i]);
		cardsArr[gameSize / 2 + i].setAttribute("data-value", colors[i]);
	}
}

board();
