const cells = document.querySelectorAll('.game-board__cell');

cells.forEach((cell) => {
	  cell.addEventListener('click', () => {
			cell.style.backgroundImage = 'url("images/x.png")';
			cell.style.backgroundSize = 'cover';
			
  });
});
