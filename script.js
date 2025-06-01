const words = [
    'cat', 'dog', 'sun', 'web', 'html', 'css', 'code', 'java', 'node', 'api', 
    'array', 'loop', 'python', 'react', 'linux', 'logic', 'build', 'cloud', 'data', 
    'hangman', 'javascript', 'developer', 'programming', 'frontend', 'backend', 'project'
];

let chosenWord = '';
let guessedWord = [];
let incorrectGuesses = [];
let hangmanStep = 0;
const maxMistakes = 6;

function chooseWord() {
    const filteredWords = words.filter(word => word.length >= 3); // Allow >= 3-letter words
    chosenWord = filteredWords[Math.floor(Math.random() * filteredWords.length)].toUpperCase();
    guessedWord = Array.from(chosenWord).map(() => '_');
    incorrectGuesses = [];
    hangmanStep = 0;

    // Reveal one or two random characters
    const revealCount = Math.min(2, chosenWord.length);
    const revealIndexes = new Set();
    while (revealIndexes.size < revealCount) {
        revealIndexes.add(Math.floor(Math.random() * chosenWord.length));
    }
    revealIndexes.forEach(index => guessedWord[index] = chosenWord[index]);

    updateDisplay();
}

function updateDisplay() {
    document.getElementById('word-container').innerHTML = guessedWord.map(letter => 
    `<div class="letter">${letter}</div>`).join('');
    document.getElementById('incorrect-guesses').innerText = incorrectGuesses.join(', ');
    document.getElementById('hangman-drawing').style.backgroundImage = `url('Images/Hangman-${hangmanStep}.png')`;
}

function checkGuess(letter) {
    if (guessedWord.includes(letter) || incorrectGuesses.includes(letter)) return;

    if (chosenWord.includes(letter)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        incorrectGuesses.push(letter);
        hangmanStep++;
    }

    updateDisplay();
    checkGameOver();
}

function checkGameOver() {
    const resultDiv = document.getElementById('result');
    if (!guessedWord.includes('_')) {
        resultDiv.innerText = 'You win! 🎉';
    } else if (hangmanStep >= maxMistakes) {
        resultDiv.innerText = `You lost! The word was ${chosenWord}. 😢`;
    }
}

function resetGame() {
    chooseWord();
    document.getElementById('result').innerText = '';
}

function displaySuggestions() {
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let letter of alphabet) {
        const suggestion = document.createElement('div');
        suggestion.classList.add('suggestion');
        suggestion.innerText = letter;
        suggestion.addEventListener('click', () => checkGuess(letter));
        suggestionsContainer.appendChild(suggestion);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    chooseWord();
    displaySuggestions();

    document.addEventListener('keydown', (event) => {
        const letter = event.key.toUpperCase();
        if (/^[A-Z]$/.test(letter)) {
            checkGuess(letter);
        }
    });
});
