const cells = document.querySelectorAll('.game-board__cell');
const flags = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let team = 'x';
let your_turn = 1;
let full = 0;
let in_check = 0;
let is_finish = 0;
let ai_level = 'easy';
const winPatterns = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4, 7], [2, 5, 8],
	[0, 4, 8], [2, 4, 6]
];


function ft_level(value) {
	if (value === 'easy')
		ai_level = 'easy';
	else if (value === 'hard')
		ai_level = 'hard';
	document.querySelector('.choose-level').style.display = 'none';
	document.querySelector('.choose-player').style.display = 'flex';
}


function ft_choose(value) {
	team = value;
	document.querySelector('.game').style.display = 'flex';
	document.querySelector('.choose-player').style.display = 'none';
}

function ft_check(player) {
	in_check = 1;
	const info = document.querySelector('.game-info');
	const result = document.querySelector('.winner-alert');

	let i = 0;
	while (i < winPatterns.length) {
	  const [a, b, c] = winPatterns[i];
	  if (flags[a] === player && flags[b] === player && flags[c] === player) {
		if (player === 1)
			result.innerHTML = 'You win!';
		else
			result.innerHTML = 'AI win!';
		info.style.display = 'flex';
		document.querySelector('.game').style.display = 'none';
		is_finish = 1;
		return ;
	  }
	  i++;
	}
	if (full === 9) {
		result.innerHTML = 'Draw';
		info.style.display = 'flex';
		document.querySelector('.game').style.display = 'none';
		is_finish = 1;
		return ;
	}
	in_check = 0;
}

function ft_ai_easy() {
	if (is_finish === 1)
		return ;
	let index = Math.floor(Math.random() * 9);
	while (flags[index] != 0)
		index = Math.floor(Math.random() * 9);
	console.log('AI');
	flags[index] = 2;
	if (team === 'X')
		cells[index].style.backgroundImage = 'url("images/o.png")';
	else if (team === 'O')
		cells[index].style.backgroundImage = 'url("images/x.png")';
	full++;
	cells[index].style.backgroundSize = 'cover';
	your_turn = 1;
	setTimeout(() => {
		ft_check(2);
	}, 200);
}

function ft_best_choice() {
	if (is_finish === 1) return -1;

	const checkPatterns = (player) => {
		for (let [a, b, c] of winPatterns) {
			if (flags[a] === player && flags[b] === player && flags[c] === 0) return c;
			if (flags[a] === player && flags[b] === 0 && flags[c] === player) return b;
			if (flags[a] === 0 && flags[b] === player && flags[c] === player) return a;
		}
		return -1;
	};
	let index = checkPatterns(2);
	if (index !== -1) return index;
	index = checkPatterns(1);
	if (index !== -1) return index;
	if (flags[4] === 0) return 4;
	const positions = [0, 2, 6, 8, 1, 3, 5, 7];
	for (let pos of positions) {
		if (flags[pos] === 0) return pos;
	}
	return -1;
}

function ft_ai_hard() {
	if (is_finish === 1)
		return;
	let index = ft_best_choice();
	if (index === -1) return;
	flags[index] = 2;
	if (team === 'X')
		cells[index].style.backgroundImage = 'url("images/o.png")';
	else if (team === 'O')
		cells[index].style.backgroundImage = 'url("images/x.png")';
	full++;
	cells[index].style.backgroundSize = 'cover';
	your_turn = 1;
	setTimeout(() => {
		ft_check(2);
	}, 200);
}

cells.forEach((cell, index) => {
	  cell.addEventListener('click', () => {
			if (in_check === 1 || is_finish === 1)
				return;
			if (flags[index] != 0 || your_turn === 0)
				return;
			else {
				  flags[index] = 1;
				  if (team === 'X')
				  	cell.style.backgroundImage = 'url("images/x.png")';
				  else if (team === 'O')
				  	cell.style.backgroundImage = 'url("images/o.png")';
				  cell.style.backgroundSize = 'cover';
				  full++;
				  your_turn = 0;
				  setTimeout(() => {
				  ft_check(1);
				  }, 200);
				  setTimeout(() => {
					if (ai_level === 'easy')
						ft_ai_easy();
					else if (ai_level === 'hard')
					  ft_ai_hard();
				  }, 500);
			}

  });
});
