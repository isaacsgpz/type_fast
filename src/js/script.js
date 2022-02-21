const setItemOnLocalStorage = (key, value) => {
  if (key && value) localStorage.setItem(key, value);
};

const getItemOfLocalStorage = (key) => {
  if (key) return localStorage.getItem(key);
};

const copyrightYear = document.querySelector('[data-js="copyright-year"]');

const updateCurrentYear = () => {
  const currentYear = new Date().getFullYear();
	const yearLocalStorage = getItemOfLocalStorage('year');

	if(yearLocalStorage && yearLocalStorage === currentYear) {
		return yearLocalStorage;
	} else {
		setItemOnLocalStorage('year', currentYear);
		return getItemOfLocalStorage('year');
	}
};

copyrightYear.textContent = updateCurrentYear();

// GAME ========================================================================
const interface =  {
	score: document.querySelector('[data-js="game-score"]'),
	time: document.querySelector('[data-js="game-time"]'),
	word: document.querySelector('[data-js="game-word"]'),
}

let gameScore = 0;

const currentWord = 'sapato';

const userWord = [];

window.addEventListener('keydown', (event) => {
	let key = event.key;

	userWord.push(`${key}`);

	console.log(userWord);

	let teste = userWord.join('');

	interface.word.textContent = teste;
	if(teste === currentWord) {
		console.log('CORRETO');
		++gameScore;
		interface.score.textContent = leftZero(gameScore);
	}
});

const leftZero = (value) => {
	return value < 10 ? `0${value}` : value;
}


