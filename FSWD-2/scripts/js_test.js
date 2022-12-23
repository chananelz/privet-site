const start_btn = document.getElementById("111");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
// @ts-ignore
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const option_list = document.querySelector(".option_list");
const timeLine = quiz_box.querySelector("header .time_line");


start_btn.addEventListener("click", () => {
	info_box.classList.add("activeInfo");
});

exit_btn.addEventListener("click", () => {
	info_box.classList.remove("activeInfo");
});

continue_btn.addEventListener("click", () => {
	info_box.classList.remove("activeInfo");
	quiz_box.classList.add("activeQuiz");
	showQuestions();
	queCounter();
	startTimer(timeValue);
	startTimerLine(0);
});

const next_btn = document.querySelector(".next_btn");
let que_count = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;

next_btn.addEventListener("click", () => {
	if (que_count < question.length - 1) {
		que_count++;
		showQuestions();
		queCounter();
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		next_btn.style.display = "none";
	} else {
		console.log("Question completed");
	}
});


function queCounter() {
	const bottom_ques_counter = quiz_box.querySelector(".total_que");
	let totalQuestion = '<span><p>' + (que_count + 1) + '</p>מיתוך<p>' + question.length + '</p>שאלות</span>';
	bottom_ques_counter.innerHTML = totalQuestion;
}

function showQuestions() {
	const que_text = document.querySelector(".que_text");
	let que_tag = '<span>' + question[que_count].numb + ". " + question[que_count].question + '</span>';
	let option_tag = '<div class="option">' + question[que_count].Options[0] + '<span></span></div>'
		+ '<div class="option">' + question[que_count].Options[1] + '<span></span></div>'
		+ '<div class="option">' + question[que_count].Options[2] + '<span></span></div>'
		+ '<div class="option">' + question[que_count].Options[3] + '<span></span></div>';

	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;
	const option = option_list.querySelectorAll(".option");
	for (let i = 0; i < option.length; i++) {
		option[i].setAttribute("onclick", "optionSelected(this)");

	}
}
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross	"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = question[que_count].answer;
	let allOptions = option_list.children.length;

	if (userAns == correctAns) {
		answer.classList.add("correct");
		answer.insertAdjacentHTML("beforeend", tickIcon);
	} else {
		answer.classList.add("incorrect");
		answer.insertAdjacentHTML("beforeend", crossIcon);

		for (let i = 0; i < allOptions; i++) {
			if (option_list.children[i].textContent == correctAns) {
				option_list.children[i].setAttribute("class", "option correct");
				option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
			}
		}
	}

	for (let i = 0; i < allOptions; i++) {
		option_list.children[i].classList.add("disabled");
	}
	next_btn.style.display = "block";
}

function startTimer(time) {
	counter = setInterval(timer, 1000);
	function timer() {
		timeCount.textContent = time;
		time--;
		if (time < 9) {
			let addZero = timeCount.textContent;
			timeCount.textContent = "0" + addZero;
		}
		if (time < 0) {
			clearInterval(counter);
			timeCount.textContent = "00";
		}
	}
}

function startTimerLine(time) {
	counterLine = setInterval(timer, 29);
	function timer() {
		time++;
		timeLine.style.width = time + "px";
		if (time > 549) {
			clearInterval(counterLine);
		}
	}
}

