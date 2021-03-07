const gameBoard = document.querySelector(".game-board");
const gameSize = 12; // later will be dynamic
const cardsArr = [];
const state = {
	tries: 0,
	flip: 0,
	corret: 0,
};
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
gameBoard.addEventListener("click", (e) => {
	if (e.target.classList[0] !== "card") return;
	gameBoard.disabled = true;
	state.flip++;
	const card = e.target;
	card.setAttribute("data-isFlip", "true");
	card.style.backgroundColor = card.getAttribute("data-value");
	if (state.flip == 2) {
		checkMatch();
		state.flip = 0;
	}
	menu();
});

function checkMatch() {
	const flip = cardsArr.filter(
		(el) => el.getAttribute("data-isFlip") === "true"
	);
	if (
		flip[0].getAttribute("data-value") === flip[1].getAttribute("data-value")
	) {
		state.corret++;
		flip[0].setAttribute("data-isFlip", "true-found");
		flip[1].setAttribute("data-isFlip", "true-found");
	} else {
		state.tries++;
		setTimeout(function () {
			flip[0].setAttribute("data-isFlip", "false");
			flip[0].style.backgroundColor = "purple";
			flip[1].setAttribute("data-isFlip", "false");
			flip[1].style.backgroundColor = "purple";
		}, 1000);
		console.log(state.tries);
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
	state.tries = 0;
	gameBoard.innerHTML = "";
	//call to start
	board();
}
