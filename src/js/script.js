const setItemOnLocalStorage = (key, value) => {
  if (key && value) localStorage.setItem(key, value);
};

const getItemOfLocalStorage = (key) => {
  if (key) return localStorage.getItem(key);
};

const removeItemOfLocalStorage = (key) => {
  if (key) localStorage.removeItem(key);
  return;
};

const copyrightYear = document.querySelector('[data-js="copyright-year"]');

const updateCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  const yearLocalStorage = getItemOfLocalStorage('year');

  if (yearLocalStorage === currentYear) {
    return yearLocalStorage;
  } else {
    setItemOnLocalStorage('year', currentYear);
    return getItemOfLocalStorage('year');
  }
};

copyrightYear.textContent = updateCurrentYear();

// GAME ========================================================================
const interface = {
  audioBtn: document.querySelector('[data-js="audio-btn"]'),
  audioIcon: document.querySelector('[data-js="audio-icon"'),
  countdown: document.querySelector('[data-js="homescreen-countdown"]'),
  homescreen: document.querySelector('[data-js="homescreen"]'),
  playBtn: document.querySelector('[data-js="play-btn"]'),
  score: document.querySelector('[data-js="game-score"]'),
  highScore: document.querySelector('[data-js="high-score"]'),
  time: document.querySelector('[data-js="game-time"]'),
  word: document.querySelector('[data-js="game-word"]'),
};

const soundEffects = {
  correct: 'src/audio/correct.mp3',
  wrong: 'src/audio/wrong.mp3',
  keywdown: 'src/audio/keydown.mp3',
};

const letters = 'abcdefghijklmnopqrstuvwxyz';
const words = [
  'Idade',
  'Aposentado',
  'Zona',
  'Jogar',
  'Pacote',
  'Ninho',
  'Comida',
  'Farinha',
  'Dinamite',
  'Banana',
];

let userTypedWord = [];
let wordSpansAsArray = [];
let counter = 0;
let gameScore = 0;
let highScore = getItemOfLocalStorage('highscore');

let audioIsEnable = getItemOfLocalStorage('audio');

if (!audioIsEnable) {
  setItemOnLocalStorage('audio', 'true');
  interface.audioIcon.classList = 'uil uil-volume-mute';
}

const toggleAudio = () => {
  if (getItemOfLocalStorage('audio') === 'true') {
    setItemOnLocalStorage('audio', 'false');
    interface.audioIcon.classList = 'uil uil-volume-up';
  } else {
    setItemOnLocalStorage('audio', 'true');
    interface.audioIcon.classList = 'uil uil-volume-mute';
  }
};

const playSoundEffect = (url) => {
  const audio = new Audio(url);
  if (getItemOfLocalStorage('audio') === 'true') {
    audio.play();
  } else {
    audio.pause();
  }
};

const updateScores = (gameScore) => {
  
  if (highScore) {
    if (gameScore > highScore) {
      interface.score.innerText = leftZero(gameScore);
      setItemOnLocalStorage('highscore', leftZero(gameScore));
    }

    interface.highScore.textContent = getItemOfLocalStorage('highscore');
  } else {
    setItemOnLocalStorage('highscore', leftZero(0));
    interface.highScore.textContent = '00';
    interface.score.innerText = leftZero(0);
  }
};

const toggleHideElements = (elements) => {
  elements.forEach((element) => element.classList.toggle('hidden-display'));
};

const leftZero = (value) => (value < 10 ? `0${value}` : value);

const getRandomInteger = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const homescreenCountdown = () => {
  let countdownTime = 3;
  const timer = setInterval(() => {
    interface.countdown.textContent = countdownTime;
    --countdownTime;

    if (countdownTime === -1) {
      clearInterval(timer);
      toggleHideElements([interface.homescreen]);
      startGame();
      interface.countdown.textContent = '';
    }
  }, 1000);
};

const gameCountdown = (time = 60) => {
  const timer = setInterval(() => {
    interface.time.textContent = leftZero(time);
    --time;

    if (time === -1) {
      clearInterval(timer);
      stopGame();
    }
  }, 1000);
};

const getRandomWords = () => {
  let indexOfAmoutOfWords = words.length - 1;
  const randomWord = words[getRandomInteger(0, indexOfAmoutOfWords)];
  return randomWord.toLowerCase();
};

const displayCurrentWord = () => {
  interface.word.innerHTML = '';
  let randomWord = getRandomWords();
  let randomWordAsArray = randomWord.split('');

  interface.word.innerHTML = '';

  randomWordAsArray.forEach((letter) => {
    const letterSpan = document.createElement('span');
    letterSpan.classList.add('game__word');
    letterSpan.textContent = letter;
    interface.word.appendChild(letterSpan);
  });

  wordSpansAsArray = document.querySelectorAll('.game__word');
};

window.addEventListener('keydown', (event) => {
  let currentWord = '';
  wordSpansAsArray.forEach((span) => {
    currentWord += span.innerText;
  });

  let pressedKey = event.key;

  if (letters.includes(pressedKey)) {
    playSoundEffect(soundEffects.keywdown);
    userTypedWord.push(pressedKey);

    if (pressedKey === wordSpansAsArray[counter].innerText) {
      wordSpansAsArray[counter].classList.add('game__word--correct');
    } else {
      playSoundEffect(soundEffects.wrong);

      wordSpansAsArray.forEach((spanChar) => {
        spanChar.classList.add('game__word--wrong');
      });

      setTimeout(() => {
        displayCurrentWord();

        counter = 0;
        return;
      }, 260);
    }

    if (counter + 1 === currentWord.length) {
      playSoundEffect(soundEffects.correct);

      wordSpansAsArray.forEach((spanChar) => {
        spanChar.classList.add('game__word--correct');
      });

      setTimeout(() => {
        displayCurrentWord();

        counter = 0;
        gameScore++;
        updateScores(gameScore);
        return;
      }, 300);
    }

    counter++;
  }
});

const startGame = () => {
  counter = 0;
  gameScore = 0;

  gameCountdown();
  displayCurrentWord();

  console.log('The game is started');
};

const stopGame = () => {
  interface.word.innerHTML = '';
  interface.highScore.textContent = getItemOfLocalStorage('highscore');

  toggleHideElements([
    interface.playBtn,
    interface.countdown,
    interface.homescreen,
  ]);

  console.log('The game is stoped');
};

interface.playBtn.addEventListener('click', () => {
  toggleHideElements([interface.playBtn, interface.countdown]);
  homescreenCountdown();
});

interface.audioBtn.addEventListener('click', toggleAudio);

updateScores();
