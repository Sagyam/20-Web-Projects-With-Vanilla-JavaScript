const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message) {
	let formControl = input.parentElement;
	formControl.className = "form-control error";
	let small = formControl.querySelector("small");
	small.innerText = message;
}

//Show input success message
function showSuccess(input) {
	let formControl = input.parentElement;
	formControl.className = "form-control success";
	let small = formControl.querySelector("small");
}

//Event Listner
form.addEventListener("submit", function (e) {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 8, 15);
	checkEmail(email);
	checkPasswordMatch(password, password2);
});

//Check reuired Fields
function checkRequired(inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

//Check Length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${getFieldName(input)}  must be at least  ${min}`);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)}  cannot be greater than  ${max}`);
	} else {
		showSuccess(input);
	}
}

//Validate email
function checkEmail(input) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, `Email is not valid`);
	}
}

//Check Password Mathc
function checkPasswordMatch(input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, "Password do not match");
	}
}

//Get field name
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
