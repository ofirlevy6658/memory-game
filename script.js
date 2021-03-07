const gameBoard = document.querySelector(".game-board");
let gameSize = 12; // later will be dynamic
const cardsArr = [];
const state = {
	inEvent: false,
	tries: 0,
	flip: 0,
	corret: 0,
};

document
	.querySelectorAll(".level")
	.forEach((btn) => btn.addEventListener("click", startGame));

function startGame(e) {
	const gameLevel = e.target.textContent;
	if (gameLevel === "Easy") gameSize = 12;
	else if (gameLevel === "Medium") gameSize = 16;
	else gameSize = 24;
	gameBoard.innerHTML = "";
	board();
}
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
	for (let i = 0; i < gameSize / 2; i++) {
		let color = getRandomColor();
		cardsArr[i].setAttribute("data-value", color);
		cardsArr[gameSize / 2 + i].setAttribute("data-value", color);
	}
}
function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

gameBoard.addEventListener("click", (e) => {
	if (e.target.classList[0] !== "card" || state.inEvent == true) return;
	console.log(state.flip);
	state.flip++;
	const card = e.target;
	card.setAttribute("data-isFlip", "true");
	card.style.backgroundColor = card.getAttribute("data-value");
	if (state.flip == 1) {
		state.inEvent = true;
		checkMatch();
		state.flip = 0;
	}
	menu();
});

function checkMatch() {
	const flip = cardsArr.filter(
		(el) => el.getAttribute("data-isFlip") === "true"
	);
	if (flip[1] === undefined) {
		state.inEvent = false;
		return;
	}
	if (
		flip[0].getAttribute("data-value") === flip[1].getAttribute("data-value")
	) {
		state.corret++;
		flip[0].setAttribute("data-isFlip", "true-found");
		flip[1].setAttribute("data-isFlip", "true-found");
		state.inEvent = false;
	} else {
		state.tries++;
		setTimeout(function () {
			flip[0].setAttribute("data-isFlip", "false");
			flip[0].style.backgroundColor = "purple";
			flip[1].setAttribute("data-isFlip", "false");
			flip[1].style.backgroundColor = "purple";
			state.inEvent = false;
		}, 1000);
	}
}

function menu() {
	const triesElement = document.querySelector(".wrong");
	triesElement.textContent = `Wrong ${state.tries}`;
	if (state.corret === gameSize / 2) {
		document.querySelector("#win").style.visibility = "visible";
	}
}

document.querySelector("#restart").addEventListener("click", restart);
function restart() {
	//reset
	document.querySelector("#win").style.visibility = "hidden";
	state.tries = 0;
	gameBoard.innerHTML = "";
	//call to start
	board();
}
