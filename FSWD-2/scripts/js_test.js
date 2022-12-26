/**
 * @file: js_test.js
 * @fileoverview: This file contains the code for the quiz page.
 * @author : Chananel Zaguri
 * 
 * 
 */

const start_btn = document.getElementById("111");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
// @ts-ignore
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const option_list = document.querySelector(".option_list");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const allUsers = findAllUsers();
const currentUser = findCurrentUser();

/**
 * this function is responsible for bringing the user from the local storage
 * @returns array of all users
 */
function findAllUsers() {
	let allUsers = [];

	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		let value = localStorage.getItem(key);
		allUsers.push(JSON.parse(value));
	}
	return allUsers;
}




/**
 * this function is responsible for finding the current user
 * @returns json of the current user
 */
function findCurrentUser() {
	return allUsers.sort(function (a, b) {
		console.log(`${b.usernameValue} +++++ ${a.usernameValue}. ---- ${Date.parse(b['lastTimeToConnect']) - Date.parse(a['lastTimeToConnect'])} !!!!`);
		return Date.parse(b['lastTimeToConnect']) - Date.parse(a['lastTimeToConnect']);
	})[0];
}

/**
 * this event is responsible for the start the quiz guideline 
 */
start_btn.addEventListener("click", () => {
	info_box.classList.add("activeInfo");
});

/**
 * this event is responsible for the exit the quiz
 */
exit_btn.addEventListener("click", () => {
	info_box.classList.remove("activeInfo");
});

/**
 * this event is responsible for the continue to next question
 */
continue_btn.addEventListener("click", () => {
	info_box.classList.remove("activeInfo");
	quiz_box.classList.add("activeQuiz");
	showQuestions();
	queCounter();
	startTimer(timeValue);
	startTimerLine(0);
});

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

let que_count = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

/**
 * this event is responsible for continue to next question
 */
next_btn.addEventListener("click", () => {
	if (que_count < question.length - 1) {
		que_count++;
		showQuestions();
		queCounter();
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		// @ts-ignore
		next_btn.style.display = "none";
		timeOff.textContent = "הזמן שנותר";

	} else {
		clearInterval(counter);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		console.log("Question completed");
		showResultBox();
	}
});


/**
 * 
 */
function queCounter() {
	const bottom_ques_counter = quiz_box.querySelector(".total_que");
	let totalQuestion = '<span><p>' + (que_count + 1) + '</p>מיתוך<p>' + question.length + '</p>שאלות</span>';
	bottom_ques_counter.innerHTML = totalQuestion;
}

/**
 * this function is responsible for show the questions
 */
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


/**
 * this function is responsible handle the situation when the user select an option
 * @param {*} answer 
 */
function optionSelected(answer) {
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = question[que_count].answer;
	let allOptions = option_list.children.length;

	if (userAns === correctAns) {
		userScore++;
		answer.classList.add("correct");
		answer.insertAdjacentHTML("beforeend", tickIcon);
	} else {
		answer.classList.add("incorrect");
		answer.insertAdjacentHTML("beforeend", crossIcon);

		for (let i = 0; i < allOptions; i++) {
			if (option_list.children[i].textContent === correctAns) {
				option_list.children[i].setAttribute("class", "option correct");
				option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
			}
		}
	}

	for (let i = 0; i < allOptions; i++) {
		option_list.children[i].classList.add("disabled");
	}
	// @ts-ignore
	next_btn.style.display = "block";
}

/**
 * the outer function is responsible for the start the timer
 * the inner function is responsible for the timer itself
 * 
 * @param {*} time 
 */
function startTimer(time) {
	counter = setInterval(timer, 1000);
	/**
	 * this function is responsible for the timer 
	 * and deal with the situation when the time is over
	 */
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
			timeOff.textContent = "הזמן נגמר";

			let correctAns = question[que_count].answer;
			let allOptions = option_list.children.length;

			for (let i = 0; i < allOptions; i++) {
				if (option_list.children[i].textContent === correctAns) {
					option_list.children[i].setAttribute("class", "option correct");
					option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
				}
			}
			for (let i = 0; i < allOptions; i++) {
				option_list.children[i].classList.add("disabled");
			}
			next_btn.style.display = "block";

		}
	}

}

/**
 * this function is responsible for the result box that appear when the user finish the game
 */
function showResultBox() {
	info_box.classList.remove("activeInfo");
	quiz_box.classList.remove("activeQuiz");
	result_box.classList.add("activeResult");
	const scoreText = result_box.querySelector(".score_text");
	if (userScore > 3) {
		scoreText.innerHTML = '<span> שאפו ענק ' + currentUser.usernameValue + '<p>';
		scoreText.innerHTML += '<span> צברת במשחק זה <p>' + userScore + '</p> נקודות מתוך <p>' + question.length + '</p></span>';
	} else if (userScore > 1) {
		scoreText.innerHTML = '<span> כל הכבוד ' + currentUser.usernameValue + '<p>';
		scoreText.innerHTML += '<span> צברת במשחק זה <p>' + userScore + '</p> נקודות מתוך <p>' + question.length + '</p></span>';
	} else {
		scoreText.innerHTML = '<span> צברת במשחק זה <p>' + userScore + '</p> נקודות מתוך <p>' + question.length + '</p></span>';
	}
	currentUser.total_score += userScore;
	scoreText.innerHTML += '<span> ניקוד מצטבר ' + currentUser.total_score + '<p>';
	localStorage.setItem(currentUser.usernameValue, JSON.stringify(currentUser));

	scoreText.innerHTML += '----------שלוש המשתמשים הטובים ביותר----------';
	let users = findAllUsers();
	users.sort((a, b) => b.total_score - a.total_score);
	for (let i = 0; i < 3; i++) {
		scoreText.innerHTML += '<span>' + (i + 1) + '. משתמש ' + users[i].usernameValue + ' - סה"כ ניקוד ' + users[i].total_score + '</span>';
	}


}

/**
 * this function is responsible for the timer line
 * the inner function is responsible for the timer itself
 * @param {*} time 
 */
function startTimerLine(time) {
	counterLine = setInterval(timer, 29);
	/**
	 * this function is responsible for the timer
	 * every 29 milliseconds the timeLine width will increase by 1 px 
	 */
	function timer() {
		time++;
		// @ts-ignore
		timeLine.style.width = time + "px";
		if (time > 549) {
			clearInterval(counterLine);
		}
	}
}

/**
 * this event is responsible for the end the quiz
 */
quit_quiz.addEventListener("click", () => {
	window.location.reload();
});

/**
 * this event is responsible for the restart the quiz
 */
restart_quiz.addEventListener("click", () => {
	quiz_box.classList.add("activeQuiz");
	result_box.classList.remove("activeResult");
	que_count = 0;
	counterLine;
	timeValue = 15;
	widthValue = 0;
	userScore = 0;
	showQuestions();
	queCounter();
	clearInterval(counter);
	startTimer(timeValue);
	clearInterval(counterLine);
	startTimerLine(widthValue);
	next_btn.style.display = "none";
	timeOff.textContent = "הזמן שנותר";
});

