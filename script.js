const gameBoard = document.querySelector(".game-board");
const gameSize = 12; // later will be dynamic
let flip = 0;
const cardsArr = [];

function board() {
	const cardElement = document.createElement("div");
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
gameBoard.addEventListener("click", test);
function test(e) {
	flip++;
	const card = e.target;
	card.setAttribute("data-isFlip", "true");
	card.style.backgroundColor = card.getAttribute("data-value");
	if (flip == 2) {
		match();
		flip = 0;
	}
}

function match() {
	const flip = cardsArr.filter(
		(el) => el.getAttribute("data-isFlip") === "true"
	);
	if (
		flip[0].getAttribute("data-value") === flip[1].getAttribute("data-value")
	) {
		flip[0].setAttribute("data-isFlip", "true-found");
		flip[1].setAttribute("data-isFlip", "true-found");
	} else {
		setTimeout(function () {
			flip[0].setAttribute("data-isFlip", "false");
			flip[0].style.backgroundColor = "purple";
			flip[1].setAttribute("data-isFlip", "false");
			flip[1].style.backgroundColor = "purple";
		}, 1000);
	}
}
