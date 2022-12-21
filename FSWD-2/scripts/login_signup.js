const btn = document.getElementById("continue-btn");
const singInBtn = document.getElementById("singinbtn");
const singUpBtn = document.getElementById("singupbtn");
const title = document.getElementById("title");
const forgetPassword = document.getElementById("forget-password")

const username = document.getElementById("username");
const mailField = document.getElementById("mail-field");
const password = document.getElementById("password");
const secondPassword = document.getElementById("second-password")

// ------------------------------------------------

singInBtn.onclick =function(){
  mailField.style.maxHeight = "0";
  secondPassword.style.maxHeight = "0";
  mailField.style.visibility = "hidden";
  secondPassword.style.visibility = "hidden";
  title.innerHTML = "התחברות";
  singUpBtn.classList.add("disable");
  singInBtn.classList.remove("disable");
  forgetPassword.style.display ="block";
}

singUpBtn.onclick =function(){
  mailField.style.maxHeight = "60px";
  secondPassword.style.maxHeight = "60px";
  mailField.style.visibility = "visible";
  secondPassword.style.visibility = "visible";
  title.innerHTML = "הרשמה";
  singUpBtn.classList.remove("disable");
  singInBtn.classList.add("disable");
  forgetPassword.style.display ="none";

}
// -------------------------------------------------

btn.addEventListener("click",(e) => {
  // The preventDefault() method cancels the event if it is cancelable, meaning that the default 
  // action that belongs to the event will not occur.
  e.preventDefault()
  check_inputs();
});

function check_inputs() {
  const usernameValue = username.querySelector("input").value.trim();
	const emailValue = mailField.querySelector("input").value.trim();
	const passwordValue = password.querySelector("input").value.trim();
	const password2Value = secondPassword.querySelector("input").value.trim();
  
  if(usernameValue === '') {
		setErrorFor(username, 'קלט ריק');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(mailField, 'קלט ריק');
	} else if (!isEmail(emailValue)) {
		setErrorFor(mailField, 'קלט לא חוקי');
	} else {
		setSuccessFor(mailField);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'קלט ריק');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(secondPassword, 'קלט ריק');
	} else if(passwordValue !== password2Value) {
		setErrorFor(secondPassword, "חוסר התאמה");
	} else{
		setSuccessFor(secondPassword);
	}
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
