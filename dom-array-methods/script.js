const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionareBtn = document.getElementById("show-millionare");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

//Fetch Random User and add money
async function getRandomUser() {
	const res = await fetch("https://randomuser.me/api");
	const data = await res.json();

	const user = data.results[0];
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};

	addData(newUser);
}

//Add new obj to data arr
function addData(obj) {
	data.push(obj);

	updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
	//Clear main div
	main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
	providedData.forEach((item) => {
		const element = document.createElement("div");
		element.classList.add("person");
		element.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(
			item.money
		)}`;
		main.appendChild(element);
	});
}

//Format number as money
function formatMoney(number) {
	return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Doubles everyones money
function doubleMoney() {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});
	updateDOM();
}

//Sort by riches
function sortByRichest() {
	data.sort((a, b) => b.money - a.money);
	updateDOM();
}

//Filter Only Millionares
function showMillionare() {
	data = data.filter((user) => user.money > 1000000);
	updateDOM();
}

//Calculate total Wealth
function calculateWealth() {
	const total = data.reduce((acc, user) => (acc += user.money));

	const totalEl = document.createElement("div");
	totalEl.innerHTML =
		"<h3> Total Wealth : <strong> ${formatMoney(total) </strong> </h3>}";
	main.appendChild(totalEl);
}

//Event Listners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionareBtn.addEventListener("click", showMillionare);
calculateBtn.addEventListener("click", calculateWealth);
