const continue_btn = document.getElementById("continue-btn");
const login_btn = document.getElementById("login-btn");
const singInBtn = document.getElementById("singinbtn");
const singUpBtn = document.getElementById("singupbtn");
const title = document.getElementById("title");
const forgetPassword = document.getElementById("forget-password")

const username = document.getElementById("username");
const mailField = document.getElementById("mail-field");
const password = document.getElementById("password");
const secondPassword = document.getElementById("second-password")

let elements_arr = [username, mailField, password, secondPassword]

// ------------------------------------------------

singInBtn.onclick = move_to_singInBtn;

function move_to_singInBtn() {
	mailField.style.maxHeight = "0";
	secondPassword.style.maxHeight = "0";
	mailField.style.visibility = "hidden";
	secondPassword.style.visibility = "hidden";
	title.innerHTML = "התחברות";
	singUpBtn.classList.add("disable");
	singInBtn.classList.remove("disable");
	continue_btn.classList.add("hide");
	login_btn.classList.remove("hide");
	forgetPassword.style.display = "block";
	elements_arr.forEach(clear_input);
}

singUpBtn.onclick = move_to_singUpBtn;

function move_to_singUpBtn() {
	mailField.style.maxHeight = "60px";
	secondPassword.style.maxHeight = "60px";
	mailField.style.visibility = "visible";
	secondPassword.style.visibility = "visible";
	title.innerHTML = "הרשמה";
	singUpBtn.classList.remove("disable");
	singInBtn.classList.add("disable");
	login_btn.classList.add("hide");
	continue_btn.classList.remove("hide");
	forgetPassword.style.display = "none";
	elements_arr.forEach(clear_input);
}
// -------------------------------------------------

continue_btn.addEventListener("click", (e) => {
	// The preventDefault() method cancels the event if it is cancelable, meaning that the default 
	// action that belongs to the event will not occur.
	e.preventDefault()
	check_inputs();
});


login_btn.addEventListener("click", (e) => {
	// The preventDefault() method cancels the event if it is cancelable, meaning that the default
	// action that belongs to the event will not occur.
	e.preventDefault()
	validate_inputs();
});

function check_inputs() {
	let count = 0;
	let user_input = {
		usernameValue: username.querySelector("input").value.trim(),
		emailValue: mailField.querySelector("input").value.trim(),
		passwordValue: password.querySelector("input").value.trim(),
		password2Value: secondPassword.querySelector("input").value.trim()

	}

	if (user_input.usernameValue === '') {
		setErrorFor(username, 'קלט ריק');
	} else {
		setSuccessFor(username);
		count++
	}

	if (user_input.emailValue === '') {
		setErrorFor(mailField, 'קלט ריק');
	} else if (!isEmail(user_input.emailValue)) {
		setErrorFor(mailField, 'קלט לא חוקי');
	} else {
		setSuccessFor(mailField);
		count++;
	}

	if (user_input.passwordValue === '') {
		setErrorFor(password, 'קלט ריק');
	} else {
		setSuccessFor(password);
		count++;
	}

	if (user_input.password2Value === '') {
		setErrorFor(secondPassword, 'קלט ריק');
	} else if (user_input.passwordValue !== user_input.password2Value) {
		setErrorFor(secondPassword, "חוסר התאמה");
	} else {
		setSuccessFor(secondPassword);
		count++;
	}
	if (count === 4) {
		alert("נרשמת בהצלחה");
		move_to_singInBtn();

	}
}

function validate_inputs() {
	alert("התחברת בהצלחה");
	window.location.href = "../html/games.html";

}


function setErrorFor(input, message) {
	const small = input.querySelector('small');
	input.className = 'input-field error';
	small.innerText = message;
}

function setSuccessFor(input) {
	input.className = 'input-field success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function clear_input(item) {
	item.className = 'input-field';
	item.querySelector("input").value = "";
}
