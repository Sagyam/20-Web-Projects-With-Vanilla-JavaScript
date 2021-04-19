const currnecyEl_1 = document.getElementById("currency-1");
const currnecyEl_2 = document.getElementById("currency-2");
const amountEl_1 = document.getElementById("amount-1");
const amountEl_2 = document.getElementById("amount-2");
const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");

//Fetch Exchage rate and update DOM
function calculate() {
	const currencyOne = currnecyEl_1.value;
	const currencyTwo = currnecyEl_2.value;
	fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
		.then((res) => res.json())
		.then((data) => {
			const rate = data.rates[currencyTwo];

			rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

			amountEl_2.value = (amountEl_1.value * rate).toFixed(2);
		});
}

function swap() {
	const temp = currnecyEl_1.value;
	currnecyEl_1.value = currnecyEl_2.value;
	currnecyEl_2.value = temp;
	calculate();
}

//Event Listners
currnecyEl_1.addEventListener("change", calculate);
amountEl_1.addEventListener("input", calculate);
currnecyEl_2.addEventListener("change", calculate);
amountEl_2.addEventListener("input", calculate);
swapEl.addEventListener("click", swap);

calculate();
