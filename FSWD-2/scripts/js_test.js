const start_btn = document.getElementById("111");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
// @ts-ignore
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

start_btn.addEventListener("click", () => {
	info_box.classList.add("activeInfo");
});	

exit_btn.addEventListener("click", () => {
	info_box.classList.remove("activeInfo");
});

continue_btn.addEventListener("click", () => {
	info_box.classList.remove("activeInfo");
	quiz_box.classList.add("activeQuiz");
});