let randomNumber = Math.floor(Math.random() * 100 ) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

function checkGuess(e) {
  if (e.key === 'Enter' || e.button == 0) {

    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
      guesses.textContent = 'Предыдущие попытки: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
      lastResult.textContent = `Поздравляем! Вы угадали! Было загаданно число ${randomNumber}`;
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = '!!!ИГРА ОКОНЧЕНА!!!';
      lowOrHi.textContent = '';
      setGameOver();
    } else {
      lastResult.textContent = 'Неправильно!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Введенное в последней попытке число было МЕНЬШЕ загаданного!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Введенное в последней попытке число было БОЛЬШЕ загаданного!';
      }
    }

  guessCount++;
  guessField.value = '';
  guessField.focus();

  }
}

guessSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keydown', checkGuess);

function setGameOver() {
  guessField.setAttribute('disabled', true);
  guessSubmit.setAttribute('disabled', true);

  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game'
  document.body.append(resetButton);

  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  guesses.textContent = '';
  lastResult.textContent = '';
  lastResult.style.backgroundColor = 'white'
  lowOrHi.textContent = '';

  resetButton.parentNode.removeChild(resetButton);

  guessField.removeAttribute('disabled')
  guessSubmit.removeAttribute('disabled')

  guessField.value = '';
  guessField.focus();

  randomNumber = Math.floor(Math.random() * 100) + 1;
}