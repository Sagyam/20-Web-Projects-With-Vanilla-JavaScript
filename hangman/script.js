const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notfication-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

const correctLetters = [];
const wrongLetters = [];
let selectedWord = words[Math.floor(Math.random() * words.length)];

//Update wrong letters
function updateWrongLettersEl() {
	//Display Wrong Letters
	wrongLettersEl.innerHTML = `
		${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
		${wrongLetters.map((letter) => `<span>${letter}</span>`)}
	`;
	//Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;
		if (index < errors) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}
	});

	//Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerHTML = "Unfortunately you have lost 😞";
		popup.style.display = "flex";
	}
}

function showNotification() {
	notification.classList.add("show");
	setTimeout(() => {
		notification.classList.remove("show");
	}, 2000);
}

//Show the hidden word
function displayWords() {
	wordEl.innerHTML = `
        ${selectedWord
					.split("")
					.map(
						(letter) => `
                    <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                    </span>
                    `
					)
					.join("")}
    `;

	//Remove newline
	const innerWord = wordEl.innerText.replace(/\n/g, "");

	if (innerWord.toLocaleLowerCase() === selectedWord.toLocaleLowerCase()) {
		finalMessage.innerText = "Congratulation! You Have Won 😊";
		popup.style.display = "flex";
	}
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;
		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWords();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
});

//Restart Game
playAgainBtn.addEventListener("click", () => {
	//Empty array
	correctLetters.splice(0);
	wrongLetters.splice(0);
	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWords();
	updateWrongLettersEl();
	popup.style.display = "none";
});

displayWords();
