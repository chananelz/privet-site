let singInBtn = document.getElementById("singinbtn");
let singUpBtn = document.getElementById("singupbtn");
let mailField = document.getElementById("mail-field");
let title = document.getElementById("title");
let forgetPassword = document.getElementById("forget-password")
let secondPassword = document.getElementById("second-password")

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