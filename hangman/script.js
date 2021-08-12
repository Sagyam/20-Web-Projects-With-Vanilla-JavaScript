const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

// const promiseWord = fetch("words.txt")
// 	.then((response) => response.text())
// 	.then((text) => {
// 		words = text.split("\n");
// 		console.log("in async");
// 		return words[Math.floor(Math.random() * words.length)];
// 	});

const correctLetters = [];
const wrongLetters = [];
let selectedWord = "test";

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

displayWords();

