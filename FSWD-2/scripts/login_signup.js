/**
 * @file: login_signup.js
 * @author: Chananel Zaguri 
 * @fileoverview: This file contains the code for the login and signup pages.
 */

// @ts-ignore
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

let userData;

/**
 * check the input of the user when he click on the continue button
 */
continue_btn.addEventListener("click", (e) => {
	// The preventDefault() method cancels the event if it is cancelable, meaning that the default 
	// action that belongs to the event will not occur.
	e.preventDefault();
	check_inputs();
});


/**
 * check all the inputs of the user before creating a new account
 */
function check_inputs() {
	let count = 0;
	let user_input = {
		usernameValue: username.querySelector("input").value.trim(),
		emailValue: mailField.querySelector("input").value.trim(),
		passwordValue: password.querySelector("input").value.trim(),
		password2Value: secondPassword.querySelector("input").value.trim(),
		AttemptsToConnect : 0,
		total_score : 0,
		connectingNumber : 0,
		lastTimeToConnect : 0
	}

	if (user_input.usernameValue === '') {
		setErrorFor(username, 'קלט ריק');
	} else if (localStorage.getItem(user_input.usernameValue) !== null){
		setErrorFor(username, 'שם קיים');
	}else {
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
		localStorage.setItem(user_input.usernameValue,JSON.stringify(user_input));
		move_to_singInBtn();
	}
}

/**
 * change the page if the input is incorrect 
 * @param {*} input 
 * @param {string} message 
 */
function setErrorFor(input, message) {
	const small = input.querySelector('small');
	input.className = 'input-field error';
	small.innerText = message;
}

/**
 * change the page if the input is correct
 * @param {*} input 
 */
function setSuccessFor(input) {
	input.className = 'input-field success';
}

/**
 * check if the email is valid
 * @param {*} email 
 * @returns 
 */
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

/**
 * erase the input of the user 
 * @param {*} item 
 */
function clear_input(item) {
	item.className = 'input-field';
	item.querySelector("input").value = "";
}

//--------------------------------------------------------------------------------------------------


/**
 * check the input of the user when he click on the login button 
 */
login_btn.addEventListener("click", (e) => {
	// The preventDefault() method cancels the event if it is cancelable, meaning that the default
	// action that belongs to the event will not occur.
	e.preventDefault()
	validate_inputs();
});

/**
 * validate the input of the user when he click on the login button
 * @returns 
 */
function validate_inputs() {
	let usernameValue = username.querySelector("input").value.trim()
	let passwordValue = password.querySelector("input").value.trim()
	elements_arr.forEach(clear_input);

	if (localStorage.getItem(usernameValue) === null) {
		setErrorFor(username, 'שם לא קיים');
		
	} else {
		userData = JSON.parse(localStorage.getItem(usernameValue))
		if (userData.AttemptsToConnect === 3) {
			alert(" עברת את מספר הניסיונות המותרים חשבונך נחסם, פתח חשבון חדש");
			localStorage.removeItem(usernameValue);
			return;
		}
		if (userData.usernameValue === usernameValue && userData.passwordValue === passwordValue){
			if(userData.connectingNumber === 0){
				alert("התחברת בהצלחה");
			}else{
				alert("התחברת בהצלחה התחברות אחרונה בתאריך " + new Date(userData.lastTimeToConnect).toLocaleString());
			}
			userData.connectingNumber++;
			userData.lastTimeToConnect = new Date();
			localStorage.setItem(userData.usernameValue,JSON.stringify(userData));
			window.location.href = "../html/all_games.html";
		} else {
			setErrorFor(password, 'קוד שגוי');
			userData.AttemptsToConnect++;
			localStorage.setItem(userData.usernameValue,JSON.stringify(userData));
		}

	}
}

// ------------------------------------------------

singInBtn.onclick = move_to_singInBtn;

/**
 * change the page to the sing in page
 */
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

/**
 * change the page to the sing up page
 */
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