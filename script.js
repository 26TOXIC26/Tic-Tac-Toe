const cells = document.querySelectorAll('.game-board__cell');
const flags = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let team = 'x';
let your_turn = 1;
let full = 0;
let in_check = 0;
let is_finish = 0;


function ft_choose(value) {
	team = value;
	document.querySelector('.game').style.display = 'flex';
	document.querySelector('.choose-player').style.display = 'none';
	// console.log(team);
}

function ft_check(player) {
	in_check = 1;
	const winPatterns = [
	  [0, 1, 2], [3, 4, 5], [6, 7, 8],
	  [0, 3, 6], [1, 4, 7], [2, 5, 8],
	  [0, 4, 8], [2, 4, 6]
	];
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

function ft_ai() {
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
					  ft_ai();
				  }, 500);
			}

  });
});

// function clear_all() {
// 	flags = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// 	team = 'x';
// 	your_turn = 1;
// 	full = 0;
// 	in_check = 0;
// 	is_finish = 0;
// 	document.querySelector('.game').style.display = 'none';
// 	document.querySelector('.game-info').style.display = 'none';
// 	document.querySelector('.choose-player').style.display = 'flex';
// 	for (let i = 0; i < 9; i++)
// 		cells[i].style.backgroundImage = '';
// }
