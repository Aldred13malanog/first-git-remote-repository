const score = JSON.parse(localStorage.getItem('score')) || {
	wins: 0,
	losses: 0,
	ties: 0
}
let isAutoPlaying = false;
let intervalId;

scoreResult();

function playGame(move) {
	const computerMove = pickComputerMove();
	let result = '';
	

	if (move === 'rock') {
		if (computerMove === 'rock') {
			result = 'Tie.';
		} else if (computerMove === 'paper') {
			result = 'You lose.';
		} else if (computerMove === 'scissors') {
			result = 'You win.';
		}
	} else if (move === 'paper') {
		if (computerMove === 'rock') {
			result = 'You win.';
		} else if (computerMove === 'paper') {
			result = 'Tie.';
		} else if (computerMove === 'scissors') {
			result = 'You lose.';
		}
	} else if (move === 'scissors') {
		if (computerMove === 'rock') {
			result = 'You lose.';
		} else if (computerMove === 'paper') {
			result = 'You win.';
		} else if (computerMove === 'scissors') {
			result = 'Tie.';
		}
	}

	if (result === 'You win.') {
		score.wins += 1;
	} else if (result === 'You lose.') {
		score.losses += 1;
	} else if (result === 'Tie.') {
		score.ties += 1;
	}
	
	document.querySelector('.js-result')
		.innerHTML = result;

	document.querySelector('.js-moves')
		.innerHTML = `You <img src="images/${move}-emoji.png"> <img src="images/${computerMove}-emoji.png"> Computer`;

	scoreResult();

	localStorage.setItem('score', JSON.stringify(score));
}

function pickComputerMove() {
	const randomMove = Math.random();
	let computerMove = '';

	if (randomMove > 0 && randomMove <= 1/ 3) {
		computerMove = 'rock';
	} else if (randomMove > 1 / 3 && randomMove <= 2 / 3) {
		computerMove = 'paper';
	} else if (randomMove > 2 / 3 && randomMove <= 1) {
		computerMove = 'scissors';
	}
	return computerMove;
}

function scoreResult() {
	document.querySelector('.js-score')
		.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function autoPlay() {
	const autoPlayButton = document.querySelector('.autoplay-button');
	if (autoPlayButton.innerText === 'Auto Play') {
		autoPlayButton.innerHTML = 'Stop Playing';
	} else {
		autoPlayButton.innerHTML = 'Auto Play';
	}
	if (!isAutoPlaying) {
		intervalId = setInterval(() => {
			const move = pickComputerMove();
			playGame(move);
		}, 1000);
		isAutoPlaying = true;
	} else {
		clearInterval(intervalId);
		isAutoPlaying = false;
	}	
}

function confirmationMessage() {
	document.querySelector('.confirmation')
		.innerHTML = `
		Are you sure you want to reset the score? 
		<button class="yes-button" onclick="
			score.wins = 0,
			score.losses = 0,
			score.ties = 0,
			localStorage.removeItem('score');
			scoreResult();
		  hideConfirmationMessage();
		">
			Yes
		</button>
		<button class="no-button" onclick="
			hideConfirmationMessage();
		">
			No
		</button>
	`;
}

function hideConfirmationMessage() {
	const confirmation = document.querySelector('.confirmation');
	confirmation.innerHTML = '';
}

document.body.addEventListener('keydown', (event) => {
	if (event.key === 'r') {
		playGame('rock');
	} else if (event.key === 'p') {
		playGame('paper');
	} else if (event.key === 's') {
		playGame('scissors');
	} else if (event.key === 'Backspace') {
		confirmationMessage();
	} else if (event.key === 'a') {
		autoPlay();
	}
})

document.querySelector('.js-rock-button')
	.addEventListener('click', () => {
		playGame('rock');
		hideConfirmationMessage();
	});
document.querySelector('.js-paper-button')
	.addEventListener('click', () => {
		playGame('paper');
		hideConfirmationMessage();
});
document.querySelector('.js-scissors-button')
	.addEventListener('click', () => {
		playGame('scissors');
		hideConfirmationMessage();
});
document.querySelector('.js-reset-button')
	.addEventListener('click', () => {
		confirmationMessage();
});
document.querySelector('.js-autoplay-button')
	.addEventListener('click', () => {
		autoPlay();
});